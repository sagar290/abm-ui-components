import type { Metadata } from "next";
import { ConsoleProvider } from "@/lib/console-store";
import { ThemeProvider, themeBootstrapScript } from "@/lib/theme";
import { ToastProvider } from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Manager",
  description:
    "Apple Business–style admin console UI kit — users, devices, and settings.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-preset="normal" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </head>
      <body className="min-h-full bg-canvas font-sans text-foreground antialiased">
        <ThemeProvider>
          <ConsoleProvider>
            <ToastProvider>{children}</ToastProvider>
          </ConsoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
