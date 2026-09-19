"use client";

import { useSyncExternalStore } from "react";
import {
  defaultUnlocked,
  getUnlockedRaw,
  loadUnlocked,
  UNLOCK_EVENT,
  type Unlocked,
} from "./rewards";

let cachedRaw: string | null = null;
let cached: Unlocked = defaultUnlocked;

function getSnapshot(): Unlocked {
  const raw = getUnlockedRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = loadUnlocked();
  }
  return cached;
}

function getServerSnapshot(): Unlocked {
  return defaultUnlocked;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(UNLOCK_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UNLOCK_EVENT, callback);
  };
}

export function useUnlocked(): Unlocked {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
