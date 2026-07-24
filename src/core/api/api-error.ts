import type { AxiosError } from 'axios';

export class ApiError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static fromAxiosError(error: AxiosError): ApiError {
    const data = error.response?.data as { message?: string; code?: string } | undefined;
    return new ApiError(
      data?.message ?? error.message ?? 'Unexpected network error',
      error.response?.status,
      data?.code ?? error.code,
      error.response?.data,
    );
  }

  get isAuthError() {
    return this.status === 401 || this.status === 403;
  }
}
