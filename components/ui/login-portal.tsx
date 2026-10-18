"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { BrandMark } from "./brand-mark";
import { Button } from "./button";
import { DomainSelect } from "./domain-select";
import { FormField } from "./form-field";
import { InlineAlert } from "./inline-alert";
import { PasswordField } from "./password-field";
import { SupportFab } from "./support-fab";
import { ThemeCustomizer } from "./theme-customizer";
import { ThemePresetMenu } from "./theme-preset-menu";
import { ThemeToggle } from "./theme-toggle";

const loginPortalVariants = cva(
  "relative flex min-h-dvh w-full flex-col items-center justify-center bg-canvas px-4 py-10",
  {
    variants: {
      density: {
        default: "gap-8",
        compact: "gap-6",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

const loginPanelVariants = cva(
  "w-full rounded-2xl border border-border-subtle bg-surface shadow-sm",
  {
    variants: {
      density: {
        default: "max-w-md p-8 sm:p-10",
        compact: "max-w-sm p-6",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export interface LoginPortalProps
  extends VariantProps<typeof loginPortalVariants> {
  title?: string;
  subtitle?: string;
  username: string;
  domain: string;
  domains: string[];
  password: string;
  onUsernameChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  error?: string;
  forgotPasswordHref?: string;
  helpHref?: string;
  submitLabel?: string;
  showThemeControls?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

/** Full-viewport Managed Apple ID sign-in portal for Business Manager. */
export function LoginPortal({
  title = "Sign in",
  subtitle = "Use your Managed Apple ID to access Business Manager.",
  username,
  domain,
  domains,
  password,
  onUsernameChange,
  onDomainChange,
  onPasswordChange,
  onSubmit,
  loading = false,
  error,
  forgotPasswordHref = "#",
  helpHref = "#",
  submitLabel = "Sign In",
  showThemeControls = true,
  footer,
  density = "default",
  className,
}: LoginPortalProps) {
  const canSubmit =
    username.trim().length > 0 &&
    domain.trim().length > 0 &&
    password.length > 0 &&
    !loading;

  return (
    <div
      data-chrome="login"
      className={cn(loginPortalVariants({ density }), className)}
    >
      {showThemeControls && (
        <div className="pointer-events-none absolute bottom-[4.75rem] right-4 z-30 flex gap-2">
          <ThemeCustomizer className="pointer-events-auto" />
          <ThemePresetMenu className="pointer-events-auto" />
          <ThemeToggle className="pointer-events-auto" />
        </div>
      )}
      <SupportFab />

      <div className="flex flex-col items-center gap-3 text-center">
        <BrandMark className="scale-110" />
        <p className="text-sm text-foreground-secondary">Business Manager</p>
      </div>

      <section
        data-chrome="panel"
        className={cn(loginPanelVariants({ density }))}
        aria-labelledby="login-portal-title"
      >
        <header className="mb-6 space-y-2 text-center">
          <h1
            id="login-portal-title"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-foreground-secondary">{subtitle}</p>
          )}
        </header>

        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          {error && (
            <InlineAlert tone="error" title="Unable to sign in">
              {error}
            </InlineAlert>
          )}

          <FormField
            id="login-managed-apple-id"
            label="Managed Apple ID"
            required
            info="Username plus your organization domain"
          >
            <DomainSelect
              username={username}
              domain={domain}
              domains={domains}
              onUsernameChange={onUsernameChange}
              onDomainChange={onDomainChange}
              usernameId="login-managed-apple-id"
              disabled={loading}
            />
          </FormField>

          <FormField id="login-password" label="Password" required>
            <PasswordField
              value={password}
              onValueChange={onPasswordChange}
              disabled={loading}
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={!canSubmit}
            className="w-full"
          >
            {submitLabel}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1">
            <Button variant="link" size="sm" asChild>
              <Link href={forgotPasswordHref}>Forgot password?</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href={helpHref}>Need help signing in?</Link>
            </Button>
          </div>
        </form>
      </section>

      {footer ?? (
        <p className="max-w-md text-center text-xs text-foreground-muted">
          Administrators sign in with a Managed Apple ID that has the
          Administrator, Device Enrollment Manager, or Content Manager role.
        </p>
      )}
    </div>
  );
}

export { loginPortalVariants, loginPanelVariants };
