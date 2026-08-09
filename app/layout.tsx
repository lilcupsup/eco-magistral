import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const iconUrl = `${basePath}/icon.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ECO MAGISTRAL | Building Modern Infrastructure",
    template: "%s | ECO MAGISTRAL",
  },
  description:
    "Roads, landscapes and public spaces shaped as one connected environment.",
  icons: {
    icon: iconUrl,
    shortcut: iconUrl,
    apple: iconUrl,
  },
  openGraph: {
    title: "ECO MAGISTRAL",
    description: "Building Modern Infrastructure",
    images: ["/images/hero/eco-magistral-hero.avif"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
