import type { ErrorCode } from "./errorCodes";

export type BackendErrorType =
  | "validation"
  | "auth"
  | "permission"
  | "not_found"
  | "conflict"
  | "rate_limit"
  | "payment"
  | "storage"
  | "server";

export interface BackendError {
  code: ErrorCode;
  type: BackendErrorType;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
  retryable: boolean;
}
