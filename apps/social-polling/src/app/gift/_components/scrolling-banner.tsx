"use client";

import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import { cn } from "~/lib/utils";

interface ScrollingBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  isReverse?: boolean;
  showShadow?: boolean;
  shouldPauseOnHover?: boolean;
  isVertical?: boolean;
  gap?: string;
  duration?: number; // in seconds
}

export const ScrollingBanner = ({
  ref,
  className,
  isReverse,
  isVertical = false,
  gap = "1rem",
  showShadow = true,
  shouldPauseOnHover = true,
  duration = 40,
  children,
  ...props
}: ScrollingBannerProps & {
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <ScrollShadow
      ref={ref}
      isEnabled={showShadow}
      offset={-20}
      size={300}
      orientation={isVertical ? "vertical" : "horizontal"}
      visibility="both"
      className={cn(
        "flex",
        {
          "w-full": !isVertical,
          "overflow-y-hidden": isVertical,
          "overflow-x-hidden": !isVertical,
          "max-h-[calc(100vh_-_200px)]": isVertical,
        },
        className,
      )}
      style={{
        // @ts-ignore
        "--gap": gap,
        "--duration": `${duration}s`,
      }}
      {...props}
    >
      <div
        className={cn("flex w-max items-stretch gap-[--gap]", {
          "flex-col": isVertical,
          "h-full": isVertical,
          "animate-scrolling-banner": !isVertical,
          "animate-scrolling-banner-vertical": isVertical,
          "[animation-direction:reverse]": isReverse,
          "hover:[animation-play-state:paused]": shouldPauseOnHover,
        })}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement),
        )}
      </div>
    </ScrollShadow>
  );
};

ScrollingBanner.displayName = "ScrollingBanner";
