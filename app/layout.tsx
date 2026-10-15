import type { Metadata } from "next";
import { ConsoleProvider } from "@/lib/console-store";
import { ToastProvider } from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Manager",
  description:
    "Apple Business–style admin console UI kit — users, devices, and settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full font-sans antialiased">
        <ConsoleProvider>
          <ToastProvider>{children}</ToastProvider>
        </ConsoleProvider>
      </body>
    </html>
  );
}
