export type Shirt =
  | "tee"
  | "polo"
  | "hoodie"
  | "sweater"
  | "tank"
  | "denim"
  | "plaid"
  | "jersey"
  | "turtleneck"
  | "vest";

export type Pants =
  | "jeans"
  | "shorts"
  | "cargo"
  | "sweat"
  | "chinos"
  | "joggers"
  | "leggings"
  | "slacks"
  | "parachute"
  | "bootcut";

const SKIN = "#fcd9b8";

function shirtColor(shirt: Shirt): string {
  switch (shirt) {
    case "polo":
      return "#0284c7";
    case "hoodie":
      return "#7c3aed";
    case "sweater":
      return "#dc2626";
    case "tank":
      return "#f97316";
    case "denim":
      return "#4338ca";
    case "plaid":
      return "#9f1239";
    case "jersey":
      return "#0f766e";
    case "turtleneck":
      return "#4b5563";
    case "vest":
      return "#a16207";
    default:
      return "#16a34a";
  }
}

function armColor(shirt: Shirt): string {
  return shirt === "tank" || shirt === "jersey" || shirt === "vest"
    ? SKIN
    : shirtColor(shirt);
}

function ShirtDetails({ shirt }: { shirt: Shirt }) {
  switch (shirt) {
    case "polo":
      return (
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
      );
    case "hoodie":
      return (
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
      );
    case "sweater":
      return (
        <g>
          {[160, 172, 184, 196].map((y) => (
            <path
              key={y}
              d={`M 60,${y} Q 100,${y + 6} 140,${y}`}
              stroke="#f87171"
              strokeWidth="6"
              fill="none"
            />
          ))}
        </g>
      );
    case "tank":
      return (
        <g>
          <path
            d="M 76,140 Q 74,150 78,158 L 86,158 Q 82,148 84,140 Z"
            fill="#fb923c"
          />
          <path
            d="M 124,140 Q 126,150 122,158 L 114,158 Q 118,148 116,140 Z"
            fill="#fb923c"
          />
        </g>
      );
    case "denim":
      return (
        <g>
          <path d="M 100,140 L 100,214" stroke="#3730a3" strokeWidth="3" />
          <path
            d="M 84,146 L 96,146 L 96,158 L 84,158 Z"
            fill="#3730a3"
          />
          <path
            d="M 104,146 L 116,146 L 116,158 L 104,158 Z"
            fill="#3730a3"
          />
          <path
            d="M 84,140 L 100,154 L 116,140"
            stroke="#312e81"
            strokeWidth="4"
            fill="none"
          />
        </g>
      );
    case "plaid":
      return (
        <g stroke="#fca5a5" strokeWidth="4" opacity="0.9">
          {[160, 180, 200].map((y) => (
            <path key={`h${y}`} d={`M 60,${y} L 140,${y}`} />
          ))}
          {[78, 100, 122].map((x) => (
            <path key={`v${x}`} d={`M ${x},140 L ${x},216`} />
          ))}
        </g>
      );
    case "jersey":
      return (
        <g>
          <path
            d="M 60,172 L 140,172 L 140,188 L 60,188 Z"
            fill="#115e59"
          />
          <path
            d="M 92,140 Q 100,158 108,140"
            stroke="#0d9488"
            strokeWidth="4"
            fill="none"
          />
        </g>
      );
    case "turtleneck":
      return (
        <g>
          <path
            d="M 86,126 Q 100,120 114,126 L 114,144 L 86,144 Z"
            fill="#4b5563"
          />
          <path
            d="M 86,134 Q 100,128 114,134"
            stroke="#6b7280"
            strokeWidth="3"
            fill="none"
          />
        </g>
      );
    case "vest":
      return (
        <g>
          <path d="M 84,140 L 100,170 L 116,140 Z" fill="#16a34a" />
          <path d="M 100,140 L 100,214" stroke="#854d0e" strokeWidth="2" />
          <circle cx="100" cy="178" r="3" fill="#713f12" />
          <circle cx="100" cy="196" r="3" fill="#713f12" />
        </g>
      );
    default:
      return null;
  }
}

export function ShirtBody({ shirt }: { shirt: Shirt }) {
  return (
    <>
      <g id="arms" stroke={armColor(shirt)}>
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
          fill={shirtColor(shirt)}
        />
        <ShirtDetails shirt={shirt} />
      </g>
    </>
  );
}

function pantsColor(pants: Pants): string {
  switch (pants) {
    case "cargo":
      return "#78716c";
    case "sweat":
      return "#475569";
    case "chinos":
      return "#ca8a04";
    case "joggers":
      return "#7c3aed";
    case "leggings":
      return "#111827";
    case "slacks":
      return "#1f2937";
    case "parachute":
      return "#365314";
    case "bootcut":
      return "#0ea5e9";
    case "shorts":
      return "#f59e0b";
    default:
      return "#3b82f6";
  }
}

