import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-black/[.08] bg-white/80 backdrop-blur dark:border-white/[.145] dark:bg-black/60">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50"
        >
          sniffle
        </Link>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-black dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-zinc-50"
          >
            Customize
          </Link>
          <Link
            href="/game"
            className="rounded-full px-3 py-1.5 text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-black dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-zinc-50"
          >
            Game
          </Link>
        </div>
      </nav>
    </header>
  );
}
