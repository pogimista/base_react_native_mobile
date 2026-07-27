import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'pokemon:favorites';

export async function getFavoritePokemon(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function setFavoritePokemon(urls: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(urls));
}
