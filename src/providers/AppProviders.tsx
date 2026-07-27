import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '../lib/query-client';
import { persistOptions } from '../lib/query-persister';
import { ThemeProvider } from '../shared/theme/ThemeContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
          {children}
        </PersistQueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
