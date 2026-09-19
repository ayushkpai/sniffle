"use client";

import { useState } from "react";
import Avatar, { type Cap, CAPS } from "./components/avatar";

export default function Home() {
  const [cap, setCap] = useState<Cap | undefined>("beanie");

  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-6 py-12">
      <div className="flex w-full gap-6">
        <div className="h-64 w-1/3 rounded-xl border border-black/[.08] dark:border-white/[.145]">
          <Avatar cap={cap} />
        </div>
        <div className="flex h-64 flex-1 flex-col gap-4 rounded-xl border border-black/[.08] p-4 dark:border-white/[.145]">
          <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Cap
          </h2>
          <div className="flex gap-4">
            {CAPS.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setCap(style.id)}
                className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                  cap === style.id
                    ? "border-black dark:border-white"
                    : "border-black/[.08] hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
                }`}
                aria-pressed={cap === style.id}
                aria-label={style.name}
              >
                <Avatar cap={style.id} size="h-20 w-14" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}