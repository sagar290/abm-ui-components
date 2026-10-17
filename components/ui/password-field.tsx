"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input, type InputProps } from "./input";

export interface PasswordFieldProps
  extends Omit<InputProps, "type" | "value" | "onChange"> {
  value: string;
  onValueChange: (value: string) => void;
}

/** Password input with show / hide toggle — pairs with FormField. */
export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(function PasswordField(
  {
    value,
    onValueChange,
    className,
    disabled,
    placeholder = "Password",
    inputSize = "md",
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        autoComplete="current-password"
        placeholder={placeholder}
        disabled={disabled}
        inputSize={inputSize}
        {...props}
        className={cn("pr-11", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        disabled={disabled}
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-foreground-muted"
        leftIcon={
          showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )
        }
      />
    </div>
  );
});
