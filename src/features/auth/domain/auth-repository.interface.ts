import type { AuthSession, LoginCredentials } from './auth.types';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  logout(): Promise<void>;
  restoreSession(): AuthSession | undefined;
}
