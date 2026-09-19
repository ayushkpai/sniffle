"use client";

import Link from "next/link";
import { useState } from "react";
import Avatar, {
  type Pants,
  type Shirt,
  PANTS,
  SHIRTS,
} from "./components/avatar";
import { LockIcon, PantsIcon, ShirtIcon } from "./components/icons";
import { TOTAL_ITEMS } from "./lib/rewards";
import { useUnlocked } from "./lib/use-unlocked";

type Tab = "shirts" | "pants";

export default function Home() {
  const [shirt, setShirt] = useState<Shirt>("tee");
  const [pants, setPants] = useState<Pants>("jeans");
  const [tab, setTab] = useState<Tab>("shirts");
  const unlocked = useUnlocked();

  const list = tab === "shirts" ? SHIRTS : PANTS;
  const selected: string = tab === "shirts" ? shirt : pants;
  const unlockedIds: string[] = tab === "shirts" ? unlocked.shirts : unlocked.pants;
  const unlockedCount = unlocked.shirts.length + unlocked.pants.length;

  function selectItem(id: string) {
    if (tab === "shirts") setShirt(id as Shirt);
    else setPants(id as Pants);
  }

  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-6 py-12">
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Customize
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {unlockedCount}/{TOTAL_ITEMS} outfits unlocked
          </p>
        </div>
        <Link
          href="/game"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Play to unlock
        </Link>
      </div>

      <div className="flex w-full gap-6">
        <div className="flex h-64 w-1/3 items-center justify-center rounded-xl border border-black/[.08] dark:border-white/[.145]">
          <Avatar shirt={shirt} pants={pants} />
        </div>
        <div className="flex h-64 flex-1 flex-col gap-4 rounded-xl border border-black/[.08] p-4 dark:border-white/[.145]">
          <div className="flex gap-1 rounded-lg bg-black/[.06] p-1 dark:bg-white/[.08]">
            {(["shirts", "pants"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                aria-label={t}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-md px-3 py-2 transition-colors ${
                  tab === t
                    ? "bg-white text-black shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
                }`}
              >
                {t === "shirts" ? <ShirtIcon /> : <PantsIcon />}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {list.map((style) => {
              const isUnlocked = unlockedIds.includes(style.id);
              const isSelected = selected === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => selectItem(style.id)}
                  title={isUnlocked ? style.name : "Locked — play to unlock"}
                  aria-label={
                    isUnlocked ? style.name : `${style.name} (locked)`
                  }
                  aria-pressed={isSelected}
                  className={`relative flex h-24 w-16 items-center justify-center rounded-lg border transition-colors ${
                    !isUnlocked
                      ? "cursor-not-allowed border-black/[.08] opacity-60 dark:border-white/[.145]"
                      : isSelected
                        ? "cursor-pointer border-black dark:border-white"
                        : "cursor-pointer border-black/[.08] hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
                  }`}
                >
                  <Avatar
                    shirt={tab === "shirts" ? (style.id as Shirt) : shirt}
                    pants={tab === "pants" ? (style.id as Pants) : pants}
                    size="h-20 w-14"
                  />
                  {!isUnlocked && (
                    <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900/80 text-[10px] text-white dark:bg-white/80 dark:text-black">
                      <LockIcon />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
