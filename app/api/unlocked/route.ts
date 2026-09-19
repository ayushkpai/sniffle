import { defaultUnlocked, mergeScore, type Unlocked } from "../../lib/rewards";

export const dynamic = "force-dynamic";

let store: Unlocked = defaultUnlocked;

export async function GET() {
  return Response.json(store);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    score?: unknown;
  } | null;
  const score = typeof body?.score === "number" && body.score > 0 ? body.score : 0;

  const result = mergeScore(store, score);
  store = result.unlocked;

  return Response.json({ earned: result.earned, unlocked: store });
}
