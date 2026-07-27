import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_MODE_KEY = 'theme:mode';

export async function getStoredThemeMode(): Promise<string | null> {
  return AsyncStorage.getItem(THEME_MODE_KEY);
}

export async function setStoredThemeMode(mode: string): Promise<void> {
  await AsyncStorage.setItem(THEME_MODE_KEY, mode);
}
