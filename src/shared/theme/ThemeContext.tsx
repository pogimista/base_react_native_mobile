import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { Colors, darkColors, lightColors } from './colors';
import { getStoredThemeMode, setStoredThemeMode } from './storage';

type ThemeMode = 'light' | 'dark';

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

type ThemeContextValue = {
  mode: ThemeMode;
  colors: Colors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemScheme === 'dark' ? 'dark' : 'light');

  // useEffect runs code AFTER the component renders (not during render itself).
  // The empty array `[]` at the end means "only run this once, right after the
  // very first render" — similar to `componentDidMount` in class components.
  useEffect(() => {
    // Reading from AsyncStorage is asynchronous (it takes time), so we can't
    // just use the result directly — we have to wait for the promise to
    // resolve with `.then(...)`.
    getStoredThemeMode().then((stored) => {
      // `stored` might be null (nothing saved yet) or some unexpected string,
      // so we check it's actually 'light' or 'dark' before trusting it.
      if (isThemeMode(stored)) {
        // Found a saved preference — update state with it. This overrides
        // the system-scheme default we started with in useState above, and
        // triggers a re-render so the UI reflects the saved theme.
        setMode(stored);
      }
      // If nothing was saved (first-ever launch), we do nothing here and just
      // keep whatever the system color scheme gave us as the default.
    });
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const toggleTheme = () => {
      setMode((current) => {
        const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
        setStoredThemeMode(next);
        return next;
      });
    };

    return {
      mode,
      colors: mode === 'dark' ? darkColors : lightColors,
      toggleTheme,
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
