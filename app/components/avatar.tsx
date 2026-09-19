export type Shirt = "tee" | "polo" | "hoodie" | "sweater";

function shirtColor(shirt: Shirt): string {
  switch (shirt) {
    case "polo":
      return "#0284c7";
    case "hoodie":
      return "#7c3aed";
    case "sweater":
      return "#dc2626";
    default:
      return "#16a34a";
  }
}

export function ShirtBody({ shirt }: { shirt: Shirt }) {
  const color = shirtColor(shirt);
  return (
    <>
      <g id="arms" stroke={color}>
        <path
          d="M 68,150 Q 50,170 52,200"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 132,150 Q 150,170 148,200"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <g id="torso">
        <path
          d="M 76,140 Q 58,152 60,180 Q 61,216 100,216 Q 139,216 140,180 Q 142,152 124,140 Z"
          fill={color}
        />
        {shirt === "polo" && (
          <g>
            <path
              d="M 86,140 L 100,156 L 114,140 Q 100,132 86,140 Z"
              fill="#f8fafc"
            />
            <path
              d="M 86,140 L 100,156 L 114,140"
              stroke="#0c4a6e"
              strokeWidth="3"
              fill="none"
            />
          </g>
        )}
        {shirt === "hoodie" && (
          <g>
            <path
              d="M 72,140 Q 60,140 100,140 Q 140,140 128,140"
              stroke="#6d28d9"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 58,158 L 64,178 M 142,158 L 136,178"
              stroke="#a78bfa"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 82,176 Q 100,186 118,176 L 118,206 Q 100,214 82,206 Z"
              fill="#6d28d9"
            />
          </g>
        )}
        {shirt === "sweater" &&
          [160, 172, 184, 196].map((y) => (
            <path
              key={y}
              d={`M 60,${y} Q 100,${y + 6} 140,${y}`}
              stroke="#f87171"
              strokeWidth="6"
              fill="none"
            />
          ))}
      </g>
    </>
  );
}

interface AvatarProps {
  shirt?: Shirt;
  size?: string;
}

export default function Avatar({ shirt = "tee", size = "h-40 w-32" }: AvatarProps) {
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
        {shirt && <ShirtBody shirt={shirt} />}
        <g id="head">
          <circle cx="100" cy="70" r="55" fill="#fcd9b8" />
        </g>
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

export const SHIRTS: { id: Shirt; name: string }[] = [
  { id: "tee", name: "T-shirt" },
  { id: "polo", name: "Polo" },
  { id: "hoodie", name: "Hoodie" },
  { id: "sweater", name: "Sweater" },
];