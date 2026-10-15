"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "./input";

export interface SearchFieldProps
  extends Omit<InputProps, "type" | "inputSize"> {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  inputSize?: InputProps["inputSize"];
}

export function SearchField({
  value,
  onValueChange,
  placeholder = "Search",
  inputSize = "sm",
  className,
  ...props
}: SearchFieldProps) {
  return (
    <div className={cn("relative min-w-0 w-full", className)}>
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground-muted"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        inputSize={inputSize}
        className="border-transparent bg-surface-secondary pl-8 focus-visible:bg-surface"
        {...props}
      />
    </div>
  );
}
