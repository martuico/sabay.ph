export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sabay.ph logo"
    >
      {/* Steering wheel */}
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="20" r="5" fill="currentColor" />

      {/* Steering wheel spokes */}
      <line x1="20" y1="9" x2="20" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="25" x2="20" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="25" y1="20" x2="31" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Route curve overlay */}
      <path
        d="M 8 32 Q 15 28, 20 20 T 32 8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
