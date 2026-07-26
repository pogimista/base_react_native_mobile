import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    startTime?: number;
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function logRequest(config: InternalAxiosRequestConfig) {
  config.startTime = Date.now();
  console.log(`[api] --> ${config.method?.toUpperCase()} ${config.url}`);
  if (config.data !== undefined) {
    console.log(`[api]     body: ${JSON.stringify(config.data)}`);
  }
  return config;
}

function logResponse(
  config: InternalAxiosRequestConfig | undefined,
  status: number,
  data: unknown,
) {
  const duration = config?.startTime ? Date.now() - config.startTime : 0;
  const method = config?.method?.toUpperCase() ?? '?';
  const url = config?.url ?? '?';
  console.log(`[api] <-- ${method} ${url} ${status} (${duration}ms)`);
  if (data !== undefined) {
    console.log(`[api]     body: ${JSON.stringify(data)}`);
  }
}

export function createApiClient(baseUrl: string) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(logRequest);

  instance.interceptors.response.use(
    (response) => {
      logResponse(response.config, response.status, response.data);
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status ?? 0;
      logResponse(error.config, status, error.response?.data);

      return Promise.reject(
        new ApiError(
          status,
          `${error.config?.method?.toUpperCase()} ${error.config?.url} failed: ${status || error.message}`,
        ),
      );
    },
  );

  return {
    get: <T>(path: string) => instance.get<T>(path).then((response) => response.data),
    post: <T>(path: string, body: unknown) =>
      instance.post<T>(path, body).then((response) => response.data),
    patch: <T>(path: string, body: unknown) =>
      instance.patch<T>(path, body).then((response) => response.data),
    delete: (path: string) => instance.delete(path).then(() => undefined),
  };
}

export const apiClient = createApiClient('https://jsonplaceholder.typicode.com');
