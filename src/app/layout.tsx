import type { Metadata, Viewport } from "next";
import { DM_Sans, Rethink_Sans } from "next/font/google";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ymagen — Under Maintenance",
  description:
    "Ymagen is temporarily offline for maintenance. Leave your WhatsApp number and we'll message you the moment we're back.",
  openGraph: {
    title: "Ymagen — Under Maintenance",
    description:
      "Ymagen is temporarily offline for maintenance. Leave your WhatsApp number and we'll message you the moment we're back.",
    siteName: "Ymagen",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#03060b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rethinkSans.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
