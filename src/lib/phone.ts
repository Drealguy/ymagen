/**
 * Validates a WhatsApp/phone number. Returns an error message, or null when
 * the number looks dialable. E.164 allows 15 digits at most; 8 is a sensible
 * floor for a real number.
 */
export function validatePhone(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return "Please enter your WhatsApp number.";
  if (/[a-z]/i.test(trimmed)) return "Numbers only — letters aren't allowed.";

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8) return "That number looks too short.";
  if (digits.length > 15) return "That number looks too long.";
  return null;
}
