export default function Face() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="h-28 w-28"
        role="img"
        aria-label="Avatar face"
      >
        <circle cx="100" cy="100" r="90" fill="#fcd9b8" />
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