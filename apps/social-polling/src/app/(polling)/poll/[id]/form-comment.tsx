"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { createClient } from "~/utils/supabase/client";

const submitComment = z.object({
  comment: z
    .string({ required_error: "Please enter a comment" })
    .min(1, { message: "Comment must be at least 1 character." }),
});

type FormValues = z.infer<typeof submitComment>;

export function FormComment({ pollId }: { pollId: string }) {
  const supabase = createClient();
  const form = useForm({
    resolver: zodResolver(submitComment),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!user || error) {
      return toast.error("Sign in to comment");
    }
    const { error: insertCommentError } = await supabase
      .from("comments")
      .insert({
        content: data.comment,
        poll_id: pollId,
        user_id: user.id,
      });

    if (insertCommentError) {
      return toast.error("Error commenting");
    }

    form.reset();

    toast.success("Comment added successfully!");
  }

  return (
    <Form {...form}>
      <form
        className="mx-2 mb-2 grid w-full gap-2 rounded-lg p-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="faded"
                  classNames={{
                    input:
                      "!outline-none outline-none! border-transparent focus:border-transparent [type='text']:border-transparent",
                    mainWrapper: "w-full",
                  }}
                  className="w-full"
                  label="Write your comment"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" fullWidth color="primary">
          Submit
        </Button>
      </form>
    </Form>
  );
}
