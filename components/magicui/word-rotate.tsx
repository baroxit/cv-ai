"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(className, "flex items-center")}
          {...motionProps}
        >
          <motion.span
            className="absolute left-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3.6, duration: 0.2 }}
          >
            <Loader2 className="size-4 animate-spin" />
          </motion.span>
          <motion.span
            className="absolute left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.2 }}
          >
            <Check className="size-5" />
          </motion.span>
          <span className="ml-6">{words[index]}</span>
        </motion.span>
      </AnimatePresence>
  );
}
