export function ShirtIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 4 L4 7 L6 10 L8 9 L9 14 L15 14 L16 9 L18 10 L20 7 L15 4 L12 6 Z" />
      <path d="M9 14 V20 M15 14 V20" />
    </svg>
  );
}

export function PantsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4 H19 L18 9 V20 H14.5 V12 H9.5 V20 H6 V9 Z" />
    </svg>
  );
}

export function LockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="9" width="10" height="7" rx="1.5" />
      <path d="M 7 9 V 6 A 3 3 0 0 1 13 6 V 9" />
    </svg>
  );
}
