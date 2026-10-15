"use client";

import * as React from "react";
import { Check, Link2, Laptop, Monitor, Smartphone, Tablet } from "lucide-react";
import {
  Button,
  Dialog,
  SelectableCard,
  useToast,
} from "@/components/ui";

export interface EnrollDevicesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
}

export function EnrollDevicesDialog({
  open,
  onOpenChange,
  userName,
}: EnrollDevicesDialogProps) {
  const { toast } = useToast();
  const [personal, setPersonal] = React.useState(false);
  const [company, setCompany] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setPersonal(false);
      setCompany(false);
      setCopied(false);
    }
  }, [open]);

  const canSend = personal || company;
  const enrollLink = `https://business.apple.com/enroll/${encodeURIComponent(
    userName.toLowerCase().replace(/\s+/g, "-")
  )}`;

  const copyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(enrollLink);
      setCopied(true);
      toast({ title: "Link copied", variant: "success" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Could not copy",
        description: enrollLink,
        variant: "warning",
      });
    }
  };

  const send = () => {
    toast({
      title: "Instructions sent",
      description: `Enrollment instructions were sent to ${userName}.`,
      variant: "success",
    });
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Enroll devices"
      description="Choose one or both sets of enrollment instructions to send to this employee:"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" disabled={!canSend} onClick={send}>
            Send Instructions
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <SelectableCard
          id="enroll-personal"
          title="Personal iPhone or iPad"
          description="Send instructions so this person can enroll a personal iPhone or iPad. Work data stays separate from personal data."
          checked={personal}
          onCheckedChange={setPersonal}
          icon={
            <span className="relative flex h-12 w-12 items-center justify-center">
              <Tablet className="absolute left-0 h-8 w-8 text-foreground-muted" />
              <Smartphone className="absolute right-0 bottom-0 h-6 w-6 text-foreground" />
            </span>
          }
        />
        <SelectableCard
          id="enroll-company"
          title="Company-owned Mac"
          description="Send a unique enrollment link for a company-owned Mac. The link expires in 30 days."
          checked={company}
          onCheckedChange={setCompany}
          icon={
            <span className="relative flex h-12 w-12 items-center justify-center">
              <Monitor className="absolute left-0 h-7 w-7 text-foreground-muted" />
              <Laptop className="absolute right-0 bottom-0 h-6 w-6 text-foreground" />
            </span>
          }
        >
          <Button
            variant="link"
            size="sm"
            className="mt-1 px-0"
            onClick={copyLink}
            leftIcon={
              copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Link2 className="h-3.5 w-3.5" />
              )
            }
          >
            {copied ? "Copied" : "Copy Unique Link"}
          </Button>
        </SelectableCard>
      </div>
    </Dialog>
  );
}
