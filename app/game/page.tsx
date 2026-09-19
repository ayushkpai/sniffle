"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PantsIcon, ShirtIcon } from "../components/icons";
import { applyScore, itemName, TOTAL_ITEMS, UNLOCK_TIERS, type Unlocked } from "../lib/rewards";

const GAME_SECONDS = 30;
const KINDS = ["shirt", "pants"] as const;
type Kind = (typeof KINDS)[number];

interface Target {
  kind: Kind;
  x: number;
  y: number;
  id: number;
}

function randomTarget(id: number): Target {
  return {
    kind: KINDS[Math.floor(Math.random() * KINDS.length)],
    x: 8 + Math.random() * 72,
    y: 12 + Math.random() * 68,
    id,
  };
}

type Phase = "idle" | "playing" | "done";

export default function GamePage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [target, setTarget] = useState<Target>(() => randomTarget(0));
  const [earned, setEarned] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<Unlocked | null>(null);

  const scoreRef = useRef(0);
  const endAtRef = useRef(0);

  useEffect(() => {
    if (phase !== "playing") return;
    endAtRef.current = Date.now() + GAME_SECONDS * 1000;

    const id = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((endAtRef.current - Date.now()) / 1000),
      );
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        const result = applyScore(scoreRef.current);
        setEarned(result.earned);
        setUnlocked(result.unlocked);
        setPhase("done");
      }
    }, 200);

    return () => clearInterval(id);
  }, [phase]);

  function start() {
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setTarget(randomTarget(0));
    setEarned([]);
    setPhase("playing");
  }

  function catchTarget() {
    scoreRef.current += 1;
    setScore((s) => s + 1);
    setTarget(randomTarget(Date.now()));
  }

  const unlockedCount = unlocked
    ? unlocked.shirts.length + unlocked.pants.length
    : 0;

  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-6 py-12">
      <div className="flex w-full items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Sniffle Sprint
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tap the falling fits to earn score and unlock outfits.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
        >
          Customize
        </Link>
      </div>

      <div className="flex w-full items-center justify-between rounded-xl border border-black/[.08] px-4 py-3 dark:border-white/[.145]">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Score{" "}
          <span className="ml-1 text-lg font-semibold text-black dark:text-zinc-50">
            {score}
          </span>
        </span>
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Time{" "}
          <span className="ml-1 text-lg font-semibold text-black dark:text-zinc-50">
            {timeLeft}s
          </span>
        </span>
      </div>

      <div className="relative h-80 w-full overflow-hidden rounded-xl border border-black/[.08] bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900">
        {phase === "playing" && (
          <button
            type="button"
            onClick={catchTarget}
            aria-label={`Catch ${target.kind}`}
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            className="absolute flex h-14 w-14 animate-pulse cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-md transition-transform active:scale-90 dark:bg-zinc-100"
          >
            {target.kind === "shirt" ? (
              <ShirtIcon className="h-7 w-7" />
            ) : (
              <PantsIcon className="h-7 w-7" />
            )}
          </button>
        )}

        {phase === "idle" && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="max-w-xs text-center text-sm text-zinc-600 dark:text-zinc-400">
              You have 30 seconds. Each shirt or pants you tap adds a point —
              hit the score targets to unlock new outfits.
            </p>
            <button
              type="button"
              onClick={start}
              className="cursor-pointer rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Play
            </button>
          </div>
        )}

        {phase === "done" && (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Time! You scored
            </p>
            <p className="text-4xl font-semibold text-black dark:text-zinc-50">
              {score}
            </p>
            {earned.length > 0 ? (
              <p className="max-w-sm text-sm text-zinc-700 dark:text-zinc-300">
                Unlocked:{" "}
                <span className="font-medium text-black dark:text-zinc-50">
                  {earned.join(", ")}
                </span>
                {unlocked && (
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {" "}
                    ({unlockedCount}/{TOTAL_ITEMS} items)
                  </span>
                )}
              </p>
            ) : (
              <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                No new items this round — keep playing to reach the next reward
                target.
              </p>
            )}
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={start}
                className="cursor-pointer rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Play again
              </button>
              <Link
                href="/"
                className="rounded-full border border-black/[.08] px-5 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
              >
                Customize
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="w-full rounded-xl border border-black/[.08] p-4 dark:border-white/[.145]">
        <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Reward targets
        </h2>
        <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-zinc-700 sm:grid-cols-3 dark:text-zinc-300">
          {UNLOCK_TIERS.map((tier) => {
            const kind = tier.shirt ? "shirts" : "pants";
            const id = tier.shirt ?? tier.pants ?? "";
            return (
              <li
                key={`${kind}-${id}`}
                className="flex items-center justify-between"
              >
                <span>{itemName(kind, id)}</span>
                <span className="font-medium text-black dark:text-zinc-50">
                  {tier.score}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
