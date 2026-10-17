"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";

export interface DomainSelectProps {
  username: string;
  domain: string;
  domains: string[];
  onUsernameChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  usernameId?: string;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Managed Apple ID control: username input + domain dropdown.
 * Popover opens downward with high z-index so it never covers adjacent fields.
 */
export function DomainSelect({
  username,
  domain,
  domains,
  onUsernameChange,
  onDomainChange,
  usernameId = "managed-apple-id",
  invalid,
  disabled,
  className,
}: DomainSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "flex w-full overflow-visible rounded-lg border bg-surface-secondary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-popover",
        invalid ? "border-danger" : "border-border",
        className
      )}
    >
      <Input
        id={usernameId}
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        disabled={disabled}
        placeholder="username"
        aria-label="Managed Apple ID username"
        className="border-0 rounded-none rounded-l-lg focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
        invalid={false}
      />
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            aria-label="Select domain"
            className="h-auto shrink-0 rounded-none rounded-r-lg border-l border-border px-3 text-sm text-foreground-secondary"
            rightIcon={<ChevronDown className="h-4 w-4" />}
          >
            @{domain || "domain"}
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            side="bottom"
            sideOffset={6}
            avoidCollisions={false}
            data-chrome="popover"
            className="z-[100] min-w-[200px] rounded-xl border border-border bg-popover p-1 shadow-lg"
          >
            {domains.map((d) => (
              <Button
                key={d}
                type="button"
                variant="ghost"
                onClick={() => {
                  onDomainChange(d);
                  setOpen(false);
                }}
                className={cn(
                  "h-auto w-full justify-start gap-2 rounded-lg px-3 py-2 text-sm font-normal",
                  d === domain && "font-medium"
                )}
                leftIcon={
                  <span className="w-4 shrink-0">
                    {d === domain ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : null}
                  </span>
                }
              >
                @{d}
              </Button>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
