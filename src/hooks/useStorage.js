// src/hooks/useStorage.js
// Simple localStorage hook with JSON serialization

export function getItem(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export function setItem(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function removeItem(key) {
  try { localStorage.removeItem(key); } catch {}
}

export function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
