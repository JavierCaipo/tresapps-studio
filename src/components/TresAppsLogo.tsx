import React from "react";
import Image from "next/image";

export default function TresAppsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`group flex items-center ${className}`}>
      <div className="rounded-full px-4 py-1 bg-black/50 backdrop-blur-sm drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] md:drop-shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]">
        <Image
          src="/images/logo-tresapps.webp"
          alt="TresApps Logo"
          width={360}
          height={72}
          className="w-auto h-10 md:h-[72px] mix-blend-lighten"
          priority
        />
      </div>
    </div>
  );
}
