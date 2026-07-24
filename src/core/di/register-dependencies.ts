// Must run before any @injectable()/@inject() decorated class is evaluated —
// tsyringe reads Reflect.getMetadata, which doesn't exist without this
// polyfill. Depending on platform/bundling mode, our custom index.js entry
// (which also imports this) isn't always the module that runs first, so it's
// imported here too, as the first line of the composition root itself.
import 'reflect-metadata';
import { container } from 'tsyringe';

import { AuthApiService } from '@/features/auth/data/auth-api.service';
import { AuthRepository } from '@/features/auth/data/auth.repository';

import { StorageService } from '../storage/storage.service';
import { DI_TOKENS } from './tokens';

/**
 * Composition root: the one place allowed to know about every feature's
 * concrete implementations. Everything else in the app depends on
 * interfaces/tokens or on injectable concrete classes resolved through
 * useDependency — never on this file. Call once, before the app renders.
 */
export function registerDependencies() {
  container.registerSingleton(DI_TOKENS.StorageService, StorageService);
  container.registerSingleton(AuthApiService, AuthApiService);
  container.registerSingleton(DI_TOKENS.AuthRepository, AuthRepository);
}
