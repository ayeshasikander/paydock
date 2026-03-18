"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-lg transition-transform focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 focus:ring-offset-[#0f172a] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";
    const variants = {
      primary: "bg-[#10b981] text-white hover:bg-[#34d399]",
      secondary:
        "bg-[#1e293b] text-[#f1f5f9] border border-[#334155] hover:border-[#10b981] hover:bg-[#334155]",
      ghost: "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f1f5f9]",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
