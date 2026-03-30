// Reusable brand logo — WhatsApp bubble with embedded form lines

interface LogoProps {
  size?: number        // icon size in px
  textSize?: string   // tailwind text class
  dark?: boolean      // white text on dark backgrounds
}

export default function Logo({ size = 36, textSize = 'text-xl', dark = false }: LogoProps) {
  return (
    <a href="/" className="flex items-center gap-2.5 group select-none">
      {/* Icon: WhatsApp bubble + form lines combined */}
      <div
        className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Green rounded background */}
          <rect width="40" height="40" rx="10" fill="#22c55e" />

          {/* WhatsApp-style speech bubble */}
          <path
            d="M20 8C13.373 8 8 13.149 8 19.5c0 2.07.574 4.01 1.574 5.672L8 32l7.09-1.55A12.07 12.07 0 0020 31c6.627 0 12-5.149 12-11.5S26.627 8 20 8z"
            fill="white"
            fillOpacity="0.18"
          />
          <path
            d="M20 9.5C13.925 9.5 9 14.201 9 19.98c0 1.96.55 3.8 1.51 5.37L9.2 30.8l5.6-1.46A11.18 11.18 0 0020 30.46c6.075 0 11-4.7 11-10.48C31 14.2 26.075 9.5 20 9.5z"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* Form lines inside the bubble */}
          {/* Title line */}
          <rect x="14" y="16" width="12" height="2" rx="1" fill="white" />
          {/* Body line 1 */}
          <rect x="14" y="20" width="9" height="1.5" rx="0.75" fill="white" fillOpacity="0.8" />
          {/* Body line 2 */}
          <rect x="14" y="23" width="6" height="1.5" rx="0.75" fill="white" fillOpacity="0.6" />

          {/* Tiny checkmark / send dot in bottom-right of bubble */}
          <circle cx="27" cy="27" r="5" fill="#16a34a" />
          <path
            d="M24.5 27l1.8 1.8 3-3"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand name */}
      <span className={`font-extrabold tracking-tight leading-none ${textSize} ${dark ? 'text-white' : 'text-charcoal-900'}`}>
        Zack<span className="text-brand-500"> Forms</span>
      </span>
    </a>
  )
}
