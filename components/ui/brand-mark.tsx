import { cn } from "../../lib/utils";

export interface BrandMarkProps {
  className?: string;
  /** Show wordmark "Business" next to the mark */
  withWordmark?: boolean;
}

/** Iridescent flask mark + "Business" wordmark for the console chrome. */
export function BrandMark({ className, withWordmark = true }: BrandMarkProps) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label="Business"
    >
      <svg
        viewBox="0 0 64 80"
        className="h-6 w-[19px] shrink-0"
        aria-hidden
        fill="none"
      >
        <defs>
          <linearGradient
            id="bm-liquid"
            x1="6"
            y1="44"
            x2="58"
            y2="74"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#00E0FF" />
            <stop offset="22%" stopColor="#1A6BFF" />
            <stop offset="48%" stopColor="#B026FF" />
            <stop offset="72%" stopColor="#FF2D9A" />
            <stop offset="100%" stopColor="#FF6B14" />
          </linearGradient>
          <linearGradient
            id="bm-glassStroke"
            x1="10"
            y1="16"
            x2="54"
            y2="74"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="30%" stopColor="#A78BFA" />
            <stop offset="60%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient
            id="bm-glassFill"
            x1="32"
            y1="12"
            x2="32"
            y2="74"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="40%" stopColor="#C4B5FD" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient
            id="bm-rim"
            x1="22"
            y1="15"
            x2="42"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="45%" stopColor="#E879F9" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <radialGradient id="bm-bubbleLarge" cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#FFE56A" />
            <stop offset="30%" stopColor="#FF6B3D" />
            <stop offset="65%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </radialGradient>
          <radialGradient id="bm-bubbleSmall" cx="38%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#1E40AF" />
          </radialGradient>
          <filter
            id="bm-softGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="1.15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="bm-flaskClip">
            <path d="M25 22.5h14v7.4c0 1.15.28 2.28.84 3.3L53.2 59.2c1.9 3.5-.7 7.8-4.6 7.8H15.4c-3.9 0-6.5-4.3-4.6-7.8L24.16 33.2c.56-1.02.84-2.15.84-3.3V22.5z" />
          </clipPath>
        </defs>

        <path
          d="M25 22.5h14v7.4c0 1.15.28 2.28.84 3.3L53.2 59.2c1.9 3.5-.7 7.8-4.6 7.8H15.4c-3.9 0-6.5-4.3-4.6-7.8L24.16 33.2c.56-1.02.84-2.15.84-3.3V22.5z"
          fill="url(#bm-glassStroke)"
          opacity="0.22"
          filter="url(#bm-softGlow)"
        />
        <path
          d="M25 22.5h14v7.4c0 1.15.28 2.28.84 3.3L53.2 59.2c1.9 3.5-.7 7.8-4.6 7.8H15.4c-3.9 0-6.5-4.3-4.6-7.8L24.16 33.2c.56-1.02.84-2.15.84-3.3V22.5z"
          fill="url(#bm-glassFill)"
          stroke="url(#bm-glassStroke)"
          strokeWidth="2.25"
          strokeLinejoin="round"
        />
        <g clipPath="url(#bm-flaskClip)">
          <path
            d="M8 48c5-3.2 10.2-1.4 15.2.2 4.6 1.5 9 2.6 13.6 1.1 4-1.3 7.6-4 12-3.5 2.8.3 5.4 1.8 7.8 3.5V74H8V48z"
            fill="url(#bm-liquid)"
          />
          <path
            d="M8 48c5-3.2 10.2-1.4 15.2.2 4.6 1.5 9 2.6 13.6 1.1 4-1.3 7.6-4 12-3.5 2.8.3 5.4 1.8 7.8 3.5"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.4"
            strokeWidth="1.15"
          />
          <ellipse
            cx="21"
            cy="59"
            rx="7.5"
            ry="11"
            fill="#FFFFFF"
            opacity="0.16"
          />
          <ellipse
            cx="42"
            cy="62"
            rx="5"
            ry="7"
            fill="#FF9A4A"
            opacity="0.18"
          />
        </g>
        <rect
          x="23"
          y="16"
          width="18"
          height="7.2"
          rx="3.1"
          fill="url(#bm-rim)"
          opacity="0.95"
        />
        <rect
          x="24.2"
          y="17.15"
          width="15.6"
          height="4.8"
          rx="2.3"
          fill="#050508"
          opacity="0.4"
        />
        <path
          d="M25.2 18.2h13.6"
          stroke="#FFFFFF"
          strokeOpacity="0.8"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M26.6 24v7.2"
          stroke="#FFFFFF"
          strokeOpacity="0.6"
          strokeWidth="1.55"
          strokeLinecap="round"
        />
        <path
          d="M37.2 24.2v6.4"
          stroke="#FFFFFF"
          strokeOpacity="0.28"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        <path
          d="M23.4 32.2c1.7 3 3.5 6 5.8 10.2"
          stroke="#FFFFFF"
          strokeOpacity="0.75"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M41 32.6c2 3.4 4.5 7.6 7 12"
          stroke="#FFB4A2"
          strokeOpacity="0.5"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <g filter="url(#bm-softGlow)">
          <circle cx="32" cy="7.6" r="4.55" fill="url(#bm-bubbleLarge)" />
          <circle
            cx="30.25"
            cy="6.15"
            r="1.4"
            fill="#FFFFFF"
            opacity="0.88"
          />
          <circle cx="32" cy="13.6" r="2.2" fill="url(#bm-bubbleSmall)" />
          <circle
            cx="31.15"
            cy="12.75"
            r="0.7"
            fill="#FFFFFF"
            opacity="0.82"
          />
        </g>
      </svg>
      {withWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-foreground">
          Business
        </span>
      )}
    </div>
  );
}
