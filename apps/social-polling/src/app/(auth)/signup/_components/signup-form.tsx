"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

import type { SimpleSignUp } from "~/utils/validators/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { simpleSignUpSchema } from "~/utils/validators/auth";
import { simpleSignupAction } from "../../actions";
import { AuthWithGoogle } from "../../google";

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SimpleSignUp>({
    resolver: zodResolver(simpleSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
    mode: "onChange",
  });

  const { pending } = useFormStatus();

  async function onSubmit(data: SimpleSignUp) {
    setIsSubmitting(true);
    await simpleSignupAction({ ...data });
  }

  return (
    <Form {...form}>
      <AuthWithGoogle />
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  isRequired
                  variant="underlined"
                  label="Name"
                  placeholder="John Doe"
                  disabled={pending || isSubmitting}
                  isDisabled={pending || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  isRequired
                  variant="underlined"
                  label="Email"
                  type="email"
                  placeholder="johndoe@example.com"
                  disabled={pending || isSubmitting}
                  isDisabled={pending || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  isRequired
                  variant="underlined"
                  label="Username"
                  placeholder="john2doe"
                  disabled={pending || isSubmitting}
                  isDisabled={pending || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your username just can contain numbers and letters and
                underscores.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  isRequired
                  variant="underlined"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={pending || isSubmitting}
                  isDisabled={pending || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={pending || isSubmitting}
          isDisabled={pending || isSubmitting}
          isLoading={pending || isSubmitting}
          color="primary"
        >
          Signup
        </Button>
      </form>
    </Form>
  );
}
