import React from "react";

export const TestaDiMoroIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Head */}
    <path d="M50 85C65 85 75 75 75 60C75 45 65 30 50 30C35 30 25 45 25 60C25 75 35 85 50 85Z" fill="currentColor" />
    {/* Crown */}
    <path d="M30 35L40 20L50 30L60 20L70 35H30Z" fill="#F7D15B" />
    {/* Neck */}
    <path d="M35 80C35 90 40 95 50 95C60 95 65 90 65 80H35Z" fill="currentColor" />
    {/* Details */}
    <circle cx="28" cy="55" r="4" fill="#F7D15B" />
    <circle cx="72" cy="55" r="4" fill="#F7D15B" />
    <path d="M42 60H58" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
  </svg>
);

export const FicodindiaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main Pad */}
    <ellipse cx="50" cy="65" rx="15" ry="25" fill="currentColor" />
    {/* Top Pad */}
    <ellipse cx="50" cy="35" rx="12" ry="18" fill="currentColor" opacity="0.8" />
    {/* Side Pad Left */}
    <ellipse cx="32" cy="50" rx="10" ry="15" fill="currentColor" opacity="0.7" transform="rotate(-30 32 50)" />
    {/* Side Pad Right */}
    <ellipse cx="68" cy="50" rx="10" ry="15" fill="currentColor" opacity="0.7" transform="rotate(30 68 50)" />
    {/* Fruits (Fichi) */}
    <circle cx="50" cy="18" r="5" fill="#BC5439" />
    <circle cx="25" cy="40" r="4" fill="#BC5439" />
    <circle cx="75" cy="40" r="4" fill="#BC5439" />
  </svg>
);

export const GalloIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Rooster Pitcher (Gallo di Caltagirone) Silhouette */}
    <path d="M35 85C35 70 40 60 50 60C60 60 75 75 75 85H35Z" fill="currentColor" />
    <path d="M50 60C50 40 60 30 70 30V40C70 40 65 45 60 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    {/* Comb */}
    <path d="M65 25C65 20 70 15 75 15C80 15 85 20 85 25L70 35L65 25Z" fill="#BC5439" />
    {/* Eye */}
    <circle cx="72" cy="35" r="2" fill="white" />
  </svg>
);

export const MajolicaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="currentColor" fillOpacity="0.05" />
    <path d="M10 10L90 90M90 10L10 90" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <circle cx="50" cy="50" r="30" stroke="#2D5DA1" strokeWidth="1" />
    <path d="M50 20V80M20 50H80" stroke="#F7D15B" strokeWidth="2" strokeLinecap="round" />
    <path d="M35 35L65 65M65 35L35 65" stroke="#72825E" strokeWidth="1" />
  </svg>
);
