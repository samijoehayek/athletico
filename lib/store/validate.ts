// lib/store/validate.ts
// Shared between the checkout form and the order route, so the browser and the
// server agree on what a valid order looks like.

import { getBranch } from "../branches";
import { PAYMENT_METHODS } from "./pricing";
import type { CustomerDetails, PaymentMethodId } from "./types";

export type FieldErrors = Partial<Record<keyof CustomerDetails | "reference", string>>;

/** Lebanese numbers are 7–8 digits after the country code; we accept either form. */
export function isValidLebanesePhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  const national = digits.startsWith("961") ? digits.slice(3) : digits.replace(/^0/, "");
  return national.length >= 7 && national.length <= 8;
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

export function validateOrder(
  customer: CustomerDetails,
  payment: { method: PaymentMethodId; reference: string },
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

  // Every order is collected, so the branch replaces a delivery address.
  if (!getBranch(customer.branch)) {
    errors.branch = "Please choose the branch you'll collect from.";
  }

  const method = PAYMENT_METHODS.find((m) => m.id === payment.method);
  if (method?.requiresReference && !payment.reference?.trim()) {
    errors.reference = "Please enter the transaction reference from your app.";
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
