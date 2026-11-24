import React from 'react';

interface SharkLogoProps {
  className?: string;
  size?: number | string;
}

export const SharkLogo: React.FC<SharkLogoProps> = ({ className = 'w-6 h-6', size }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Electric MrBeast Cyan / Blue Gradient */}
        <linearGradient id="mrBeastCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5FF" />
          <stop offset="45%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#005B99" />
        </linearGradient>

        <linearGradient id="mrBeastCyanBright" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Hot Pink / Magenta Lightning Bolt */}
        <linearGradient id="mrBeastPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2A85" />
          <stop offset="60%" stopColor="#FF007A" />
          <stop offset="100%" stopColor="#C00065" />
        </linearGradient>

        {/* Deep Mouth Gradient */}
        <linearGradient id="mrBeastMouthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B072B" />
          <stop offset="100%" stopColor="#150012" />
        </linearGradient>

        {/* Drop Shadow Filter */}
        <filter id="mrBeastGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00F5FF" floodOpacity="0.7" />
          <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#FF007A" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Outer Dark Contour Silhouette */}
      <path
        d="M 12 73 C 18 55 28 39 42 23 C 47 15 53 6 54 7 C 55 8 52 19 50 27 C 61 25 75 28 88 38 C 95 43 99 47 97 50 C 94 51 84 52 77 54 C 69 56 64 61 58 65 L 52 56 C 42 58 30 64 20 73 Z"
        fill="#011627"
        transform="translate(1.5, 2)"
      />

      {/* Main Cyan Shark Body */}
      <path
        d="M 12 73 C 18 55 28 39 42 23 C 47 15 53 6 54 7 C 55 8 52 19 50 27 C 61 25 75 28 88 38 C 95 43 99 47 97 50 C 94 51 84 52 77 54 C 69 56 64 61 58 65 L 52 56 C 42 58 30 64 20 73 Z"
        fill="url(#mrBeastCyanGrad)"
      />

      {/* Top Dorsal Ridge Highlight */}
      <path
        d="M 42 23 C 47 15 53 6 54 7 C 55 8 52 19 50 27 C 61 25 75 28 88 38 C 93 42 96 45 96 48 C 92 46 86 41 80 37 C 68 28 56 25 45 25 Z"
        fill="url(#mrBeastCyanBright)"
        opacity="0.8"
      />

      {/* Lower Jaw (Powerful Open Jaw) */}
      <path
        d="M 38 78 C 48 75 58 73 68 69 C 72 67 75 65 74 63 C 72 63 66 64 60 66 C 53 68 45 71 38 73 Z"
        fill="url(#mrBeastCyanGrad)"
      />
      <path
        d="M 38 78 C 48 75 58 73 68 69 C 72 67 75 65 74 63 C 72 63 66 64 60 66 C 53 68 45 71 38 73 Z"
        stroke="#011627"
        strokeWidth="1"
      />

      {/* Fierce Open Mouth (Dark Purple / Crimson interior) */}
      <path
        d="M 53 56 C 61 55 69 53 76 52 C 74 54 70 57 66 60 C 61 63 57 64 53 64 C 49 64 46 61 47 59 Z"
        fill="url(#mrBeastMouthGrad)"
      />

      {/* Sharp White Shark Teeth */}
      {/* Upper Jaw Razor Teeth */}
      <polygon points="55,55 57,58.5 59,55" fill="#FFFFFF" />
      <polygon points="60,54 62,58 64,54" fill="#FFFFFF" />
      <polygon points="65,53 67,57 69,53" fill="#FFFFFF" />
      <polygon points="70,52 72,56 74,52" fill="#FFFFFF" />
      {/* Lower Jaw Razor Teeth */}
      <polygon points="56,62.5 58,59.5 60,62.5" fill="#FFFFFF" />
      <polygon points="61,61.5 63,58.5 65,61.5" fill="#FFFFFF" />
      <polygon points="66,60.5 68,57.5 70,60.5" fill="#FFFFFF" />

      {/* Iconic MrBeast Lightning Bolt (striking down across eye/face in Neon Pink) */}
      <polygon
        points="64,17 72,31 66,31 74,43 59,35 64,35 57,21"
        fill="url(#mrBeastPinkGrad)"
        filter="url(#mrBeastGlowFilter)"
      />
      <polygon
        points="64.5,19 71,31 66,31 73,42 61,35 65,35 59,22"
        fill="#FFA6D5"
      />

      {/* Piercing Fierce Shark Eye */}
      <polygon points="77,39 83,42 79,44 75,41" fill="#FFFFFF" />
      <polygon points="78,40 81,42 79,43 76,41" fill="#FF007A" />

      {/* 3 Aerodynamic Shark Gills */}
      <path d="M 37 45 Q 39 49 38 53" stroke="#00F5FF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 41 44 Q 43 48 42 52" stroke="#00F5FF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 45 43 Q 47 47 46 51" stroke="#00F5FF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

export default SharkLogo;