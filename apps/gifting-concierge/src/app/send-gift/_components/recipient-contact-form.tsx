"use client";

import type { InputProps } from "@nextui-org/react";

import React, { useEffect } from "react";
import { Input } from "@nextui-org/react";

import { cn } from "@theliaison/ui";
import { useRecipientStore } from "~/store/recipient";

export type RecipientContactFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
};

export const RecipientContactForm = ({
  variant = "flat",
  className,
  hideTitle,
}: RecipientContactFormProps) => {
  const {
    setCanContinue,
    setRecipientEmail,
    recipientEmail,
    recipientName,
    recipientSocial,
    setRecipientName,
    setRecipientPhone,
    setRecipientSocial,
    recipientPhone,
  } = useRecipientStore();

  useEffect(() => {
    if (recipientName.trim() !== "" && recipientSocial.trim() !== "") {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  }, [recipientName, recipientSocial, setCanContinue]);

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
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
        <Input
          isRequired
          label="Social Network"
          labelPlacement="outside"
          placeholder="Facebook / Twitter / Instagram / Snapchat"
          variant={variant}
          value={recipientSocial}
          onChange={(e) => setRecipientSocial(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
        <Input
          label="Phone number"
          labelPlacement="outside"
          placeholder="+1 (555) 555-5555 (optional)"
          variant={variant}
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
        />
        <Input
          label="Email address"
          labelPlacement="outside"
          type="email"
          placeholder="user@email.com (optional)"
          variant={variant}
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </div>
    </div>
  );
};

RecipientContactForm.displayName = "RecipientContactForm";
