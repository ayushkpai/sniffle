"use client";

import { useState } from "react";
import Avatar, { type Pants, type Shirt, PANTS, SHIRTS } from "./components/avatar";

type Tab = "shirts" | "pants";

export default function Home() {
  const [shirt, setShirt] = useState<Shirt>("tee");
  const [pants, setPants] = useState<Pants>("jeans");
  const [tab, setTab] = useState<Tab>("shirts");

  const options = tab === "shirts" ? SHIRTS : PANTS;
  const selected = tab === "shirts" ? shirt : pants;
  const select =
    tab === "shirts"
      ? (id: Shirt) => setShirt(id)
      : (id: Pants) => setPants(id);

  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-6 py-12">
      <div className="flex w-full gap-6">
        <div className="flex h-64 w-1/3 items-center justify-center rounded-xl border border-black/[.08] dark:border-white/[.145]">
          <Avatar shirt={shirt} pants={pants} />
        </div>
        <div className="flex h-auto min-h-[24rem] flex-1 flex-col gap-4 rounded-xl border border-black/[.08] p-4 dark:border-white/[.145]">
          <div className="flex gap-1 rounded-lg bg-black/[.06] p-1 dark:bg-white/[.08]">
            {(["shirts", "pants"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`flex-1 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  tab === t
                    ? "bg-white text-black shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {options.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => select(style.id as Shirt & Pants)}
                className={`flex h-24 w-16 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                  selected === style.id
                    ? "border-black dark:border-white"
                    : "border-black/[.08] hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
                }`}
                aria-pressed={selected === style.id}
                aria-label={style.name}
              >
                <Avatar
                  shirt={tab === "shirts" ? (style.id as Shirt) : shirt}
                  pants={tab === "pants" ? (style.id as Pants) : pants}
                  size="h-20 w-14"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}