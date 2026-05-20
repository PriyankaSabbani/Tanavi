/**
 * propertyCache.js
 *
 * Two-layer cache: in-memory (survives re-renders) + sessionStorage (survives
 * component unmount / back-navigation). TTL = 60 s — fresh enough for a
 * real-estate site while eliminating the full network round-trip on back-nav.
 */

const TTL = 60_000;

// In-memory layer — fastest, cleared only on full page reload
const mem = {};

export function readCache(key) {
  // 1. memory hit
  if (mem[key] && Date.now() - mem[key].ts < TTL) return mem[key].data;

  // 2. sessionStorage hit
  try {
    const raw = sessionStorage.getItem(`__pc_${key}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.ts < TTL) {
        mem[key] = parsed; // warm memory from storage
        return parsed.data;
      }
    }
  } catch (_) {}

  return null;
}

export function writeCache(key, data) {
  const entry = { data, ts: Date.now() };
  mem[key] = entry;
  try {
    sessionStorage.setItem(`__pc_${key}`, JSON.stringify(entry));
  } catch (_) {
    // quota exceeded — memory-only is fine
  }
}
