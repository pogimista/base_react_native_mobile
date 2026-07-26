import * as Sentry from '@sentry/react-native';

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

export function initSentry() {
  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    sendDefaultPii: false,
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    enableAutoSessionTracking: true,
  });
}

export function captureException(error: unknown) {
  if (!dsn) {
    if (__DEV__) {
      console.error('[sentry] captureException (no DSN configured):', error);
    }
    return;
  }

  Sentry.captureException(error);
}
