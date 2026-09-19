"use client";

import { useSyncExternalStore } from "react";
import { defaultUnlocked, type Unlocked } from "./rewards";

let state: Unlocked = defaultUnlocked;
let loading = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function setState(next: Unlocked) {
  state = next;
  emit();
}

async function fetchUnlocked() {
  if (loading) return;
  loading = true;
  try {
    const res = await fetch("/api/unlocked", { cache: "no-store" });
    if (res.ok) setState((await res.json()) as Unlocked);
  } catch {
    // keep current state on network failure
  } finally {
    loading = false;
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  void fetchUnlocked();
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Unlocked {
  return state;
}

function getServerSnapshot(): Unlocked {
  return defaultUnlocked;
}

export function useUnlocked(): Unlocked {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export async function submitScore(score: number): Promise<string[]> {
  try {
    const res = await fetch("/api/unlocked", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { earned: string[]; unlocked: Unlocked };
    setState(data.unlocked);
    return data.earned;
  } catch {
    return [];
  }
}
