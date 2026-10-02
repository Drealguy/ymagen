import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Stack_Sans_Headline, Stack_Sans_Notch, Stack_Sans_Text } from "next/font/google";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const switzer = localFont({
  src: "../fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

const stackHeadline = Stack_Sans_Headline({
  subsets: ["latin"],
  variable: "--font-stack-headline",
  display: "swap",
});

const stackText = Stack_Sans_Text({
  subsets: ["latin"],
  variable: "--font-stack-text",
  display: "swap",
});

const stackNotch = Stack_Sans_Notch({
  subsets: ["latin"],
  variable: "--font-stack-notch",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "digital marketing agency Nigeria",
    "social media management Nigeria",
    "Facebook and Instagram ads Nigeria",
    "Google ads Nigeria",
    "branding agency Nigeria",
    "website design Nigeria",
    "email marketing",
    "lead generation",
    "small business marketing Nigeria",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "marketing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_NG",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${switzer.variable} ${stackHeadline.variable} ${stackText.variable} ${stackNotch.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
