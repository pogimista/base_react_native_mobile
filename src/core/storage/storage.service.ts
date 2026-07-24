import { createMMKV } from 'react-native-mmkv';
import { injectable } from 'tsyringe';

export interface IStorageService {
  getString(key: string): string | undefined;
  setString(key: string, value: string): void;
  getObject<T>(key: string): T | undefined;
  setObject<T>(key: string, value: T): void;
  delete(key: string): void;
}

@injectable()
export class StorageService implements IStorageService {
  private readonly storage = createMMKV({ id: 'app-storage' });

  getString(key: string) {
    return this.storage.getString(key);
  }

  setString(key: string, value: string) {
    this.storage.set(key, value);
  }

  getObject<T>(key: string): T | undefined {
    const raw = this.storage.getString(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  }

  setObject<T>(key: string, value: T) {
    this.storage.set(key, JSON.stringify(value));
  }

  delete(key: string) {
    this.storage.remove(key);
  }
}
