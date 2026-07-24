import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { ApiError } from './api-error';

/**
 * Wraps one axios instance per subclass with consistent timeout/error
 * normalization. Subclasses expose feature-specific methods (login, fetchX)
 * built on the protected get/post/put/delete helpers — callers never touch
 * axios directly.
 */
export abstract class BaseApiClient {
  protected readonly http: AxiosInstance;

  protected constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.http = axios.create({ baseURL, timeout: 15_000, ...config });

    this.http.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(ApiError.fromAxiosError(error)),
    );
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.http.get<T>(url, config).then((res) => res.data);
  }

  protected post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.http.post<T>(url, body, config).then((res) => res.data);
  }

  protected put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.http.put<T>(url, body, config).then((res) => res.data);
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.http.delete<T>(url, config).then((res) => res.data);
  }
}
