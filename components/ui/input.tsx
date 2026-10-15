"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-surface px-3 text-sm text-foreground placeholder:text-foreground-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      inputSize: {
        sm: "h-8",
        md: "h-10",
        lg: "h-11",
      },
      invalid: {
        true: "border-danger focus-visible:ring-danger",
        false: "border-border",
      },
    },
    defaultVariants: {
      inputSize: "md",
      invalid: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, invalid, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, invalid }), className)}
        ref={ref}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { inputVariants };
