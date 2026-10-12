import { PaymentSettings } from '../types.js';

export const DEFAULT_ADMIN_WHATSAPP_NUMBER = '+252711870601';
export const DEFAULT_PAYMENT_NUMBER = '+252615941664';

/**
 * Sanitizes phone numbers to standard WhatsApp format with digits only.
 * Example: "+252 71 187 0601" -> "252711870601"
 */
export function cleanWhatsAppNumber(phone?: string | null): string {
  if (!phone) return '252711870601';
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned || '252711870601';
}

/**
 * Returns the official WhatsApp contact URL pointing to the Admin WhatsApp number.
 * Dynamic: Always prioritizes settings.admin_whatsapp_number from Site Settings so admin
 * can update it anytime without touching code.
 * 
 * STRICT REQUIREMENT: This function NEVER returns or mixes with the manual payment number (+252615941664).
 */
export function getAdminWhatsAppUrl(
  settings?: PaymentSettings | null,
  prefilledText?: string
): string {
  const rawNumber = settings?.admin_whatsapp_number || DEFAULT_ADMIN_WHATSAPP_NUMBER;
  const cleanPhone = cleanWhatsAppNumber(rawNumber);
  const base = `https://wa.me/${cleanPhone}`;
  if (prefilledText && prefilledText.trim()) {
    return `${base}?text=${encodeURIComponent(prefilledText.trim())}`;
  }
  return base;
}
