import { injectable } from 'tsyringe';

import { BaseApiClient } from '@/core/api/base-api-client';

import type { AuthSession, LoginCredentials } from '../domain/auth.types';

@injectable()
export class AuthApiService extends BaseApiClient {
  constructor() {
    super(process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com');
  }

  login(credentials: LoginCredentials) {
    return this.post<AuthSession>('/auth/login', credentials);
  }

  logout() {
    return this.post<void>('/auth/logout');
  }
}
