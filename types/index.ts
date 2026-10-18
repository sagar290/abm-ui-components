export type StatusTone = "ok" | "warning" | "error" | "neutral";

export type UserRole =
  | "Administrator"
  | "Manager"
  | "Staff"
  | "Content Manager"
  | "Device Enrollment Manager";

export interface Organization {
  id: string;
  name: string;
  domains: string[];
}

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  managedAppleId: string;
  domain: string;
  email: string;
  role: UserRole;
  location: string;
  personNumber?: string;
  costCenter?: string;
  division?: string;
  department?: string;
  avatarInitials: string;
  status: "Active" | "Invited" | "Disabled";
}

export interface DeviceIssue {
  id: string;
  settingId: string;
  label: string;
  message: string;
}

export interface DeviceStorage {
  usedGb: number;
  totalGb: number;
}

export interface Device {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  osVersion: string;
  assignedUserId?: string;
  assignedUserName?: string;
  lastSeen: string;
  firewall: StatusTone;
  fileVault: StatusTone;
  status: "Online" | "Offline" | "Needs Attention";
  storage: DeviceStorage;
  issues: DeviceIssue[];
  platform: "iPhone" | "iPad" | "Mac";
  imageColor: string;
}

export interface SettingDefinition {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "wifi" | "paint" | "lock" | "firewall" | "disk" | "user";
  platform: "All" | "macOS" | "iOS" | "iPadOS";
  category: "Recommended" | "Security" | "Network" | "Personalization" | "All";
  /** Device issue id cleared when this setting is configured */
  remediatesIssueId?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  href?: string;
}

export type NavGroup =
  | "deployment"
  | "accounts"
  | "assets"
  | "content";

/** Nested sidebar link (one or more levels under a NavItem). */
export interface NavSubItem {
  id: string;
  label: string;
  href: string;
  alertCount?: number;
  children?: NavSubItem[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  group: NavGroup;
  alertCount?: number;
  /** Expandable submenu entries under this item */
  children?: NavSubItem[];
}

export interface AppCatalogItem {
  id: string;
  name: string;
  platforms: string;
  iconColor: "blue" | "orange" | "green" | "purple" | "gray";
  initials: string;
}
