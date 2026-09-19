export type Cap = "beanie" | "flat";

export function CapHead({ cap }: { cap: Cap }) {
  if (cap === "beanie") {
    return (
      <g>
        <path
          d="M 28,50 Q 28,5 100,5 Q 172,5 172,50 Q 172,65 130,65 L 70,65 Q 28,65 28,50 Z"
          fill="#2563eb"
        />
        <path
          d="M 50,65 Q 55,78 100,78 Q 145,78 150,65 L 140,65 Q 135,70 100,70 Q 65,70 60,65 Z"
          fill="#1d4ed8"
        />
        <circle cx="100" cy="20" r="14" fill="#1d4ed8" />
      </g>
    );
  }
  return (
    <g>
      <path
        d="M 22,35 Q 22,-5 100,-5 Q 178,-5 178,35 L 178,40 Q 200,45 205,70 L 40,80 Q 22,70 22,40 Z"
        fill="#ef4444"
      />
      <path
        d="M 34,40 Q 100,55 172,40 L 172,58 Q 100,72 34,58 Z"
        fill="#b91c1c"
      />
      <circle cx="100" cy="5" r="12" fill="#fca5a5" />
    </g>
  );
}

interface FaceProps {
  cap?: Cap;
  size?: string;
}

export default function Face({ cap, size = "h-28 w-28" }: FaceProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className={size}
        role="img"
        aria-label="Avatar face preview"
      >
        <circle cx="100" cy="100" r="90" fill="#fcd9b8" />
        {cap && <CapHead cap={cap} />}
        <ellipse cx="70" cy="85" rx="10" ry="14" fill="#2f1b14" />
        <ellipse cx="130" cy="85" rx="10" ry="14" fill="#2f1b14" />
        <path
          d="M 75,135 Q 100,155 125,135"
          stroke="#2f1b14"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export const CAPS: { id: Cap; name: string }[] = [
  { id: "beanie", name: "Beanie" },
  { id: "flat", name: "Flat cap" },
];