# my-app

An [Expo](https://expo.dev) app using file-based routing ([Expo Router](https://docs.expo.dev/router/introduction)) and a layered, dependency-injected architecture.

## Requirements

- Node.js **20.19.4+** (React Native 0.86 / Metro requires it — `18.x` will fail to bundle)

## Get started

```bash
npm install
npx expo start
```

In the output you'll find options to open the app in a development build, Android emulator, iOS simulator, or the web.

> **Note:** this project uses `react-native-mmkv` (v4, Nitro modules) for local storage. It requires a custom dev client — it will **not** run inside Expo Go. Use `npx expo prebuild` and run on a simulator/device, or `npx expo start --web` for the web target.

## Architecture

Code lives under `src/`, organized by layer and feature:

```
src/
  app/            expo-router routes (kept thin — screen composition only)
  core/           cross-cutting building blocks, no feature knowledge
    api/          BaseApiClient (axios) + ApiError
    di/           tsyringe tokens + the composition root (register-dependencies.ts)
    domain/       BaseRepository, BaseUseCase
    query/        TanStack Query client/provider
    storage/      MMKV-backed StorageService
  features/       one folder per feature, layered internally:
    <feature>/
      data/         repositories + API services (implement domain interfaces)
      domain/       types, interfaces, use-cases
      application/  hooks that compose use-cases + TanStack Query + Zustand
      presentation/ screens/components
  shared/         hooks/components with no feature ownership (e.g. useDependency)
```

### Dependency injection

Uses [tsyringe](https://github.com/microsoft/tsyringe) with `@injectable()`/`@inject()` decorators. Concrete classes with no swappable interface (e.g. `AuthApiService`, `LoginUseCase`) are injected by class reference; anything crossing an interface boundary (e.g. `IAuthRepository`, `IStorageService`) is injected via a `Symbol` token from `src/core/di/tokens.ts`.

All bindings are registered once in `src/core/di/register-dependencies.ts` — the **composition root**, the one file allowed to import concrete implementations from every feature. It's called from the root layout before the app renders. Resolve dependencies inside components/hooks with `useDependency` (`src/shared/hooks/use-dependency.ts`).

### Base classes

- `BaseApiClient` — one axios instance per subclass, with error normalization into `ApiError`.
- `BaseRepository<TEntity, TId>` — CRUD contract for resource-style features (not every repository needs this — e.g. auth isn't a CRUD resource, so it implements its own narrow interface instead).
- `BaseUseCase<TInput, TOutput>` — one class per business operation, keeping orchestration out of repositories and hooks.

### Libraries

| Concern | Library |
|---|---|
| DI | tsyringe + reflect-metadata |
| HTTP | axios |
| Server/async state | TanStack Query |
| Client/UI state | Zustand |
| Forms + validation | React Hook Form + Zod |
| Local storage | react-native-mmkv |

### Reference implementation

`src/features/auth/` is a full vertical slice demonstrating the pattern end-to-end: `AuthApiService` → `AuthRepository` (implements `IAuthRepository`) → `LoginUseCase` → `useLogin` hook → `LoginScreen`, wired up at the `/login` route.

## Other setup steps

- ESLint is configured (`eslint.config.js`) — run `npx expo lint`.
- If you'd like to set up unit testing, follow the guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/).
- `babel.config.js` and `tsconfig.json` enable legacy decorators + decorator metadata for tsyringe. `metro.config.js` forces `tsyringe` to resolve its CJS build — its ESM build has a `tslib` interop bug under Metro's web bundling.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [tsyringe](https://github.com/microsoft/tsyringe)
