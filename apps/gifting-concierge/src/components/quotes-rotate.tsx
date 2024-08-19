"use client";

import type { HTMLMotionProps } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@theliaison/ui";

interface WordRotateProps {
  quotes: string[];
  authors: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"p">;
  className?: string;
  isDark?: boolean;
}

function WordRotate({
  quotes,
  authors,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  className,
  isDark = false,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [quotes, duration]);

  return (
    <div className="overflow-hidden mt-6 md:max-w-screen-xl mx-auto my-8 text-center leading-relaxed text-gray-500">
      <AnimatePresence mode="wait">
        <motion.p
          key={quotes[index]}
          className={cn(
            className,
            "dark:text-white flex flex-col gap-1 items-center justify-center text-pretty w-full",
            {
              dark: isDark,
            }
          )}
          {...framerProps}
        >
          {quotes[index]} <br />
          <span className="dark:text-white">- {authors[index]}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

interface QuotesRotateProps {
  className?: string;
  isDark?: boolean;
}

export function QuotesRotate({ className, isDark = false }: QuotesRotateProps) {
  const quotes = [
    '"A gift consists not in what is done or given, but in the intention of the giver or doer." - Seneca',
    '"The manner of giving is worth more than the gift." - Pierre Corneille',
    '"Every gift which is given, even though it be small, is in reality great, if it is given with affection." - Pindar',
    '"We make a living by what we get, but we make a life by what we give." - Winston Churchill',
    '"No one has ever overcome poor by giving." - Anne Frank',
    '"It is not how much we give, but how much love we put into giving." - Mother Teresa',
    '"For it is in giving that we receive." - Francis of Assisi',
    '"Gratitude is not only the greatest of virtues, but the parent of all others." - Cicero',
    '"When we give cheerfully and accept gratefully, everyone is blessed." - Maya Angelou',
    '"The meaning of life is to find your gift. The purpose of life is to give it away." - Pablo Picasso',
  ];

  const justQuotes = quotes.map((quote) => quote.split(" - ")[0]) as string[];
  const justWriters = quotes.map((quote) => quote.split(" - ")[1]) as string[];

  return (
    <WordRotate
      quotes={justQuotes}
      authors={justWriters}
      duration={15000} // 15 seconds
      className={cn("text-base text-default-900", className)}
      isDark={isDark}
    />
  );
}
