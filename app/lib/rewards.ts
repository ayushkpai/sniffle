import type { Pants, Shirt } from "../components/avatar";
import { PANTS, SHIRTS } from "../components/avatar";

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

export function itemName(kind: "shirts" | "pants", id: string): string {
  const list = kind === "shirts" ? SHIRTS : PANTS;
  return list.find((item) => item.id === id)?.name ?? id;
}

function cloneUnlocked(unlocked: Unlocked): Unlocked {
  return { shirts: [...unlocked.shirts], pants: [...unlocked.pants] };
}

export function mergeScore(
  current: Unlocked,
  score: number,
): { unlocked: Unlocked; earned: string[] } {
  const unlocked = cloneUnlocked(current);
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

  return { unlocked, earned };
}
