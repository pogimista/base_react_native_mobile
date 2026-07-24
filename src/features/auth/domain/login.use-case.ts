import { inject, injectable } from 'tsyringe';

import { DI_TOKENS } from '@/core/di/tokens';
import { BaseUseCase } from '@/core/domain/base-use-case';

import type { IAuthRepository } from './auth-repository.interface';
import type { AuthSession, LoginCredentials } from './auth.types';

@injectable()
export class LoginUseCase extends BaseUseCase<LoginCredentials, AuthSession> {
  constructor(@inject(DI_TOKENS.AuthRepository) private readonly authRepository: IAuthRepository) {
    super();
  }

  execute(credentials: LoginCredentials): Promise<AuthSession> {
    if (!credentials.email || !credentials.password) {
      return Promise.reject(new Error('Email and password are required'));
    }
    return this.authRepository.login(credentials);
  }
}
