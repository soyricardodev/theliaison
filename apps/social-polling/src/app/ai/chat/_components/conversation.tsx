"use client";

import React from "react";
import { useChat } from "ai/react";

import { MessageCard } from "./message-card";

export function Conversation() {
  const { messages, isLoading } = useChat({
    api: "/api/ai/chat",
  });

  console.log("isLoading", isLoading);

  console.log("messages", messages);

  return (
    <div className="flex flex-col gap-4 px-1">
      {messages.map(({ role, content, id }, index) => (
        <MessageCard
          key={id}
          attempts={index === 1 ? 2 : 1}
          avatar={
            role === "assistant"
              ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={content}
          messageClassName={
            role === "user" ? "bg-content3 text-content3-foreground" : ""
          }
          showFeedback={role === "assistant"}
        />
      ))}
    </div>
  );
}
