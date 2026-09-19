import Face from "./components/face";

export default function Home() {
  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-6 py-12">
      <div className="flex w-full gap-6">
        <div className="h-64 w-1/3 rounded-xl border border-black/[.08] dark:border-white/[.145]">
          <Face />
        </div>
        <div className="h-64 flex-1 rounded-xl border border-black/[.08] dark:border-white/[.145]" />
      </div>
    </main>
  );
}
