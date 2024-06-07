import Image from "next/image";

import { cn } from "~/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/project/logo-black.png"
      alt="The Liaison Logo"
      width={40}
      height={40}
      className={cn(className)}
    />
  );
}
