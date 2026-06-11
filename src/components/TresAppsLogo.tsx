import React from "react";
import Image from "next/image";

export default function TresAppsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`group flex items-center transition-all duration-500 hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] ${className}`}>
      <Image
        src="/images/logo-tresapps.webp"
        alt="TresApps Logo"
        width={200}
        height={40}
        className="w-auto h-10 md:h-14"
        priority
      />
    </div>
  );
}
