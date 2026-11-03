// lib/store/validate.ts
// Shared between the checkout form and the order route, so the browser and the
// server agree on what a valid order looks like.

import { getBranch } from "../branches";
import type { PaymentMethodId } from "../payments/methods";
import type { CustomerDetails } from "./types";

export type FieldErrors = Partial<
  Record<keyof CustomerDetails | "method" | "mobile" | "terms", string>
>;

export const TERMS_NOT_ACCEPTED =
  "Please confirm you have read and accept the Terms and Conditions of Sale.";

/** Lebanese numbers are 7–8 digits after the country code; we accept either form. */
export function isValidLebanesePhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  const national = digits.startsWith("961") ? digits.slice(3) : digits.replace(/^0/, "");
  return national.length >= 7 && national.length <= 8;
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

/**
 * `available` is the list of methods the server offers right now; a method
 * outside it (switched off, or a crafted request) is rejected.
 */
export function validateOrder(
  customer: CustomerDetails,
  payment: { method: PaymentMethodId | undefined; mobile?: string },
  available: PaymentMethodId[],
): FieldErrors {
  const errors: FieldErrors = {};

  if (!customer.name?.trim() || customer.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!customer.phone?.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!isValidLebanesePhone(customer.phone)) {
    errors.phone = "Please enter a valid Lebanese number, e.g. 70 202 030.";
  }
  if (!customer.email?.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!isValidEmail(customer.email)) {
    errors.email = "That email address doesn't look right.";
  }

  if (customer.playerName && customer.playerName.trim().length > 120) {
    errors.playerName = "Please shorten the player's name.";
  }

  // Every order is collected, so the branch replaces a delivery address.
  if (!getBranch(customer.branch)) {
    errors.branch = "Please choose the branch you'll collect from.";
  }

  if (!payment.method || !available.includes(payment.method)) {
    errors.method = "Please choose how you'd like to pay.";
  } else if (payment.method === "bob-wallet") {
    // The payment request is pushed to the BOB Finance app registered on this number.
    if (!payment.mobile?.trim()) {
      errors.mobile = "Please enter the mobile number of your BOB Finance account.";
    } else if (!isValidLebanesePhone(payment.mobile)) {
      errors.mobile = "Please enter a valid Lebanese mobile number, e.g. 70 202 030.";
    }
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
