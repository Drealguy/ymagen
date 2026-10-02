import type { Metadata } from "next";

export const SITE_NAME = "Ymagen";
export const DEFAULT_TITLE = "Ymagen | Marketing That Grows Your Business";
export const DEFAULT_DESCRIPTION =
  "Ymagen is a digital marketing agency for Nigerian small and growing businesses. We build marketing systems that attract customers, generate qualified leads and increase sales.";

/**
 * Per-page metadata with a canonical URL and matching social previews.
 * Next replaces (not merges) nested openGraph/twitter objects, so every page
 * restates them here rather than relying on the root layout.
 */
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Ymagen: marketing that grows your business" };

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_NG",
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

/** schema.org Organization data for the home page, so search engines can show Ymagen's details. */
export function organizationJsonLd({ url, instagram, phone }: { url: string; instagram: string; phone: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url,
    logo: `${url}/logo-mark.png`,
    description: DEFAULT_DESCRIPTION,
    slogan: "Stop guessing. Start growing.",
    areaServed: { "@type": "Country", name: "Nigeria" },
    sameAs: [instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: phone,
      availableLanguage: ["English"],
    },
  };
}

/** Serialise JSON-LD safely for a <script> tag (no closing-tag injection). */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
