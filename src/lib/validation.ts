/** Form validation shared by the appointment form and the contact form. */

export type FieldResult = { ok: true; value: string } | { ok: false; message: string };

export function validateName(input: string): FieldResult {
  const value = input.trim().replace(/\s+/g, " ");
  if (value.length < 2) return { ok: false, message: "Enter your name (at least 2 letters)." };
  if (value.length > 80) return { ok: false, message: "Name is too long. Use 80 characters or fewer." };
  return { ok: true, value };
}

/**
 * Indian mobile numbers: 10 digits starting 6-9. Accepts spaces, dashes,
 * a leading 0, or +91 / 91. Returns the plain 10 digits.
 */
export function validatePhone(input: string): FieldResult {
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  digits = digits.replace(/\D/g, "");
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return { ok: false, message: "Enter a 10-digit Indian mobile number, for example 98765 43210." };
  }
  return { ok: true, value: digits };
}

export function validateMessage(input: string, required = true): FieldResult {
  const value = input.trim();
  if (required && value.length < 5) return { ok: false, message: "Write a short message (at least 5 characters)." };
  if (value.length > 600) return { ok: false, message: "Message is too long. Use 600 characters or fewer." };
  return { ok: true, value };
}

export const formatPhone = (tenDigits: string) => `${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
