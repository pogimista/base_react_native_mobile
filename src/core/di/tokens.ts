/**
 * Symbol tokens for dependencies resolved by interface rather than concrete
 * class (i.e. anywhere a feature depends on an abstraction it doesn't own).
 * Concrete, non-swappable classes (e.g. AuthApiService, LoginUseCase) are
 * injected by class reference instead and don't need a token here.
 */
export const DI_TOKENS = {
  StorageService: Symbol('StorageService'),
  AuthRepository: Symbol('AuthRepository'),
} as const;
