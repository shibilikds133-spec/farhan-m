import type {
  CreatePaymentIntentInput,
  PaymentStatusTransitionInput,
  RecordCashEntryInput,
} from "../contracts/payment.contract";
import type { BackendResult } from "../contracts/common.contract";
import type { PaymentFilters } from "../dto/payment.dto";
import { ERROR_CODES } from "../errors/errorCodes";
import { fail, ok } from "../errors/resultHelpers";
import { validationError } from "../errors/createBackendError";
import {
  validateDateRange,
  validatePhone,
  validatePositiveAmount,
  validateRequiredString,
  includesValue,
} from "./commonSchemas";

const paymentCategories = ["monthly_dues", "special_event"] as const;
const paymentMethods = ["upi", "qr_code", "cash_handover", "admin_cash_entry"] as const;
const paymentStatuses = ["pending", "confirmed", "failed", "refunded", "cancelled", "rejected"] as const;
const monthlyTiers = ["base", "premium", "custom", "flexible"] as const;

export interface CreatePaymentIntentValidationOptions {
  specialEventMinimumAmount: number;
}

export function validateCreatePaymentIntentInput(
  input: Partial<CreatePaymentIntentInput>,
  options: CreatePaymentIntentValidationOptions
): BackendResult<CreatePaymentIntentInput> {
  const phone = validatePhone(input.payerPhone, "payerPhone");
  if (!phone.ok) return fail(phone.error!);

  if (!input.category || !includesValue(paymentCategories, input.category)) {
    return fail(validationError("Invalid payment category.", "category"));
  }

  if (!input.method || !includesValue(paymentMethods, input.method)) {
    return fail(validationError("Invalid payment method.", "method"));
  }

  if (input.tier && !includesValue(monthlyTiers, input.tier)) {
    return fail(validationError("Invalid monthly tier.", "tier"));
  }

  if (input.category === "monthly_dues" && (!input.selectedMonthIds || input.selectedMonthIds.length === 0)) {
    return fail(validationError("Select at least one pending month.", "selectedMonthIds", ERROR_CODES.MISSING_REQUIRED_FIELD));
  }

  if (input.category === "special_event") {
    const amount = validatePositiveAmount(input.customAmount, "customAmount", options.specialEventMinimumAmount);
    if (!amount.ok) return fail(amount.error!);
    input.customAmount = amount.data!;
  }

  if ((input.method === "cash_handover" || input.method === "admin_cash_entry") && !input.receivedByAdminId) {
    return fail(validationError("Receiving admin is required for cash payments.", "receivedByAdminId"));
  }

  return ok({
    memberQuery: input.memberQuery,
    payerName: input.payerName,
    payerPhone: phone.data!,
    category: input.category,
    method: input.method,
    selectedMonthIds: input.selectedMonthIds,
    tier: input.tier,
    customAmount: input.customAmount,
    eventId: input.eventId,
    receivedByAdminId: input.receivedByAdminId,
    notes: input.notes,
  });
}

export interface RecordCashEntryValidationOptions {
  cashEntryMinimumAmount: number;
}

export function validateRecordCashEntryInput(
  input: Partial<RecordCashEntryInput>,
  options: RecordCashEntryValidationOptions
): BackendResult<RecordCashEntryInput> {
  if (!input.memberId) {
    const guestName = validateRequiredString(input.guestName, "guestName", "Guest name");
    if (!guestName.ok) return fail(guestName.error!);

    const guestPhone = validatePhone(input.guestPhone, "guestPhone");
    if (!guestPhone.ok) return fail(guestPhone.error!);

    input.guestName = guestName.data!;
    input.guestPhone = guestPhone.data!;
  }

  if (!input.category || !includesValue(paymentCategories, input.category)) {
    return fail(validationError("Invalid payment category.", "category"));
  }

  const amount = validatePositiveAmount(input.amount, "amount", options.cashEntryMinimumAmount);
  if (!amount.ok) return fail(amount.error!);

  const receivedByAdminId = validateRequiredString(input.receivedByAdminId, "receivedByAdminId", "Receiving admin");
  if (!receivedByAdminId.ok) return fail(receivedByAdminId.error!);

  if (input.category === "monthly_dues" && (!input.months || input.months.length === 0)) {
    return fail(validationError("At least one month is required.", "months"));
  }

  if (input.category === "special_event" && !input.eventId) {
    return fail(validationError("Event is required.", "eventId"));
  }

  return ok({
    memberId: input.memberId,
    guestName: input.guestName,
    guestPhone: input.guestPhone,
    category: input.category,
    amount: amount.data!,
    months: input.months,
    eventId: input.eventId,
    receivedByAdminId: receivedByAdminId.data!,
    notes: input.notes,
  });
}

export function validatePaymentStatusTransitionInput(
  input: Partial<PaymentStatusTransitionInput>
): BackendResult<PaymentStatusTransitionInput> {
  const paymentId = validateRequiredString(input.paymentId, "paymentId", "Payment ID");
  if (!paymentId.ok) return fail(paymentId.error!);

  return ok({
    paymentId: paymentId.data!,
    reason: input.reason,
    notes: input.notes,
  });
}

export function validatePaymentFilters(input: PaymentFilters): BackendResult<PaymentFilters> {
  if (input.category && !includesValue(paymentCategories, input.category)) {
    return fail(validationError("Invalid payment category filter.", "category"));
  }

  if (input.method && !includesValue(paymentMethods, input.method)) {
    return fail(validationError("Invalid payment method filter.", "method"));
  }

  if (input.status && !includesValue(paymentStatuses, input.status)) {
    return fail(validationError("Invalid payment status filter.", "status"));
  }

  const dateRange = validateDateRange({ from: input.from, to: input.to });
  if (!dateRange.ok) return fail(dateRange.error!);

  return ok(input);
}

export function validateReceiptTokenInput(input: {
  receiptId?: string;
  token?: string;
}): BackendResult<{ receiptId: string; token: string }> {
  const receiptId = validateRequiredString(input.receiptId, "receiptId", "Receipt ID");
  if (!receiptId.ok) return fail(receiptId.error!);

  const token = validateRequiredString(input.token, "token", "Receipt token");
  if (!token.ok) return fail(token.error!);

  return ok({
    receiptId: receiptId.data!,
    token: token.data!,
  });
}
