import { getItem, setItem } from '../../lib/storage';
import type { ProfileFormValues } from './schema';

const PROFILE_KEY = 'profile';

export async function fetchProfile(): Promise<ProfileFormValues | null> {
  return getItem<ProfileFormValues>(PROFILE_KEY);
}

export async function saveProfile(values: ProfileFormValues): Promise<ProfileFormValues> {
  await setItem(PROFILE_KEY, values);
  return values;
}