export function PantsBody({ pants }: { pants: Pants }) {
  const color = pantsColor(pants);

  if (pants === "shorts") {
    return (
      <g id="legs">
        <rect x="74" y="215" width="20" height="26" rx="6" fill={color} />
        <rect x="106" y="215" width="20" height="26" rx="6" fill={color} />
        <rect x="74" y="241" width="20" height="30" rx="8" fill={SKIN} />
        <rect x="106" y="241" width="20" height="30" rx="8" fill={SKIN} />
        <PantsShoes color={color} />
      </g>
    );
  }

  if (pants === "leggings") {
    return (
      <g id="legs">
        <rect x="76" y="215" width="16" height="55" rx="7" fill={color} />
        <rect x="108" y="215" width="16" height="55" rx="7" fill={color} />
        <PantsShoes color={color} />
      </g>
    );
  }

  if (pants === "parachute") {
    return (
      <g id="legs">
        <rect x="66" y="215" width="26" height="55" rx="8" fill={color} />
        <rect x="108" y="215" width="26" height="55" rx="8" fill={color} />
        <g fill="#1a2e05">
          <rect x="66" y="262" width="26" height="8" rx="4" />
          <rect x="108" y="262" width="26" height="8" rx="4" />
        </g>
        <PantsShoes color={color} />
      </g>
    );
  }

  if (pants === "bootcut") {
    return (
      <g id="legs">
        <path d="M 74,215 L 94,215 L 98,270 L 66,270 Z" fill={color} />
        <path d="M 106,215 L 126,215 L 134,270 L 102,270 Z" fill={color} />
        <PantsShoes color={color} />
      </g>
    );
  }

  return (
    <g id="legs">
      <rect x="74" y="215" width="20" height="55" rx="8" fill={color} />
      <rect x="106" y="215" width="20" height="55" rx="8" fill={color} />
      {pants === "cargo" && (
        <g fill="#57534e">
          <rect x="62" y="224" width="12" height="14" rx="3" />
          <rect x="126" y="224" width="12" height="14" rx="3" />
        </g>
      )}
      {pants === "sweat" && (
        <g fill="#334155">
          <rect x="76" y="260" width="16" height="10" rx="4" />
          <rect x="108" y="260" width="16" height="10" rx="4" />
        </g>
      )}
      {pants === "joggers" && (
        <g fill="#5b21b6">
          <rect x="76" y="260" width="16" height="10" rx="4" />
          <rect x="108" y="260" width="16" height="10" rx="4" />
        </g>
      )}
      {pants === "chinos" && (
        <g fill="#a16207">
          <rect x="74" y="215" width="20" height="6" rx="3" />
          <rect x="106" y="215" width="20" height="6" rx="3" />
        </g>
      )}
      {pants === "slacks" && (
        <g stroke="#4b5563" strokeWidth="2">
          <path d="M 84,224 L 84,266" />
          <path d="M 116,224 L 116,266" />
        </g>
      )}
      <PantsShoes color={color} />
    </g>
  );
}

function PantsShoes({ color }: { color: string }) {
  return (
    <>
      <ellipse cx="84" cy="275" rx="16" ry="8" fill={color} />
      <ellipse cx="116" cy="275" rx="16" ry="8" fill={color} />
    </>
  );
}

interface AvatarProps {
  shirt?: Shirt;
  pants?: Pants;
  size?: string;
}

export default function Avatar({
  shirt = "tee",
  pants = "jeans",
  size = "h-40 w-32",
}: AvatarProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 200 280"
        className={size}
        role="img"
        aria-label="Avatar preview"
      >
        <PantsBody pants={pants} />
        {shirt && <ShirtBody shirt={shirt} />}
        <g id="head">
          <circle cx="100" cy="70" r="55" fill={SKIN} />
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
  { id: "tank", name: "Tank top" },
  { id: "denim", name: "Denim jacket" },
  { id: "plaid", name: "Plaid shirt" },
  { id: "jersey", name: "Jersey" },
  { id: "turtleneck", name: "Turtleneck" },
  { id: "vest", name: "Vest" },
];

export const PANTS: { id: Pants; name: string }[] = [
  { id: "jeans", name: "Jeans" },
  { id: "shorts", name: "Shorts" },
  { id: "cargo", name: "Cargo" },
  { id: "sweat", name: "Sweatpants" },
  { id: "chinos", name: "Chinos" },
  { id: "joggers", name: "Joggers" },
  { id: "leggings", name: "Leggings" },
  { id: "slacks", name: "Slacks" },
  { id: "parachute", name: "Parachute pants" },
  { id: "bootcut", name: "Bootcut" },
];
