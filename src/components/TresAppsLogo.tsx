import React from "react";

export default function TresAppsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`group flex items-center ${className}`}>
      <svg viewBox="0 0 160 40" className="w-auto h-7 md:h-8">
        <defs>
          <linearGradient id="logo-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id="logo-neon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        
        {/* Kinetic Triad Isomark */}
        <g className="transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]">
          {/* Left Wing */}
          <polygon points="0,4 14,4 18,12 4,12" fill="url(#logo-metal)" stroke="url(#logo-neon)" strokeWidth="1" />
          {/* Right Wing */}
          <polygon points="16,4 30,4 26,12 12,12" fill="url(#logo-metal)" stroke="url(#logo-neon)" strokeWidth="1" />
          {/* Pillar */}
          <polygon points="11,15 19,15 17,32 9,32" fill="url(#logo-metal)" stroke="url(#logo-neon)" strokeWidth="1" />
        </g>
        
        {/* Monolithic Text */}
        <text 
          x="38" 
          y="28" 
          fontFamily="monospace" 
          fontSize="24" 
          fontWeight="900" 
          letterSpacing="0.1em" 
          fill="#FFFFFF"
          className="transition-colors duration-500 group-hover:fill-[#06B6D4]"
        >
          TRESAPPS
        </text>
      </svg>
    </div>
  );
}
