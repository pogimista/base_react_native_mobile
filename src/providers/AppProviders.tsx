import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '../lib/query-client';
import { persistOptions } from '../lib/query-persister';
import { AuthProvider } from '../shared/auth/AuthContext';
import { ThemeProvider } from '../shared/theme/ThemeContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
            {children}
          </PersistQueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
