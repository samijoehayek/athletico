// lib/site.ts
//
// Club-wide contact details shared by every page.

/** HQ WhatsApp, digits only with country code. */
export const WHATSAPP_NUMBER = "96170202030";

/** Padel and SPA bookings at Athletico Sports City, digits only with country code. */
export const PADEL_SPA_WHATSAPP_NUMBER = "96176186647";

export const DEFAULT_WHATSAPP_MESSAGE = "Hello! I would like to get more information.";

export function whatsappLink(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
  number: string = WHATSAPP_NUMBER,
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Instagram post with the weekly training schedules for every branch. */
export const TRAINING_SCHEDULE_URL = "https://www.instagram.com/p/DcePPf1DaCv/";

export const MARKETING_EMAIL = "Philmatta@athleticosportsclub.com";
export const CAREERS_EMAILS = [
  "Philmatta@athleticosportsclub.com",
  "V.jamous@athleticosportsclub.com",
];
