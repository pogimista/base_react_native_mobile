import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ErrorBoundary } from '../src/shared/components/ErrorBoundary';
import { AppProviders } from '../src/providers/AppProviders';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerTitleAlign: 'center' }} />
      </AppProviders>
    </ErrorBoundary>
  );
}
