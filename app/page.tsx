"use client";

import { useState } from "react";
import Avatar, { type Shirt, SHIRTS } from "./components/avatar";

export default function Home() {
  const [shirt, setShirt] = useState<Shirt>("tee");

  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-6 py-12">
      <div className="flex w-full gap-6">
        <div className="flex h-64 w-1/3 items-center justify-center rounded-xl border border-black/[.08] dark:border-white/[.145]">
          <Avatar shirt={shirt} />
        </div>
        <div className="flex h-64 flex-1 flex-col gap-4 rounded-xl border border-black/[.08] p-4 dark:border-white/[.145]">
          <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Shirt
          </h2>
          <div className="flex gap-4">
            {SHIRTS.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setShirt(style.id)}
                className={`flex h-24 w-16 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                  shirt === style.id
                    ? "border-black dark:border-white"
                    : "border-black/[.08] hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
                }`}
                aria-pressed={shirt === style.id}
                aria-label={style.name}
              >
                <Avatar shirt={style.id} size="h-20 w-14" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}