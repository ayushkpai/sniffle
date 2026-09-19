export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-black/[.08] bg-white/80 backdrop-blur dark:border-white/[.145] dark:bg-black/60">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center px-6">
        <span className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50">
          sniffle
        </span>
      </nav>
    </header>
  );
}