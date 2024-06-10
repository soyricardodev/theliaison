"use client";

import type { InputProps } from "@nextui-org/react";

import React from "react";
import { Input } from "@nextui-org/react";

import { cn } from "@theliaison/ui";
import { z } from "zod";

export type RecipientContactFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
};

// Need to request info for the recipient
// Name/Username *required*
// Social (Facebook / Twitter / Instagram / Snapchat) *required*
// Email
// Phone
const recipientContactSchema = z.object({
  name: z.string({ required_error: "Name or username is required" }).min(1),
  social: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
});

export const RecipientContactForm = ({
  variant = "flat",
  className,
  hideTitle,
}: RecipientContactFormProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {!hideTitle && (
        <span className="relative text-foreground-500">
          Recipient Information
        </span>
      )}

      <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
        <Input
          isRequired
          label="Name or username"
          labelPlacement="outside"
          placeholder="Enter the name or username of the recipient"
          variant={variant}
        />
        <Input
          isRequired
          label="Social Network"
          labelPlacement="outside"
          placeholder="Facebook / Twitter / Instagram / Snapchat"
          variant={variant}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
        <Input
          label="Phone number"
          labelPlacement="outside"
          placeholder="+1 (555) 555-5555 (optional)"
          variant={variant}
        />
        <Input
          label="Email address"
          labelPlacement="outside"
          type="email"
          placeholder="user@email.com (optional)"
          variant={variant}
        />
      </div>
    </div>
  );
};

RecipientContactForm.displayName = "RecipientContactForm";
