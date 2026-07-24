import { inject, injectable } from 'tsyringe';

import { DI_TOKENS } from '@/core/di/tokens';
import type { IStorageService } from '@/core/storage/storage.service';

import type { IAuthRepository } from '../domain/auth-repository.interface';
import type { AuthSession, LoginCredentials } from '../domain/auth.types';
import { AuthApiService } from './auth-api.service';

const SESSION_KEY = 'auth.session';

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly authApi: AuthApiService,
    @inject(DI_TOKENS.StorageService) private readonly storage: IStorageService,
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const session = await this.authApi.login(credentials);
    this.storage.setObject(SESSION_KEY, session);
    return session;
  }

  async logout(): Promise<void> {
    await this.authApi.logout();
    this.storage.delete(SESSION_KEY);
  }

  restoreSession(): AuthSession | undefined {
    return this.storage.getObject<AuthSession>(SESSION_KEY);
  }
}
