let db: IDBDatabase;

async function open() {
  if (db) return db;
  db = await new Promise<IDBDatabase>((res, rej) => {
    const r = indexedDB.open("BmoCache", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("kv");
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return db;
}

export async function get<T = unknown>(key: string): Promise<T | undefined> {
  const d = await open();
  return new Promise((res, rej) => {
    const r = d.transaction("kv", "readonly").objectStore("kv").get(key);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

export async function set(key: string, val: unknown): Promise<void> {
  const d = await open();
  return new Promise((res, rej) => {
    const r = d.transaction("kv", "readwrite").objectStore("kv").put(val, key);
    r.onsuccess = () => res();
    r.onerror = () => rej(r.error);
  });
}
