import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-accent-muted font-semibold text-accent",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  initials: string;
  alt?: string;
  className?: string;
}

export function Avatar({ initials, alt, size, className }: AvatarProps) {
  return (
    <span
      className={cn(avatarVariants({ size }), className)}
      role="img"
      aria-label={alt ?? initials}
    >
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}
