export type Cap = "beanie" | "flat";

export function CapHead({ cap }: { cap: Cap }) {
  if (cap === "beanie") {
    return (
      <g>
        <path
          d="M 45,58 Q 45,10 100,10 Q 155,10 155,58 Q 155,68 128,68 L 72,68 Q 45,68 45,58 Z"
          fill="#2563eb"
        />
        <path
          d="M 66,68 Q 70,76 100,76 Q 130,76 134,68 L 128,68 Q 125,72 100,72 Q 75,72 72,68 Z"
          fill="#1d4ed8"
        />
        <circle cx="100" cy="22" r="12" fill="#1d4ed8" />
      </g>
    );
  }
  return (
    <g>
      <path
        d="M 38,52 Q 38,12 100,12 Q 162,12 162,52 L 162,56 Q 182,58 186,74 L 35,80 Q 38,66 38,52 Z"
        fill="#ef4444"
      />
      <path
        d="M 46,54 Q 100,62 154,54 L 154,66 Q 100,76 46,66 Z"
        fill="#b91c1c"
      />
      <circle cx="100" cy="18" r="10" fill="#fca5a5" />
    </g>
  );
}

interface AvatarProps {
  cap?: Cap;
  size?: string;
}

export default function Avatar({ cap, size = "h-40 w-32" }: AvatarProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 200 280"
        className={size}
        role="img"
        aria-label="Avatar preview"
      >
        <g id="legs">
          <rect x="74" y="215" width="20" height="55" rx="8" fill="#52525b" />
          <rect x="106" y="215" width="20" height="55" rx="8" fill="#52525b" />
          <ellipse cx="84" cy="275" rx="16" ry="8" fill="#f59e0b" />
          <ellipse cx="116" cy="275" rx="16" ry="8" fill="#f59e0b" />
        </g>
        <g id="arms">
          <path
            d="M 68,150 Q 50,170 52,200"
            stroke="#44403c"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 132,150 Q 150,170 148,200"
            stroke="#44403c"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <g id="torso">
          <path
            d="M 76,140 Q 58,152 60,180 Q 61,216 100,216 Q 139,216 140,180 Q 142,152 124,140 Z"
            fill="#3f3f46"
          />
        </g>
        <g id="head">
          <circle cx="100" cy="70" r="55" fill="#fcd9b8" />
        </g>
        {cap && <CapHead cap={cap} />}
        <g id="face">
          <ellipse cx="76" cy="58" rx="9" ry="12" fill="#2f1b14" />
          <ellipse cx="124" cy="58" rx="9" ry="12" fill="#2f1b14" />
          <path
            d="M 82,86 Q 100,96 118,86"
            stroke="#2f1b14"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

export const CAPS: { id: Cap; name: string }[] = [
  { id: "beanie", name: "Beanie" },
  { id: "flat", name: "Flat cap" },
];