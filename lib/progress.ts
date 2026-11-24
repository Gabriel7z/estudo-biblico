const KEY = "terra-e-livro:estacoes";
const EVENT = "terra-leitura";

export function subscribeReadStations(onStoreChange: () => void): () => void {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function readStationsSnapshot(): string {
  return window.localStorage.getItem(KEY) ?? "[]";
}

export function readStationsServerSnapshot(): string {
  return "[]";
}

function parse(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function readStations(): string[] {
  if (typeof window === "undefined") return [];
  return parse(window.localStorage.getItem(KEY));
}

export function writeStation(slug: string, read: boolean): string[] {
  const current = new Set(readStations());
  if (read) current.add(slug);
  else current.delete(slug);
  const next = [...current];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
  return next;
}
