import { useMemo } from 'react';
import { container, type InjectionToken } from 'tsyringe';

/**
 * Resolves a dependency from the tsyringe container inside a component/hook.
 * Works for both class references (container.resolve(AuthApiService)) and
 * Symbol tokens registered against an interface (DI_TOKENS.StorageService).
 */
export function useDependency<T>(token: InjectionToken<T>): T {
  return useMemo(() => container.resolve(token), [token]);
}
