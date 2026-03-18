"use client";

import { motion } from "framer-motion";

export function Card({
  children,
  className = "",
  hover = true,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
} & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className={`rounded-xl border border-[#334155] bg-[#1e293b] p-5 ${hover ? "card-hover" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
