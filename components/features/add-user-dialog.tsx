"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  Button,
  Dialog,
  DomainSelect,
  FormField,
  Input,
  Select,
  useToast,
} from "@/components/ui";
import { locations, roles } from "@/lib/mock-data";
import { useConsole } from "@/lib/console-store";
import type { User, UserRole } from "@/types";

export interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormState {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  domain: string;
  role: string;
  location: string;
  email: string;
  personNumber: string;
  costCenter: string;
  division: string;
  department: string;
}

const empty: FormState = {
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  domain: "unifiedit.tech",
  role: "",
  location: "",
  email: "",
  personNumber: "",
  costCenter: "",
  division: "",
  department: "",
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.username.trim()) errors.username = "Username is required";
  else if (!/^[a-z0-9._-]+$/i.test(form.username)) {
    errors.username = "Use letters, numbers, dots, hyphens, or underscores";
  }
  if (!form.domain) errors.domain = "Domain is required";
  if (!form.role) errors.role = "Role is required";
  if (!form.location) errors.location = "Location is required";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }
  return errors;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  const { organization, addUser } = useConsole();
  const { toast } = useToast();
  const [form, setForm] = React.useState<FormState>(empty);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setForm({
        ...empty,
        domain: organization.domains[0] ?? "unifiedit.tech",
      });
      setTouched(false);
    }
  }, [open, organization.domains]);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;
  const show = (key: keyof FormState) => (touched ? errors[key] : undefined);

  const set =
    (key: keyof FormState) => (value: string) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    setTouched(true);
    if (!isValid) return;

    const user: User = {
      id: `u-${Date.now()}`,
      firstName: form.firstName.trim(),
      middleName: form.middleName.trim() || undefined,
      lastName: form.lastName.trim(),
      managedAppleId: form.username.trim(),
      domain: form.domain,
      email: form.email.trim() || `${form.username.trim()}@${form.domain}`,
      role: form.role as UserRole,
      location: form.location,
      personNumber: form.personNumber.trim() || undefined,
      costCenter: form.costCenter.trim() || undefined,
      division: form.division.trim() || undefined,
      department: form.department.trim() || undefined,
      avatarInitials: `${form.firstName[0] ?? ""}${form.lastName[0] ?? ""}`,
      status: "Invited",
    };
    addUser(user);
    toast({
      title: "Account created",
      description: `${user.firstName} ${user.lastName} was invited.`,
      variant: "success",
    });
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Account"
      size="xl"
      footer={
        <Button variant="primary" disabled={!isValid} onClick={handleSave}>
          Save
        </Button>
      }
    >
      <div className="space-y-4">
        <FormField
          id="firstName"
          label="First Name"
          layout="horizontal"
          required
          error={show("firstName")}
        >
          <Input
            value={form.firstName}
            onChange={(e) => set("firstName")(e.target.value)}
            autoComplete="given-name"
          />
        </FormField>
        <FormField
          id="middleName"
          label="Middle Name (optional)"
          layout="horizontal"
        >
          <Input
            value={form.middleName}
            onChange={(e) => set("middleName")(e.target.value)}
            placeholder="Middle Name"
            autoComplete="additional-name"
          />
        </FormField>
        <FormField
          id="lastName"
          label="Last Name"
          layout="horizontal"
          required
          error={show("lastName")}
        >
          <Input
            value={form.lastName}
            onChange={(e) => set("lastName")(e.target.value)}
            autoComplete="family-name"
          />
        </FormField>
        <FormField
          id="managed-apple-id"
          label="Managed Apple ID"
          layout="horizontal"
          required
          info="Username plus your organization domain."
          error={show("username") ?? show("domain")}
        >
          <DomainSelect
            username={form.username}
            domain={form.domain}
            domains={organization.domains}
            onUsernameChange={set("username")}
            onDomainChange={set("domain")}
            invalid={Boolean(show("username") ?? show("domain"))}
          />
        </FormField>
        <FormField
          id="role-location"
          label=""
          layout="horizontal"
          error={show("role") ?? show("location")}
          className="[&>div:first-child]:hidden sm:grid-cols-[minmax(140px,180px)_1fr]"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Select
              id="role"
              aria-label="Role"
              value={form.role || undefined}
              onValueChange={set("role")}
              placeholder="Choose a Role"
              options={roles.map((r) => ({ value: r, label: r }))}
              invalid={Boolean(show("role"))}
              className="min-w-[160px] flex-1"
            />
            <span className="text-sm text-foreground-secondary">at</span>
            <Select
              id="location"
              aria-label="Location"
              value={form.location || undefined}
              onValueChange={set("location")}
              placeholder="Location"
              options={locations.map((l) => ({ value: l, label: l }))}
              invalid={Boolean(show("location"))}
              className="min-w-[160px] flex-1"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Add another role at location"
              className="text-accent"
              leftIcon={<Plus className="h-4 w-4" />}
            />
          </div>
        </FormField>
        <FormField id="email" label="Email Address" layout="horizontal" error={show("email")}>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
          />
        </FormField>
        <FormField
          id="personNumber"
          label="Person Number"
          layout="horizontal"
          info="Optional employee or payroll identifier"
        >
          <Input
            value={form.personNumber}
            onChange={(e) => set("personNumber")(e.target.value)}
            placeholder="123456"
          />
        </FormField>
        <FormField id="costCenter" label="Cost Center" layout="horizontal">
          <Input
            value={form.costCenter}
            onChange={(e) => set("costCenter")(e.target.value)}
            placeholder="Optional"
          />
        </FormField>
        <FormField id="division" label="Division" layout="horizontal">
          <Input
            value={form.division}
            onChange={(e) => set("division")(e.target.value)}
            placeholder="Optional"
          />
        </FormField>
        <FormField id="department" label="Department" layout="horizontal">
          <Input
            value={form.department}
            onChange={(e) => set("department")(e.target.value)}
            placeholder="Engineering"
          />
        </FormField>
      </div>
    </Dialog>
  );
}
