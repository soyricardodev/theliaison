"use client";

import type { LinkProps } from "next/link";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@theliaison/ui/sheet";

import { Logo } from "./logo";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex gap-3">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              aria-hidden="true"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <Link href="/" className="flex items-center gap-1 md:hidden">
          <Logo className="mr-2 size-8" />
        </Link>
      </div>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Logo className="mr-2 size-8" />
          <span className="font-bold">The Liaison</span>
        </MobileLink>
        <div className="my-4 pb-10 pl-6">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <h4 className="font-medium">Social Polling</h4>
              <MobileLink href="/explore" onOpenChange={setOpen}>
                Explore
              </MobileLink>
              <MobileLink href="/create" onOpenChange={setOpen}>
                Create Poll
              </MobileLink>
              <MobileLink href="/pricing" onOpenChange={setOpen}>
                Pricing
              </MobileLink>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-3">
            <MobileLink href="/gift" onOpenChange={setOpen}>
              Gifting Concierge
            </MobileLink>
            <MobileLink href="/services" onOpenChange={setOpen}>
              Services
            </MobileLink>
            <MobileLink href="/shop" onOpenChange={setOpen}>
              Shop
            </MobileLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
