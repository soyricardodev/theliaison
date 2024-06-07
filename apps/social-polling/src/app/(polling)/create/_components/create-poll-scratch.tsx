"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { FileImageIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@theliaison/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@theliaison/ui/select";

import { categories } from "~/lib/categories";
import { createClient } from "~/utils/supabase/client";

export const pollFormSchema = z.object({
  question: z.string({ required_error: "Please enter a question" }).min(3, {
    message: "Question must be at least 3 characters.",
  }),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one category.",
    }),
  options: z
    .array(
      z.object({
        value: z.string({ required_error: "Please enter an option" }).min(3, {
          message: "Option must be at least 3 characters.",
        }),
      }),
    )
    .min(4)
    .max(6)
    .nonempty(),
});

export type PollFormValues = z.infer<typeof pollFormSchema>;

export function CreatePollScratch() {
  const supabase = createClient();
  const router = useRouter();
  const form = useForm<PollFormValues>({
    resolver: zodResolver(pollFormSchema),
    mode: "onChange",
    defaultValues: {
      question: "",
      options: [
        {
          value: "",
        },
        {
          value: "",
        },
      ],
    },
  });

  const [pollImage, setPollImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [creatingPoll, setCreatingPoll] = useState(false);

  const inputImageRef = useRef<HTMLInputElement>(null);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const onSubmit = async (data: PollFormValues) => {
    try {
      toast.info("Checking for profanity...");
      setCreatingPoll(true);

      const res = await fetch("/api/profanity/poll", {
        method: "POST",
        body: JSON.stringify({
          question: data.question,
          options: data.options.map((option) => option.value),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const checkProfanity = await res.json();

      console.log(checkProfanity);

      if (checkProfanity.isProfanity) {
        toast.error(checkProfanity.message);
        setCreatingPoll(false);
        return;
      }

      if (pollImage == null) {
        let generatedAIImage = "";
        setCreatingPoll(true);

        toast.promise(
          fetch("/api/ai/image", {
            method: "POST",
            body: JSON.stringify({
              question: data.question,
              categories: data.categories,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }),
          {
            loading: "Generating AI image...",
            success: async (res) => {
              const response: { data: string } = await res.json();
              generatedAIImage = response.data;

              toast.promise(
                fetch("/api/polls/create", {
                  method: "POST",
                  body: JSON.stringify({
                    question: data.question,
                    options: data.options.map((option) => option.value),
                    categories: data.categories,
                    image: generatedAIImage,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }),
                {
                  loading: "Creating poll...",
                  success: async (data) => {
                    const res = await data.json();
                    setCreatingPoll(false);
                    router.push(`/poll/${res.id}`);
                    return "Poll created successfully";
                  },
                  error: () => {
                    setCreatingPoll(false);
                    return "Error creating poll";
                  },
                },
              );

              return "AI image generated successfully";
            },
            error: () => {
              setCreatingPoll(false);
              return "Error generating AI image";
            },
          },
        );

        return;
      }

      const dataToInsert = {
        question: data.question,
        options: data.options.map((option) => option.value),
        categories: data.categories,
        image: pollImage,
      };

      toast.promise(
        fetch("/api/polls/create", {
          method: "POST",
          body: JSON.stringify(dataToInsert),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          loading: "Creating poll...",
          success: (url) => {
            setCreatingPoll(false);
            router.push(`/poll/${url}`);
            return "Poll created successfully";
          },
          error: () => {
            setCreatingPoll(false);
            return "Error creating poll";
          },
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("Error creating poll");
    }
  };

  async function onUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const pollquestion = form.getValues().question;

      if (pollquestion.trim() === "") {
        toast.error("Please first enter a question");
        return;
      }

      toast.info("Checking for profanity...");
      setUploading(true);
      setCreatingPoll(true);
      const res = await fetch("/api/profanity/poll", {
        method: "POST",
        body: JSON.stringify({
          question: pollquestion,
          options: fields.map((field) => field.value),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const checkProfanity = await res.json();

      if (checkProfanity.isProfanity) {
        toast.error(
          "This poll contains profanity. Please remove it before uploading.",
        );
        setUploading(false);
        setCreatingPoll(false);
        return;
      }

      if (!event.target.files || event.target.files.length === 0) {
        toast.error("You must select an image to upload.");
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];

      if (!file) {
        toast.error("You must select an image to upload.");
        throw new Error("You must select an image to upload.");
      }

      const fileName = pollquestion.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      const filePath = `${fileName}-${nanoid().substring(0, 6)}`;

      const { error: uploadError } = await supabase.storage
        .from("polls")
        .upload(filePath, file, {
          contentType: file.type,
        });

      if (uploadError) {
        toast.error("Error uploading image");
        throw uploadError;
      }

      setPollImage(filePath);
      setCreatingPoll(false);
      setUploading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formValues = form.getValues();
          // @ts-expect-error missing types
          const categories = formValues.categories.split(",");
          const parsed = pollFormSchema.safeParse({
            ...formValues,
            categories,
          });

          if (!parsed.success) {
            toast.error("Invalid form data");
            return;
          }

          onSubmit(parsed.data);
        }}
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="What is the most important factor in maintaining a healthy relationship?"
                  label="Question"
                  type="text"
                  isRequired
                  required
                  variant="bordered"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                // defaultValue={field.value[0]}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((categorie) => (
                    <SelectItem
                      key={categorie.id}
                      value={String(categorie.id)}
                      className="capitalize"
                    >
                      {categorie.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`options.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    label={`Option ${index + 1}`}
                    placeholder="Option"
                    isRequired
                    required
                    endContent={
                      index >= 2 && index <= 5 ? (
                        <Button isIconOnly onPress={() => remove(index)}>
                          <TrashIcon className="size-4 text-red-500" />
                        </Button>
                      ) : null
                    }
                    variant="bordered"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex items-center justify-center gap-1">
          <Button
            type="button"
            startContent={<PlusCircleIcon className="size-4" />}
            className="w-full text-black"
            onClick={() => {
              if (fields.length < 6) {
                append({ value: "" });
              } else {
                toast.error("You can only add 6 options");
              }
            }}
            variant="bordered"
            disabled={fields.length >= 6 || creatingPoll || uploading}
            isDisabled={fields.length >= 6 || creatingPoll || uploading}
          >
            Add option
          </Button>

          <input
            className="hidden"
            ref={inputImageRef}
            type="file"
            accept="image/*"
            onChange={onUploadImage}
            disabled={uploading || creatingPoll}
          />

          <Button
            type="button"
            startContent={<FileImageIcon className="size-4" />}
            className="w-full text-black"
            onClick={() => {
              inputImageRef.current?.click();
            }}
            variant="bordered"
            isDisabled={uploading || creatingPoll}
            disabled={uploading || creatingPoll}
            isLoading={uploading || creatingPoll}
          >
            {uploading ? "Uploading ..." : "Upload image"}
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full"
          color="secondary"
          isDisabled={creatingPoll}
          isLoading={creatingPoll}
          disabled={creatingPoll}
        >
          Create poll
        </Button>
      </form>
    </Form>
  );
}
