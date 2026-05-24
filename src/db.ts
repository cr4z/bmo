type CacheEntry<T> = { data: T; expiresAt: number };

export function get<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(key);
      return;
    }
    return entry.data;
  } catch {
    return;
  }
}

export function set<T>(key: string, val: T, ttl: number): void {
  try {
    localStorage.setItem(key, JSON.stringify({
      data: val,
      expiresAt: Date.now() + ttl,
    }));
  } catch {}
}
