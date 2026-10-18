import type {
  AppCatalogItem,
  ChecklistItem,
  Device,
  NavItem,
  Organization,
  SettingDefinition,
  User,
} from "@/types";

export const organizations: Organization[] = [
  {
    id: "org-1",
    name: "Unified IT LLC",
    domains: ["unifiedit.tech", "unifiedit.tech.appleid.com"],
  },
  {
    id: "org-2",
    name: "Acme Education",
    domains: ["edu.acme.com"],
  },
];

export const navItems: NavItem[] = [
  {
    id: "subscription",
    label: "Subscription",
    href: "/subscription",
    group: "deployment",
  },
  { id: "activity", label: "Activity", href: "/activity", group: "deployment" },
  {
    id: "locations",
    label: "Locations",
    href: "/locations",
    group: "deployment",
  },
  {
    id: "users",
    label: "Users",
    href: "/users",
    group: "accounts",
    children: [
      {
        id: "user-groups",
        label: "User Groups",
        href: "/user-groups",
      },
      {
        id: "access",
        label: "Access Management",
        href: "/access-management",
      },
    ],
  },
  {
    id: "devices",
    label: "Devices",
    href: "/devices",
    group: "assets",
    alertCount: 2,
    children: [
      {
        id: "assignment-history",
        label: "Assignment History",
        href: "/assignment-history",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    group: "content",
    children: [
      {
        id: "collections",
        label: "Collections",
        href: "/collections",
      },
      {
        id: "apps",
        label: "Apps",
        href: "/apps",
      },
    ],
  },
  {
    id: "login",
    label: "Login",
    href: "/login",
    group: "content",
  },
];

export const appsCatalog: AppCatalogItem[] = [
  {
    id: "app-1",
    name: "Dashlane - Password Manager",
    platforms: "App · iOS, iPadOS, macOS",
    iconColor: "green",
    initials: "D",
  },
  {
    id: "app-2",
    name: "UniFi",
    platforms: "App · iOS, iPadOS",
    iconColor: "blue",
    initials: "U",
  },
  {
    id: "app-3",
    name: "UniFi Access",
    platforms: "App · iOS, iPadOS",
    iconColor: "blue",
    initials: "UA",
  },
  {
    id: "app-4",
    name: "UniFi Protect",
    platforms: "App · iOS, iPadOS",
    iconColor: "purple",
    initials: "UP",
  },
  {
    id: "app-5",
    name: "Zendesk Support",
    platforms: "App · iOS, iPadOS",
    iconColor: "green",
    initials: "Z",
  },
];

export const checklistItems: ChecklistItem[] = [
  {
    id: "c1",
    label: "Add your first users",
    done: true,
    href: "/users",
  },
  {
    id: "c2",
    label: "Enroll a device",
    done: false,
    href: "/devices",
  },
  {
    id: "c3",
    label: "Configure security settings",
    done: false,
    href: "/settings",
  },
  {
    id: "c4",
    label: "Assign apps",
    done: false,
    href: "/apps",
  },
];

export const users: User[] = [
  {
    id: "u1",
    firstName: "Jordan",
    lastName: "Lee",
    managedAppleId: "jordan.lee",
    domain: "unifiedit.tech",
    email: "jordan.lee@unifiedit.tech",
    role: "Administrator",
    location: "San Francisco",
    personNumber: "E-1001",
    costCenter: "IT-200",
    division: "Technology",
    department: "IT Operations",
    avatarInitials: "JL",
    status: "Active",
  },
  {
    id: "u2",
    firstName: "Sam",
    middleName: "R.",
    lastName: "Patel",
    managedAppleId: "sam.patel",
    domain: "managed.acme.com",
    email: "sam.patel@acme.com",
    role: "Manager",
    location: "Austin",
    personNumber: "E-1042",
    costCenter: "OPS-110",
    division: "Operations",
    department: "Facilities",
    avatarInitials: "SP",
    status: "Active",
  },
  {
    id: "u3",
    firstName: "Alex",
    lastName: "Nguyen",
    managedAppleId: "alex.nguyen",
    domain: "acme.com",
    email: "alex.nguyen@acme.com",
    role: "Staff",
    location: "Remote",
    department: "Design",
    avatarInitials: "AN",
    status: "Invited",
  },
  {
    id: "u4",
    firstName: "Casey",
    lastName: "Brooks",
    managedAppleId: "casey.brooks",
    domain: "managed.acme.com",
    email: "casey.brooks@acme.com",
    role: "Content Manager",
    location: "New York",
    personNumber: "E-1108",
    costCenter: "MKT-050",
    division: "Marketing",
    department: "Brand",
    avatarInitials: "CB",
    status: "Active",
  },
  {
    id: "u5",
    firstName: "Riley",
    lastName: "Kim",
    managedAppleId: "riley.kim",
    domain: "managed.acme.com",
    email: "riley.kim@acme.com",
    role: "Device Enrollment Manager",
    location: "San Francisco",
    personNumber: "E-1120",
    costCenter: "IT-200",
    division: "Technology",
    department: "Endpoint",
    avatarInitials: "RK",
    status: "Disabled",
  },
];

export const devices: Device[] = [
  {
    id: "d1",
    name: "Jordan’s MacBook Pro",
    model: "MacBook Pro 14-inch (M3)",
    serialNumber: "C02YW0ABCD1",
    osVersion: "macOS 15.1",
    assignedUserId: "u1",
    assignedUserName: "Jordan Lee",
    lastSeen: "2 minutes ago",
    firewall: "error",
    fileVault: "ok",
    status: "Needs Attention",
    storage: { usedGb: 312, totalGb: 512 },
    platform: "Mac",
    imageColor: "surface-secondary",
    issues: [
      {
        id: "issue-firewall",
        settingId: "set-firewall",
        label: "Firewall",
        message: "Firewall is off",
      },
    ],
  },
  {
    id: "d2",
    name: "Sam’s iPhone 15",
    model: "iPhone 15 Pro",
    serialNumber: "F2LX9ABCD12",
    osVersion: "iOS 18.1",
    assignedUserId: "u2",
    assignedUserName: "Sam Patel",
    lastSeen: "1 hour ago",
    firewall: "ok",
    fileVault: "ok",
    status: "Online",
    storage: { usedGb: 86, totalGb: 256 },
    platform: "iPhone",
    imageColor: "surface-secondary",
    issues: [],
  },
  {
    id: "d3",
    name: "Conference Room iPad",
    model: "iPad Pro 12.9-inch",
    serialNumber: "DMPX4ABCD99",
    osVersion: "iPadOS 18.0",
    lastSeen: "3 days ago",
    firewall: "ok",
    fileVault: "warning",
    status: "Needs Attention",
    storage: { usedGb: 40, totalGb: 128 },
    platform: "iPad",
    imageColor: "surface-secondary",
    issues: [
      {
        id: "issue-filevault",
        settingId: "set-filevault",
        label: "FileVault",
        message: "Encryption not enforced",
      },
    ],
  },
  {
    id: "d4",
    name: "Casey’s MacBook Air",
    model: "MacBook Air 13-inch (M2)",
    serialNumber: "FVFX2ABCD77",
    osVersion: "macOS 14.6",
    assignedUserId: "u4",
    assignedUserName: "Casey Brooks",
    lastSeen: "Yesterday",
    firewall: "ok",
    fileVault: "ok",
    status: "Offline",
    storage: { usedGb: 180, totalGb: 256 },
    platform: "Mac",
    imageColor: "surface-secondary",
    issues: [],
  },
];

export const settingsCatalog: SettingDefinition[] = [
  {
    id: "set-firewall",
    title: "Application Layer Firewall",
    description: "Block unwanted incoming connections on managed Macs.",
    icon: "firewall",
    platform: "macOS",
    category: "Security",
    remediatesIssueId: "issue-firewall",
  },
  {
    id: "set-filevault",
    title: "FileVault",
    description: "Require full-disk encryption on macOS devices.",
    icon: "lock",
    platform: "macOS",
    category: "Security",
    remediatesIssueId: "issue-filevault",
  },
  {
    id: "set-passcode",
    title: "Passcode",
    description: "Enforce passcode complexity and lock timeouts.",
    icon: "shield",
    platform: "All",
    category: "Recommended",
  },
  {
    id: "set-wifi",
    title: "Wi‑Fi",
    description: "Push corporate Wi‑Fi profiles to enrolled devices.",
    icon: "wifi",
    platform: "All",
    category: "Network",
  },
  {
    id: "set-wallpaper",
    title: "Wallpaper",
    description: "Set a company wallpaper for supervised devices.",
    icon: "paint",
    platform: "iOS",
    category: "Personalization",
  },
  {
    id: "set-storage",
    title: "Storage Management",
    description: "Alert when device storage is critically low.",
    icon: "disk",
    platform: "All",
    category: "All",
  },
  {
    id: "set-restrictions",
    title: "Restrictions",
    description: "Limit App Store, camera, and screen recording.",
    icon: "user",
    platform: "iOS",
    category: "Recommended",
  },
];

export const roles: string[] = [
  "Administrator",
  "Manager",
  "Staff",
  "Content Manager",
  "Device Enrollment Manager",
];

export const locations: string[] = [
  "San Francisco",
  "Austin",
  "New York",
  "Remote",
];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getDeviceById(id: string): Device | undefined {
  return devices.find((d) => d.id === id);
}

export function countDeviceIssues(list: Device[] = devices): number {
  return list.reduce((sum, d) => sum + d.issues.length, 0);
}
