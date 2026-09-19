/**
 * Single source of truth for the values most likely to change.
 */

/**
 * When the site is expected back online: Friday 25 September 2026, end of day.
 * The explicit +01:00 (West Africa Time) offset is deliberate — it pins the
 * countdown to one real instant, so a visitor in Lagos and a visitor in London
 * see the same number rather than each counting to their own local midnight.
 */
export const BACK_ONLINE_ISO = "2026-09-25T23:59:59+01:00";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgldraz";

export const INSTAGRAM_HANDLE = "ymagenafrica";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
