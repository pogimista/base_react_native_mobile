import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { registerDependencies } from '@/core/di/register-dependencies';
import { QueryProvider } from '@/core/query/query-provider';

SplashScreen.preventAutoHideAsync();
registerDependencies();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="login"
            options={{ presentation: 'modal', headerShown: true, title: 'Log in' }}
          />
        </Stack>
      </ThemeProvider>
    </QueryProvider>
  );
}
