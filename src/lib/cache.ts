// Simple in-memory cache with a TTL (Time To Live)

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < DEFAULT_TTL) {
    return entry.data as T;
  }
  // Clear expired entry
  if (entry) {
    cache.delete(key);
  }
  return null;
}

export function setInCache<T>(key: string, data: T) {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
  };
  cache.set(key, entry);
}
