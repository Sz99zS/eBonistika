const KEY = "ebonistika.recentCollections";
const MAX = 16;

function readRaw(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function getRecentCollectionIds(): string[] {
  return readRaw();
}

export function touchRecentCollection(id: string): void {
  if (typeof window === "undefined") return;
  const current = readRaw().filter((x) => x !== id);
  current.unshift(id);
  window.localStorage.setItem(KEY, JSON.stringify(current.slice(0, MAX)));
  window.dispatchEvent(new Event(EVENT));
}

const EVENT = "ebonistika:recent-collections";

export function subscribeRecentCollections(cb: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
