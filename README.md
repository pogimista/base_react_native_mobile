# my-app

Expo (SDK 57) React Native boilerplate, set up as a starting point for new feature work.

## Stack

- **Navigation:** [Expo Router](https://docs.expo.dev/versions/v57.0.0/) (file-based, in `app/`)
- **Client state:** [Zustand](https://github.com/pmndrs/zustand)
- **Server / async state:** [TanStack Query](https://tanstack.com/query)
- **Forms & validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) via `@hookform/resolvers`
- **Persistence:** `@react-native-async-storage/async-storage`
- **Lint / format:** ESLint (`eslint-config-expo`) + Prettier
- **Tests:** Jest (`jest-expo` preset)

## Structure

```
app/                      Expo Router routes only (screens, layouts)
  _layout.tsx             Root layout — wraps the app in AppProviders + Stack navigator
  index.tsx               Home screen
  +not-found.tsx          404 fallback route

src/
  providers/              App-wide provider composition (React Query, SafeAreaProvider, ...)
  lib/                    Cross-cutting utilities (query client, storage helpers)
  shared/
    ui/                   Reusable, presentation-only components (Button, TextField, ...)
    theme/                Design tokens (colors, spacing, ...)
  features/
    <feature>/            One folder per feature slice
      api.ts              Data access for the feature
      schema.ts           Zod schemas / types
      hooks/               React Query hooks wrapping the API
      components/         Feature-specific UI
```

`app/` stays thin — screens compose components from `src/features/*` and `src/shared/*`. Each feature is self-contained; to add a new one, copy the shape of `src/features/profile` (React Hook Form + Zod + React Query) or `src/features/counter` (Zustand) rather than reaching into another feature's internals.

Unhandled render errors are caught by `src/shared/components/ErrorBoundary.tsx` (wrapping the whole app in `app/_layout.tsx`) instead of showing a blank screen.

## Scripts

```bash
npm run lint           # ESLint
npm run format         # Prettier — write
npm run format:check   # Prettier — check only, no writes (use in CI)
npm test               # Jest
```

Each feature slice should carry its own tests next to the code it covers — see `src/features/profile/schema.test.ts` and `src/features/counter/store.test.ts` for the pattern (schema validation and store logic; no rendering required for either).

## Native project (`android/`, `ios/`)

Native folders are **not committed** — they're generated locally via [Continuous Native Generation](https://docs.expo.dev/versions/v57.0.0/) and regenerated whenever native config changes:

```bash
npx expo prebuild --clean
```

### Crash reporting

Sentry (`@sentry/react-native`) is wired up but disabled until a DSN is provided — see `src/lib/sentry.ts`. To turn it on:

1. Create a project at [sentry.io](https://sentry.io) (or run `npx @sentry/wizard@latest -i reactNative` for the fully automated setup, including EAS source map uploads).
2. Set `EXPO_PUBLIC_SENTRY_DSN` in `.env` to the project's DSN.
3. For EAS builds, also set `SENTRY_AUTH_TOKEN` (sensitive) in the build environment so source maps upload correctly.

Without a DSN, `initSentry()` and `captureException()` are no-ops (errors still log to the console via the `ErrorBoundary`).

### CI

`.github/workflows/ci.yml` runs format check, lint, typecheck, and tests on every push/PR to `main`.

### EAS build

`eas.json` defines `development` / `preview` / `production` build profiles. To actually build:

1. Run `eas init` once (requires an Expo account) to link the project and add `expo.extra.eas.projectId` to `app.json`.
2. Run builds locally with `eas build --profile preview --platform android`, or trigger `.github/workflows/eas-build.yml` manually from the Actions tab.
3. For the GitHub Actions build to authenticate, add an `EXPO_TOKEN` repo secret (an [Expo access token](https://expo.dev/accounts/%5Baccount%5D/settings/access-tokens)).

Neither of these is set up yet — the workflow and `eas.json` are scaffolded and ready as soon as the project is linked to an Expo account.

### Windows: NDK linker fix

A bug in the Android NDK's CMake toolchain (`android-legacy.toolchain.cmake`) adds a linker flag that breaks native builds on Windows. This is patched automatically in the local Android SDK install (not the repo) — safe to re-run, no-op once patched:

```bash
npm run fix:ndk-windows
```

`scripts/install-android.bat` runs this fix and then builds/installs to a connected device or emulator in one step.

## Getting started

```bash
npm install
npx expo prebuild --clean
npm run android      # or: npm run ios / npm run web
```
