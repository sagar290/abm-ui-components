"use client";

import {
  BrickWall,
  Lock,
  Paintbrush,
  Shield,
  HardDrive,
  Laptop,
  UserRound,
  Wifi,
  Plus,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import type { SettingDefinition } from "../../types";

const iconMap = {
  shield: Shield,
  wifi: Wifi,
  paint: Paintbrush,
  lock: Lock,
  firewall: BrickWall,
  disk: HardDrive,
  user: UserRound,
} as const;

const iconTone: Record<string, string> = {
  firewall: "bg-warning-muted text-warning",
  lock: "bg-surface-secondary text-foreground-secondary",
  shield: "bg-accent-muted text-accent",
  wifi: "bg-info-muted text-info",
  paint: "bg-success-muted text-success",
  disk: "bg-surface-secondary text-foreground-secondary",
  user: "bg-accent-muted text-accent",
};

export interface SettingCardProps {
  setting: SettingDefinition;
  onAdd?: (id: string) => void;
  configured?: boolean;
  highlighted?: boolean;
  className?: string;
}

export function SettingCard({
  setting,
  onAdd,
  configured,
  highlighted,
  className,
}: SettingCardProps) {
  const Icon = iconMap[setting.icon] ?? Shield;

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface p-5",
        highlighted &&
          "ring-1 ring-accent/50 ring-offset-2 ring-offset-canvas dark:ring-accent/40",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            iconTone[setting.icon] ?? "bg-accent-muted text-accent"
          )}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        {!configured && onAdd && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Add ${setting.title}`}
            onClick={() => onAdd(setting.id)}
            className="text-foreground-secondary"
            leftIcon={<Plus className="h-4 w-4" />}
          />
        )}
        {configured && (
          <Badge variant="success" size="sm">
            Added
          </Badge>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">
          {setting.title}
        </h3>
        <p className="text-xs text-foreground-secondary leading-relaxed">
          {setting.description}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-1.5 text-xs text-foreground-muted">
        <Laptop className="h-3.5 w-3.5" aria-hidden />
        <span>{setting.platform}</span>
      </div>
    </article>
  );
}
