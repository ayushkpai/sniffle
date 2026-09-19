import type { Pants, Shirt } from "../components/avatar";
import { PANTS, SHIRTS } from "../components/avatar";

const STORAGE_KEY = "sniffle-unlocked";

export const UNLOCK_EVENT = "sniffle-unlocked";

export interface Unlocked {
  shirts: Shirt[];
  pants: Pants[];
}

export const BASE_SHIRT: Shirt = "tee";
export const BASE_PANTS: Pants = "jeans";

export const defaultUnlocked: Unlocked = {
  shirts: [BASE_SHIRT],
  pants: [BASE_PANTS],
};

export interface UnlockTier {
  score: number;
  shirt?: Shirt;
  pants?: Pants;
}

const REWARD_SHIRTS: Shirt[] = [
  "polo",
  "tank",
  "denim",
  "plaid",
  "jersey",
  "turtleneck",
  "vest",
  "hoodie",
  "sweater",
];

const REWARD_PANTS: Pants[] = [
  "shorts",
  "chinos",
  "cargo",
  "joggers",
  "leggings",
  "slacks",
  "sweat",
  "parachute",
  "bootcut",
];

export const UNLOCK_TIERS: UnlockTier[] = REWARD_SHIRTS.flatMap(
  (shirt, i) => [
    { score: 2 + i * 4, shirt },
    { score: 4 + i * 4, pants: REWARD_PANTS[i] },
  ],
);

export const TOTAL_ITEMS = SHIRTS.length + PANTS.length;

function cloneDefaults(): Unlocked {
  return { shirts: [...defaultUnlocked.shirts], pants: [...defaultUnlocked.pants] };
}

export function loadUnlocked(): Unlocked {
  if (typeof window === "undefined") return cloneDefaults();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefaults();
    const parsed = JSON.parse(raw) as Partial<Unlocked>;
    return {
      shirts: parsed.shirts?.length ? parsed.shirts : [...defaultUnlocked.shirts],
      pants: parsed.pants?.length ? parsed.pants : [...defaultUnlocked.pants],
    };
  } catch {
    return cloneDefaults();
  }
}

export function getUnlockedRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveUnlocked(unlocked: Unlocked) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
    window.dispatchEvent(new Event(UNLOCK_EVENT));
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
}

export function itemName(kind: "shirts" | "pants", id: string): string {
  const list = kind === "shirts" ? SHIRTS : PANTS;
  return list.find((item) => item.id === id)?.name ?? id;
}

export function applyScore(score: number): { earned: string[]; unlocked: Unlocked } {
  const unlocked = loadUnlocked();
  const earned: string[] = [];

  for (const tier of UNLOCK_TIERS) {
    if (score < tier.score) continue;
    if (tier.shirt && !unlocked.shirts.includes(tier.shirt)) {
      unlocked.shirts.push(tier.shirt);
      earned.push(itemName("shirts", tier.shirt));
    }
    if (tier.pants && !unlocked.pants.includes(tier.pants)) {
      unlocked.pants.push(tier.pants);
      earned.push(itemName("pants", tier.pants));
    }
  }

  saveUnlocked(unlocked);
  return { earned, unlocked };
}
