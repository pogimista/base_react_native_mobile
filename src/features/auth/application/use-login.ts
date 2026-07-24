import { useMutation } from '@tanstack/react-query';

import { useDependency } from '@/shared/hooks/use-dependency';

import type { LoginCredentials } from '../domain/auth.types';
import { LoginUseCase } from '../domain/login.use-case';
import { useAuthStore } from './auth.store';

export function useLogin() {
  const loginUseCase = useDependency(LoginUseCase);
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUseCase.execute(credentials),
    onSuccess: (session) => setSession(session),
  });
}
