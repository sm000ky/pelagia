import React from 'react';

// =========================================================================
// 1. HUMAN DIVER SCALE SILHOUETTE (1.8 Meters)
// =========================================================================
export const DiverScaleSVG: React.FC<{ className?: string }> = ({ className = "w-6 h-12" }) => (
  <svg viewBox="0 0 40 100" className={className} fill="currentColor">
    <circle cx="20" cy="12" r="7" />
    <path d="M15 10 h10 v4 h-10 z" fill="#FAF6EE" opacity="0.4" />
    <rect x="25" y="24" width="7" height="26" rx="3.5" opacity="0.75" />
    <path d="M14 22 C14 20, 26 20, 26 22 L24 54 C24 56, 16 56, 16 54 Z" />
    <path d="M15 24 L8 42 L11 44 L16 28 Z" />
    <path d="M25 24 L32 40 L29 42 L24 28 Z" />
    <path d="M16 54 L14 82 L7 95 L14 95 L18 82 Z" />
    <path d="M24 54 L26 82 L33 95 L26 95 L22 82 Z" />
  </svg>
);

// =========================================================================
// 2. GHOST CRAB (Coast · Ocypode quadrata)
// =========================================================================
export const GhostCrabSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-28" }) => (
  <svg viewBox="0 0 160 110" className={`${className} paper-cutout animate-crab-scuttle`} fill="none">
    <g className="origin-[60px_60px]">
      <path d="M60 62 L32 50 L14 68" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 68 L28 66 L12 84" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 74 L36 82 L24 100" stroke="#D95A47" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g className="origin-[100px_60px]">
      <path d="M100 62 L128 50 L146 68" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 68 L132 66 L148 84" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 74 L124 82 L136 100" stroke="#D95A47" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g className="origin-[52px_50px]">
      <path d="M54 52 L36 34 L32 20 C24 22, 22 34, 30 40 Z" fill="#EAA838" stroke="#B8781B" strokeWidth="2.5" />
    </g>
    <g className="origin-[108px_50px]">
      <path d="M106 52 L126 30 L134 16 C144 20, 146 34, 132 44 Z" fill="#D95A47" stroke="#A93B2B" strokeWidth="2.5" />
    </g>
    <path d="M52 46 C52 38, 108 38, 108 46 C112 65, 110 82, 80 84 C50 82, 48 65, 52 46 Z" fill="#F4ECE1" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M60 52 C70 56, 90 56, 100 52" stroke="#EAA838" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="70" cy="64" r="3" fill="#D95A47" />
    <circle cx="90" cy="64" r="3" fill="#D95A47" />
    <path d="M72 40 L70 20" stroke="#1E252B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="70" cy="18" r="4" fill="#1E252B" />
    <circle cx="69" cy="17" r="1.5" fill="#FAF6EE" />
    <path d="M88 40 L90 20" stroke="#1E252B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="90" cy="18" r="4" fill="#1E252B" />
    <circle cx="89" cy="17" r="1.5" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 3. SEAGULL (Coast · Larus argentatus)
// =========================================================================
export const SeagullSVG: React.FC<{ className?: string }> = ({ className = "w-36 h-24" }) => (
  <svg viewBox="0 0 140 90" className={`${className} paper-cutout animate-paper-float`} fill="none">
    <g className="origin-[70px_45px]">
      <path d="M70 45 C50 20, 18 18, 5 32 C20 40, 48 42, 70 45 Z" fill="#DDE7E8" stroke="#1E252B" strokeWidth="2.5" />
      <path d="M70 45 C90 20, 122 18, 135 32 C120 40, 92 42, 70 45 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2.5" />
      <path d="M64 36 L76 36 L70 65 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2.5" />
      <polygon points="70,65 67,76 73,76" fill="#EAA838" stroke="#1E252B" strokeWidth="2" />
      <circle cx="72" cy="72" r="1" fill="#D95A47" />
      <circle cx="67" cy="42" r="2" fill="#1E252B" />
      <circle cx="73" cy="42" r="2" fill="#1E252B" />
    </g>
  </svg>
);

// =========================================================================
// 4. HERMIT CRAB (Coast · Pagurus bernhardus)
// =========================================================================
export const HermitCrabSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-28" }) => (
  <svg viewBox="0 0 150 100" className={`${className} paper-cutout animate-crab-scuttle`} fill="none">
    {/* Shell spiral */}
    <path d="M90 60 C115 60, 135 45, 125 25 C115 10, 85 15, 65 35 C50 48, 60 70, 85 75 Z" fill="#D8C3A5" stroke="#1E252B" strokeWidth="3" />
    <path d="M95 50 C110 45, 115 32, 105 24 C95 18, 80 25, 75 35" stroke="#8C6D4F" strokeWidth="2.5" strokeLinecap="round" />
    {/* Legs peeking out */}
    <path d="M55 60 L35 70 L25 88" stroke="#D95A47" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M60 65 L45 78 L38 96" stroke="#D95A47" strokeWidth="3.5" strokeLinecap="round" />
    {/* Large protective claw */}
    <path d="M48 50 C35 45, 20 50, 24 65 C28 75, 45 72, 52 58 Z" fill="#EAA838" stroke="#1E252B" strokeWidth="3" />
    {/* Eyestalks */}
    <path d="M52 42 L48 30" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="48" cy="28" r="3" fill="#1E252B" />
    <path d="M58 40 L58 28" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="58" cy="26" r="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 5. SHORE PLOVER (Coast · Thinornis novaeseelandiae)
// =========================================================================
export const ShorePloverSVG: React.FC<{ className?: string }> = ({ className = "w-36 h-28" }) => (
  <svg viewBox="0 0 140 100" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Legs */}
    <path d="M65 65 L60 88 M75 65 L78 88" stroke="#EAA838" strokeWidth="3" strokeLinecap="round" />
    {/* Body */}
    <ellipse cx="70" cy="50" rx="28" ry="18" fill="#DDE7E8" stroke="#1E252B" strokeWidth="3" />
    {/* Wing patch */}
    <path d="M55 45 C65 42, 85 48, 92 58 C85 62, 65 60, 55 45 Z" fill="#94A3B8" stroke="#1E252B" strokeWidth="2" />
    {/* Head */}
    <circle cx="42" cy="40" r="14" fill="#FAF6EE" stroke="#1E252B" strokeWidth="3" />
    <circle cx="38" cy="37" r="3" fill="#1E252B" />
    {/* Coral Bill */}
    <polygon points="28,38 12,42 28,45" fill="#D95A47" stroke="#1E252B" strokeWidth="2" />
  </svg>
);

// =========================================================================
// 6. MARINE IGUANA (Coast · Amblyrhynchus cristatus)
// =========================================================================
export const MarineIguanaSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-28" }) => (
  <svg viewBox="0 0 180 100" className={`${className} paper-cutout animate-fish-tail`} fill="none">
    {/* Tail */}
    <path d="M120 50 C150 45, 175 60, 170 80 C155 75, 135 60, 120 55 Z" fill="#2D3748" stroke="#1E252B" strokeWidth="3" />
    {/* Body */}
    <ellipse cx="85" cy="52" rx="42" ry="20" fill="#374151" stroke="#1E252B" strokeWidth="3.5" />
    {/* Spines */}
    <path d="M50 34 L54 24 L58 33 L64 22 L68 33 L76 22 L80 34 L88 24 L94 36 L102 26 L108 38 L118 30 L122 42" stroke="#D95A47" strokeWidth="2.5" fill="#EAA838" />
    {/* Head */}
    <path d="M50 50 C40 40, 25 42, 18 52 C20 62, 38 65, 48 58 Z" fill="#1F2937" stroke="#1E252B" strokeWidth="3" />
    <circle cx="30" cy="48" r="2.5" fill="#FAF6EE" />
    {/* Salt encrusted nostrils */}
    <circle cx="20" cy="51" r="1.5" fill="#FAF6EE" />
    {/* Claws */}
    <path d="M60 68 L50 82 L42 86 M105 68 L112 82 L120 86" stroke="#1E252B" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 7. CLOWNFISH & BUBBLE ANEMONE (Amphiprion ocellaris)
// =========================================================================
export const ClownfishAnemoneSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-36" }) => (
  <svg viewBox="0 0 180 140" className={`${className} paper-cutout animate-paper-float`} fill="none">
    <g opacity="0.95">
      <path d="M30 135 C30 90, 50 70, 65 85" stroke="#EAA838" strokeWidth="8" strokeLinecap="round" />
      <path d="M55 135 C55 80, 80 65, 95 80" stroke="#D95A47" strokeWidth="9" strokeLinecap="round" />
      <path d="M90 135 C90 75, 120 60, 130 75" stroke="#EAA838" strokeWidth="8" strokeLinecap="round" />
      <path d="M125 135 C125 85, 145 75, 155 90" stroke="#D95A47" strokeWidth="8" strokeLinecap="round" />
    </g>
    <g className="origin-[100px_60px] animate-fish-tail">
      <path d="M55 58 C55 42, 85 36, 120 48 C145 54, 155 68, 120 72 C85 76, 55 70, 55 58 Z" fill="#EAA838" stroke="#1E252B" strokeWidth="3" />
      <path d="M135 58 L160 42 L152 58 L160 74 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2.5" />
      <path d="M78 40 C75 52, 75 66, 78 74 L86 74 C83 66, 83 52, 86 40 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
      <path d="M102 44 C100 52, 100 64, 102 72 L108 72 C106 64, 106 52, 108 44 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
      <circle cx="68" cy="52" r="3" fill="#1E252B" />
      <circle cx="67" cy="51" r="1" fill="#FAF6EE" />
    </g>
  </svg>
);

// =========================================================================
// 8. GREEN SEA TURTLE (Chelonia mydas)
// =========================================================================
export const GreenTurtleSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-36" }) => (
  <svg viewBox="0 0 190 140" className={`${className} paper-cutout animate-turtle-paddle`} fill="none">
    <g className="origin-[50px_45px]">
      <path d="M55 48 C35 30, 15 15, 5 35 C10 55, 35 65, 52 56 Z" fill="#2F6D68" stroke="#1E252B" strokeWidth="3" />
    </g>
    <g className="origin-[135px_45px]">
      <path d="M135 48 C155 30, 175 15, 185 35 C180 55, 155 65, 138 56 Z" fill="#2F6D68" stroke="#1E252B" strokeWidth="3" />
    </g>
    <path d="M95 18 C85 18, 80 28, 88 38 C102 38, 105 28, 95 18 Z" fill="#50857D" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="90" cy="26" r="2" fill="#1E252B" />
    <circle cx="100" cy="26" r="2" fill="#1E252B" />
    <ellipse cx="95" cy="72" rx="46" ry="52" fill="#50857D" stroke="#1E252B" strokeWidth="3.5" />
    <polygon points="95,45 110,60 110,80 95,92 80,80 80,60" fill="#2F6D68" stroke="#FAF6EE" strokeWidth="2" />
    <polygon points="95,45 110,60 132,54 125,38" fill="#3D7068" stroke="#FAF6EE" strokeWidth="1.5" />
    <polygon points="95,45 80,60 58,54 65,38" fill="#3D7068" stroke="#FAF6EE" strokeWidth="1.5" />
    <polygon points="95,92 110,80 130,94 116,108" fill="#3D7068" stroke="#FAF6EE" strokeWidth="1.5" />
    <polygon points="95,92 80,80 60,94 74,108" fill="#3D7068" stroke="#FAF6EE" strokeWidth="1.5" />
  </svg>
);

// =========================================================================
// 9. LION'S MANE JELLYFISH (Cyanea capillata)
// =========================================================================
export const LionsManeJellySVG: React.FC<{ className?: string }> = ({ className = "w-44 h-52" }) => (
  <svg viewBox="0 0 170 210" className={`${className} paper-cutout animate-jelly-pulse`} fill="none">
    <g opacity="0.8">
      <path d="M60 90 C50 130, 70 170, 55 205" stroke="#D95A47" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M75 92 C85 135, 65 165, 80 205" stroke="#EAA838" strokeWidth="2.5" />
      <path d="M95 92 C105 135, 85 165, 95 205" stroke="#EAA838" strokeWidth="2.5" />
      <path d="M110 90 C120 130, 100 170, 115 205" stroke="#D95A47" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M45 88 C35 125, 45 160, 38 195" stroke="#D95A47" strokeWidth="1.5" />
      <path d="M125 88 C135 125, 125 160, 132 195" stroke="#D95A47" strokeWidth="1.5" />
    </g>
    <path d="M30 85 C30 40, 140 40, 140 85 C120 95, 105 82, 85 86 C65 82, 50 95, 30 85 Z" fill="#D95A47" stroke="#1E252B" strokeWidth="3" />
    <path d="M42 80 C50 55, 120 55, 128 80" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M52 82 C55 98, 70 120, 85 125 C100 120, 115 98, 118 82 Z" fill="#EAA838" stroke="#1E252B" strokeWidth="2.5" />
  </svg>
);

// =========================================================================
// 10. REEF MANTA RAY (Mobula alfredi)
// =========================================================================
export const MantaRaySVG: React.FC<{ className?: string }> = ({ className = "w-52 h-36" }) => (
  <svg viewBox="0 0 210 140" className={`${className} paper-cutout animate-manta-wing`} fill="none">
    <path d="M105 90 L105 135" stroke="#1E252B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M105 25 C135 32, 195 40, 205 60 C180 80, 135 88, 105 90 C75 88, 30 80, 5 60 C15 40, 75 32, 105 25 Z" fill="#1B322D" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M92 25 C88 12, 95 8, 98 18 M118 25 C122 12, 115 8, 112 18" stroke="#1B322D" strokeWidth="4" strokeLinecap="round" />
    <circle cx="85" cy="38" r="3" fill="#FAF6EE" />
    <circle cx="125" cy="38" r="3" fill="#FAF6EE" />
    <circle cx="95" cy="65" r="2" fill="#FAF6EE" opacity="0.8" />
    <circle cx="105" cy="72" r="2.5" fill="#FAF6EE" opacity="0.8" />
    <circle cx="115" cy="65" r="2" fill="#FAF6EE" opacity="0.8" />
  </svg>
);

// =========================================================================
// 11. BLUE WHALE (Balaenoptera musculus)
// =========================================================================
export const BlueWhaleSVG: React.FC<{ className?: string }> = ({ className = "w-72 h-36" }) => (
  <svg viewBox="0 0 290 140" className={`${className} paper-cutout animate-whale-swim`} fill="none">
    <g className="origin-[230px_70px]">
      <path d="M230 70 L275 42 L268 70 L285 96 L245 80 Z" fill="#1D4A62" stroke="#1E252B" strokeWidth="3" />
    </g>
    <path d="M25 65 C25 35, 110 30, 230 70 C190 95, 110 100, 25 65 Z" fill="#2C6A7B" stroke="#1E252B" strokeWidth="4" />
    <path d="M35 68 C45 88, 110 98, 160 88" stroke="#DDECE5" strokeWidth="2.5" strokeDasharray="3 3" />
    <path d="M45 74 C55 92, 110 102, 150 94" stroke="#DDECE5" strokeWidth="2.5" strokeDasharray="3 3" />
    <path d="M95 72 L70 100 L85 102 L115 80 Z" fill="#1D4A62" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="48" cy="58" r="3" fill="#1E252B" />
    <circle cx="47" cy="57" r="1" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 12. WHALE SHARK (Rhincodon typus)
// =========================================================================
export const WhaleSharkSVG: React.FC<{ className?: string }> = ({ className = "w-64 h-36" }) => (
  <svg viewBox="0 0 260 140" className={`${className} paper-cutout animate-whale-swim`} fill="none">
    <path d="M205 70 L248 38 L238 70 L252 102 L215 80 Z" fill="#1D445A" stroke="#1E252B" strokeWidth="3" />
    <path d="M20 70 C20 42, 95 38, 210 70 C175 98, 95 98, 20 70 Z" fill="#2C5364" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M125 43 L145 20 L152 46 Z" fill="#1D445A" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M75 75 L55 105 L72 108 L100 82 Z" fill="#1D445A" stroke="#1E252B" strokeWidth="2.5" />
    <g fill="#FAF6EE" opacity="0.85">
      <circle cx="85" cy="55" r="2" /><circle cx="105" cy="52" r="2" /><circle cx="125" cy="54" r="2" />
      <circle cx="95" cy="65" r="2" /><circle cx="115" cy="65" r="2" /><circle cx="135" cy="65" r="2" />
      <circle cx="145" cy="58" r="2" /><circle cx="165" cy="64" r="2" /><circle cx="180" cy="70" r="2" />
    </g>
    <circle cx="34" cy="62" r="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 13. GREAT WHITE SHARK (Carcharodon carcharias)
// =========================================================================
export const GreatWhiteSVG: React.FC<{ className?: string }> = ({ className = "w-60 h-32" }) => (
  <svg viewBox="0 0 240 130" className={`${className} paper-cutout animate-whale-swim`} fill="none">
    {/* Dorsal Fin */}
    <path d="M110 42 L130 14 L142 46 Z" fill="#4B5563" stroke="#1E252B" strokeWidth="3" />
    {/* Tail fin */}
    <path d="M190 65 L230 30 L220 65 L235 98 L195 78 Z" fill="#4B5563" stroke="#1E252B" strokeWidth="3" />
    {/* Main Body */}
    <path d="M20 65 C20 45, 90 40, 195 65 C160 88, 90 90, 20 65 Z" fill="#4B5563" stroke="#1E252B" strokeWidth="3.5" />
    {/* White belly countershading */}
    <path d="M20 65 C60 72, 120 75, 195 65 C160 85, 90 88, 20 65 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="1.5" />
    {/* Pectoral Fin */}
    <path d="M75 70 L55 105 L72 108 L95 78 Z" fill="#374151" stroke="#1E252B" strokeWidth="2.5" />
    {/* Gill slits */}
    <path d="M60 58 L58 72 M65 58 L63 72 M70 58 L68 72" stroke="#1E252B" strokeWidth="2" strokeLinecap="round" />
    {/* Dark predatory eye */}
    <circle cx="36" cy="58" r="3" fill="#111827" />
  </svg>
);

// =========================================================================
// 14. FLYING FISH (Cheilopogon melanurus)
// =========================================================================
export const FlyingFishSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-32" }) => (
  <svg viewBox="0 0 170 120" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Expansive Wing-like Pectoral Fins */}
    <path d="M75 55 C60 15, 20 8, 5 22 C30 35, 55 48, 75 55 Z" fill="#6EE7B7" fillOpacity="0.7" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M75 55 C90 15, 130 8, 145 22 C120 35, 95 48, 75 55 Z" fill="#6EE7B7" fillOpacity="0.7" stroke="#1E252B" strokeWidth="2.5" />
    {/* Body */}
    <ellipse cx="75" cy="65" rx="48" ry="14" fill="#0D9488" stroke="#1E252B" strokeWidth="3" />
    {/* Asymmetrical Tail Fin */}
    <path d="M123 65 L145 52 L140 65 L155 85 L125 72 Z" fill="#0F766E" stroke="#1E252B" strokeWidth="2" />
    <circle cx="38" cy="62" r="3.5" fill="#FAF6EE" stroke="#1E252B" strokeWidth="1.5" />
    <circle cx="37" cy="62" r="1.5" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 15. INDO-PACIFIC SAILFISH (Istiophorus platypterus)
// =========================================================================
export const SailfishSVG: React.FC<{ className?: string }> = ({ className = "w-64 h-36" }) => (
  <svg viewBox="0 0 250 140" className={`${className} paper-cutout animate-fish-tail`} fill="none">
    {/* Towering Cobalt Sail */}
    <path d="M75 50 C85 10, 135 8, 175 40 C145 42, 105 45, 75 50 Z" fill="#2563EB" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M90 22 L88 48 M110 14 L108 46 M130 14 L128 44 M150 20 L148 42" stroke="#93C5FD" strokeWidth="1.5" />
    {/* Body */}
    <path d="M35 65 C40 50, 110 46, 205 65 C170 82, 100 85, 35 65 Z" fill="#1E40AF" stroke="#1E252B" strokeWidth="3" />
    {/* Sharp Spear Rostrum */}
    <path d="M35 65 L5 62 L35 66 Z" fill="#1E252B" stroke="#1E252B" strokeWidth="1.5" />
    {/* Crescent Tail */}
    <path d="M205 65 L235 38 L228 65 L240 92 L208 74 Z" fill="#1E3A8A" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="50" cy="60" r="3" fill="#FAF6EE" />
    <circle cx="49" cy="60" r="1.5" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 16. NORTHERN SEA OTTER (Enhydra lutris)
// =========================================================================
export const SeaOtterSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-32" }) => (
  <svg viewBox="0 0 170 120" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Body floating on back */}
    <ellipse cx="85" cy="65" rx="55" ry="24" fill="#78350F" stroke="#1E252B" strokeWidth="3.5" />
    <ellipse cx="85" cy="68" rx="38" ry="16" fill="#A16207" />
    {/* Head */}
    <circle cx="36" cy="56" r="18" fill="#D97706" stroke="#1E252B" strokeWidth="3" />
    <circle cx="30" cy="52" r="2.5" fill="#1E252B" />
    <ellipse cx="26" cy="59" rx="3.5" ry="2.5" fill="#1E252B" />
    {/* Paws holding stone */}
    <circle cx="82" cy="58" r="8" fill="#4B5563" stroke="#1E252B" strokeWidth="2" />
    <ellipse cx="74" cy="56" rx="6" ry="4" fill="#78350F" stroke="#1E252B" strokeWidth="2" />
    <ellipse cx="90" cy="56" rx="6" ry="4" fill="#78350F" stroke="#1E252B" strokeWidth="2" />
    {/* Webbed hind flippers */}
    <path d="M135 68 L152 78 L142 85 Z" fill="#78350F" stroke="#1E252B" strokeWidth="2" />
  </svg>
);

// =========================================================================
// 17. GIANT PACIFIC OCTOPUS (Enteroctopus dofleini)
// =========================================================================
export const GiantOctopusSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-44" }) => (
  <svg viewBox="0 0 190 170" className={`${className} paper-cutout animate-jelly-pulse`} fill="none">
    <path d="M95 105 C75 140, 25 140, 15 110 C8 85, 45 95, 65 105" stroke="#D95A47" strokeWidth="7" strokeLinecap="round" />
    <path d="M100 105 C125 140, 175 140, 185 110 C192 85, 155 95, 135 105" stroke="#D95A47" strokeWidth="7" strokeLinecap="round" />
    <path d="M85 105 C65 145, 45 165, 30 160" stroke="#EAA838" strokeWidth="6" strokeLinecap="round" />
    <path d="M115 105 C135 145, 155 165, 170 160" stroke="#EAA838" strokeWidth="6" strokeLinecap="round" />
    <path d="M48 85 C48 30, 152 30, 152 85 C152 110, 48 110, 48 85 Z" fill="#D95A47" stroke="#1E252B" strokeWidth="4" />
    <path d="M60 85 C75 75, 125 75, 140 85" stroke="#FAF6EE" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
    <ellipse cx="78" cy="85" rx="5" ry="3" fill="#1E252B" />
    <ellipse cx="122" cy="85" rx="5" ry="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 18. OCEAN SUNFISH / MOLA MOLA (Mola mola)
// =========================================================================
export const OceanSunfishSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-48" }) => (
  <svg viewBox="0 0 170 190" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Tall dorsal fin */}
    <path d="M90 70 L115 15 L128 70 Z" fill="#64748B" stroke="#1E252B" strokeWidth="3" />
    {/* Tall anal fin */}
    <path d="M90 120 L115 175 L128 120 Z" fill="#64748B" stroke="#1E252B" strokeWidth="3" />
    {/* Clavus rudder tail */}
    <path d="M125 70 C145 80, 145 110, 125 120 Z" fill="#94A3B8" stroke="#1E252B" strokeWidth="3" />
    {/* Massive disc body */}
    <ellipse cx="85" cy="95" rx="50" ry="42" fill="#94A3B8" stroke="#1E252B" strokeWidth="4" />
    {/* Small open round beak */}
    <path d="M35 92 C30 92, 28 98, 35 98 Z" fill="#1E252B" />
    {/* Surprised eye */}
    <circle cx="55" cy="85" r="4.5" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
    <circle cx="54" cy="85" r="2" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 19. GIANT OARFISH (Regalecus glesne)
// =========================================================================
export const GiantOarfishSVG: React.FC<{ className?: string }> = ({ className = "w-60 h-28" }) => (
  <svg viewBox="0 0 240 110" className={`${className} paper-cutout animate-fish-tail`} fill="none">
    <path d="M25 45 C35 25, 45 15, 55 12 M28 46 C42 30, 52 22, 65 18" stroke="#D95A47" strokeWidth="3" strokeLinecap="round" />
    <path d="M25 55 L225 55 L235 62 L225 68 L25 68 Z" fill="#DDE7E8" stroke="#1E252B" strokeWidth="3" />
    <path d="M25 53 L225 53" stroke="#D95A47" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 68 L32 98 L36 102 L48 70" stroke="#D95A47" strokeWidth="2.5" fill="#D95A47" />
    <circle cx="35" cy="59" r="3.5" fill="#1E252B" />
    <circle cx="34" cy="58" r="1.5" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 20. BARRELEYE FISH (Macropinna microstoma)
// =========================================================================
export const BarreleyeSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-32" }) => (
  <svg viewBox="0 0 170 120" className={`${className} paper-cutout animate-paper-float`} fill="none">
    <path d="M25 65 C25 45, 95 45, 145 65 C95 85, 25 85, 25 65 Z" fill="#1E252B" stroke="#1E252B" strokeWidth="3" />
    <path d="M26 62 C26 40, 85 40, 85 62 Z" fill="#6CAE9E" fillOpacity="0.45" stroke="#FAF6EE" strokeWidth="2" />
    <circle cx="48" cy="52" r="5.5" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />
    <circle cx="66" cy="52" r="5.5" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />
    <path d="M142 65 L165 48 L158 65 L165 82 Z" fill="#50857D" stroke="#1E252B" strokeWidth="2" />
    <circle cx="28" cy="64" r="1.5" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 21. GLASS SQUID (Taonius borealis)
// =========================================================================
export const GlassSquidSVG: React.FC<{ className?: string }> = ({ className = "w-36 h-48" }) => (
  <svg viewBox="0 0 140 190" className={`${className} paper-cutout animate-jelly-pulse`} fill="none">
    <path d="M45 45 C45 15, 95 15, 95 45 C95 95, 75 125, 70 145 C65 125, 45 95, 45 45 Z" fill="#FAF6EE" fillOpacity="0.35" stroke="#DDE7E8" strokeWidth="3" />
    <ellipse cx="70" cy="75" rx="8" ry="16" fill="#D95A47" opacity="0.8" />
    <circle cx="56" cy="138" r="5" fill="#1E252B" />
    <circle cx="56" cy="142" r="2" fill="#5DADE2" />
    <circle cx="84" cy="138" r="5" fill="#1E252B" />
    <circle cx="84" cy="142" r="2" fill="#5DADE2" />
    <path d="M60 148 L52 185 M66 150 L64 188 M74 150 L76 188 M80 148 L88 185" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// =========================================================================
// 22. STOPLIGHT LOOSEJAW (Malacosteus niger)
// =========================================================================
export const StoplightLoosejawSVG: React.FC<{ className?: string }> = ({ className = "w-52 h-32" }) => (
  <svg viewBox="0 0 200 120" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Body */}
    <path d="M55 58 C60 48, 120 48, 175 60 L195 50 L190 60 L195 70 L175 62 C120 72, 60 72, 55 58 Z" fill="#111827" stroke="#1E252B" strokeWidth="3" />
    {/* Unhinged floorless jaw */}
    <path d="M52 56 L20 62 L48 85 L65 62" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Needle fangs */}
    <path d="M22 62 L26 72 M30 63 L34 74 M38 64 L42 75" stroke="#FAF6EE" strokeWidth="2" />
    {/* Red searchlight suborbital photophore */}
    <circle cx="46" cy="54" r="4" fill="#DC2626" stroke="#EF4444" strokeWidth="1.5" />
    <circle cx="46" cy="54" r="1.5" fill="#FCA5A5" />
    {/* Eye */}
    <circle cx="38" cy="52" r="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 23. GLACIER LANTERNFISH (Benthosema glaciale)
// =========================================================================
export const LanternfishSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-28" }) => (
  <svg viewBox="0 0 160 100" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    <path d="M20 50 C20 35, 75 32, 125 50 C85 68, 20 65, 20 50 Z" fill="#1E3A8A" stroke="#1E252B" strokeWidth="3" />
    {/* Tail fin */}
    <path d="M125 50 L145 38 L140 50 L148 64 L125 54 Z" fill="#172554" stroke="#1E252B" strokeWidth="2" />
    {/* Constellation flank photophores */}
    <g fill="#38BDF8">
      <circle cx="45" cy="54" r="1.8" /><circle cx="58" cy="56" r="1.8" />
      <circle cx="72" cy="57" r="1.8" /><circle cx="86" cy="57" r="1.8" />
      <circle cx="100" cy="55" r="1.8" /><circle cx="114" cy="53" r="1.8" />
      <circle cx="65" cy="46" r="1.5" /><circle cx="80" cy="46" r="1.5" />
    </g>
    {/* Large pupil */}
    <circle cx="34" cy="46" r="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
  </svg>
);

// =========================================================================
// 24. BIGEYE TUNA (Thunnus obesus)
// =========================================================================
export const BigeyeTunaSVG: React.FC<{ className?: string }> = ({ className = "w-56 h-32" }) => (
  <svg viewBox="0 0 210 120" className={`${className} paper-cutout animate-whale-swim`} fill="none">
    {/* Body */}
    <path d="M20 60 C20 38, 85 32, 175 60 C135 88, 85 88, 20 60 Z" fill="#1E3A8A" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M20 60 C60 70, 110 74, 175 60 C135 84, 85 86, 20 60 Z" fill="#DDE7E8" stroke="#1E252B" strokeWidth="1.5" />
    {/* Yellow finlets */}
    <polygon points="145,45 152,38 150,46" fill="#FACC15" stroke="#1E252B" strokeWidth="1" />
    <polygon points="155,48 162,42 160,49" fill="#FACC15" stroke="#1E252B" strokeWidth="1" />
    <polygon points="145,75 152,82 150,74" fill="#FACC15" stroke="#1E252B" strokeWidth="1" />
    {/* Crescent tail */}
    <path d="M175 60 L202 38 L196 60 L204 82 L175 62 Z" fill="#172554" stroke="#1E252B" strokeWidth="2.5" />
    {/* Giant spherical eye */}
    <circle cx="42" cy="54" r="7" fill="#0F172A" stroke="#FACC15" strokeWidth="2" />
    <circle cx="40" cy="52" r="2" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 25. SLENDER SNIPE EEL (Nemichthys scolopaceus)
// =========================================================================
export const SnipeEelSVG: React.FC<{ className?: string }> = ({ className = "w-60 h-24" }) => (
  <svg viewBox="0 0 230 90" className={`${className} paper-cutout animate-fish-tail`} fill="none">
    {/* Long undulating ribbon */}
    <path d="M45 45 Q 85 30, 125 50 T 205 45 T 225 45" stroke="#64748B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* Outward curved bird jaws */}
    <path d="M45 45 C35 40, 20 32, 10 30" stroke="#1E252B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M45 47 C35 52, 20 60, 10 62" stroke="#1E252B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="42" cy="43" r="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 26. COCKATOO SQUID (Galiteuthis phyllura)
// =========================================================================
export const CockatooSquidSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-44" }) => (
  <svg viewBox="0 0 150 170" className={`${className} paper-cutout animate-jelly-pulse`} fill="none">
    {/* Translucent balloon mantle */}
    <path d="M50 40 C50 15, 100 15, 100 40 C100 85, 85 115, 75 130 C65 115, 50 85, 50 40 Z" fill="#F8FAFC" fillOpacity="0.45" stroke="#94A3B8" strokeWidth="3" />
    {/* Arm crest resembling cockatoo */}
    <path d="M60 130 C50 145, 35 155, 30 165 M68 132 C65 150, 58 160, 55 168 M82 132 C85 150, 92 160, 95 168 M90 130 C100 145, 115 155, 120 165" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Eyes with photophores */}
    <circle cx="62" cy="122" r="4.5" fill="#0F172A" />
    <circle cx="62" cy="126" r="2" fill="#0284C7" />
    <circle cx="88" cy="122" r="4.5" fill="#0F172A" />
    <circle cx="88" cy="126" r="2" fill="#0284C7" />
  </svg>
);

// =========================================================================
// 27. SILVER HATCHETFISH (Argyropelecus aculeatus)
// =========================================================================
export const SilverHatchetfishSVG: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <svg viewBox="0 0 140 140" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Deep axe blade body */}
    <path d="M35 50 C40 38, 75 35, 95 48 L120 50 L115 62 L95 65 C85 95, 65 105, 45 105 C35 105, 25 85, 25 68 Z" fill="#E2E8F0" stroke="#1E252B" strokeWidth="3" />
    {/* Ventral photophore prism row */}
    <g fill="#38BDF8">
      <circle cx="42" cy="98" r="1.8" /><circle cx="50" cy="98" r="1.8" />
      <circle cx="58" cy="98" r="1.8" /><circle cx="66" cy="96" r="1.8" />
      <circle cx="74" cy="92" r="1.8" /><circle cx="82" cy="85" r="1.8" />
    </g>
    {/* Upturned binocular eyes */}
    <circle cx="45" cy="44" r="5" fill="#0F172A" stroke="#1E252B" strokeWidth="1.5" />
    <circle cx="43" cy="42" r="2" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 28. SPINY DOGFISH (Squalus acanthias)
// =========================================================================
export const SpinyDogfishSVG: React.FC<{ className?: string }> = ({ className = "w-52 h-28" }) => (
  <svg viewBox="0 0 200 110" className={`${className} paper-cutout animate-whale-swim`} fill="none">
    {/* Dorsal Spines */}
    <path d="M82 45 L88 28 L94 45" stroke="#EAA838" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M132 50 L136 36 L140 50" stroke="#EAA838" strokeWidth="2.5" strokeLinecap="round" />
    {/* Body */}
    <path d="M20 58 C20 42, 85 38, 165 58 C135 75, 85 78, 20 58 Z" fill="#64748B" stroke="#1E252B" strokeWidth="3" />
    {/* Tail */}
    <path d="M165 58 L190 38 L185 58 L192 75 L165 60 Z" fill="#475569" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="36" cy="54" r="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 29. PELAGIC RED CRAB (Pleuroncodes planipes)
// =========================================================================
export const RedCrabSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-32" }) => (
  <svg viewBox="0 0 150 120" className={`${className} paper-cutout animate-crab-scuttle`} fill="none">
    {/* Swimming Tail Fan */}
    <path d="M75 80 L62 105 L75 110 L88 105 Z" fill="#DC2626" stroke="#1E252B" strokeWidth="2.5" />
    {/* Carapace */}
    <ellipse cx="75" cy="58" rx="26" ry="22" fill="#EF4444" stroke="#1E252B" strokeWidth="3" />
    {/* Long slender pincer arms */}
    <path d="M55 52 L30 35 L20 18 L24 38 Z" fill="#DC2626" stroke="#1E252B" strokeWidth="2" />
    <path d="M95 52 L120 35 L130 18 L126 38 Z" fill="#DC2626" stroke="#1E252B" strokeWidth="2" />
    {/* Eyestalks */}
    <circle cx="68" cy="38" r="3" fill="#1E252B" />
    <circle cx="82" cy="38" r="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 30. VIPERFISH (Chauliodus sloani)
// =========================================================================
export const ViperfishSVG: React.FC<{ className?: string }> = ({ className = "w-52 h-32" }) => (
  <svg viewBox="0 0 190 120" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    <path d="M35 58 C35 42, 95 42, 160 58 C115 75, 35 75, 35 58 Z" fill="#142330" stroke="#1E252B" strokeWidth="3" />
    <path d="M35 52 L15 62 L42 75 Z" fill="#0C1620" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M18 64 L22 46 M28 66 L30 42 M35 68 L36 48" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 55 L24 72 M28 54 L30 76" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M48 44 C65 20, 95 18, 110 32" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
    <circle cx="110" cy="32" r="2.5" fill="#EAA838" />
    <circle cx="38" cy="52" r="3.5" fill="#FAF6EE" />
    <circle cx="38" cy="52" r="1.5" fill="#1E252B" />
    <g fill="#5DADE2">
      <circle cx="55" cy="65" r="1.5" /><circle cx="70" cy="66" r="1.5" /><circle cx="85" cy="66" r="1.5" />
      <circle cx="100" cy="65" r="1.5" /><circle cx="115" cy="64" r="1.5" /><circle cx="130" cy="62" r="1.5" />
    </g>
  </svg>
);

// =========================================================================
// 31. HUMPBACK ANGLERFISH (Melanocetus johnsonii)
// =========================================================================
export const AnglerfishSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-40" }) => (
  <svg viewBox="0 0 170 140" className={`${className} paper-cutout-dark animate-paper-float`} fill="none">
    <path d="M55 50 C45 20, 85 10, 98 25" stroke="#EAA838" strokeWidth="3" strokeLinecap="round" />
    <circle cx="98" cy="25" r="5" fill="#FAF6EE" stroke="#EAA838" strokeWidth="2" />
    <circle cx="98" cy="25" r="2" fill="#EAA838" />
    <path d="M35 70 C35 35, 115 35, 130 75 C115 115, 35 115, 35 70 Z" fill="#0C1620" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M35 60 L15 78 L55 98 Z" fill="#142330" stroke="#1E252B" strokeWidth="3" />
    <path d="M18 78 L25 58 M28 82 L34 62 M38 88 L42 66" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 68 L26 84 M30 65 L34 88" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="48" cy="58" r="2.5" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 32. GULPER EEL (Eurypharynx pelecanoides)
// =========================================================================
export const GulperEelSVG: React.FC<{ className?: string }> = ({ className = "w-56 h-36" }) => (
  <svg viewBox="0 0 200 130" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    <path d="M75 60 C110 50, 160 50, 195 80" stroke="#0C1620" strokeWidth="4" strokeLinecap="round" />
    <circle cx="195" cy="80" r="3.5" fill="#F43F5E" />
    <path d="M30 45 C55 35, 80 40, 80 62 C80 95, 30 100, 15 75 C12 60, 20 48, 30 45 Z" fill="#142330" stroke="#1E252B" strokeWidth="3" />
    <path d="M30 46 L75 62 L25 82 Z" fill="#0C1620" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="28" cy="50" r="2" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 33. GIANT SQUID (Architeuthis dux)
// =========================================================================
export const GiantSquidSVG: React.FC<{ className?: string }> = ({ className = "w-60 h-44" }) => (
  <svg viewBox="0 0 220 160" className={`${className} paper-cutout-dark animate-jelly-pulse`} fill="none">
    <path d="M110 55 C110 25, 195 40, 210 55 C195 70, 110 85, 110 55 Z" fill="#881337" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M190 35 L215 55 L190 75 Z" fill="#9F1239" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M110 55 C90 55, 85 45, 75 55 C85 65, 90 55, 110 55 Z" fill="#9F1239" stroke="#1E252B" strokeWidth="2" />
    <circle cx="95" cy="55" r="9" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="95" cy="55" r="4.5" fill="#1E252B" />
    <path d="M75 50 C55 45, 25 35, 10 25" stroke="#9F1239" strokeWidth="4" strokeLinecap="round" />
    <path d="M75 60 C55 65, 25 75, 10 85" stroke="#9F1239" strokeWidth="4" strokeLinecap="round" />
    <path d="M75 52 C45 50, 15 48, 5 45" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" />
    <path d="M75 58 C45 60, 15 62, 5 65" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 34. COMMON FANGTOOTH (Anoplogaster cornuta)
// =========================================================================
export const FangtoothSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-36" }) => (
  <svg viewBox="0 0 160 130" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Massive armored skull */}
    <path d="M30 65 C30 35, 85 30, 125 55 C95 85, 30 95, 30 65 Z" fill="#1C1917" stroke="#1E252B" strokeWidth="3.5" />
    {/* Gaping maw with massive crossing fangs */}
    <path d="M28 55 L55 70 L28 85 Z" fill="#0C0A09" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M30 82 L34 52 M38 84 L40 56 M46 85 L48 60" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 56 L35 78 M42 58 L44 80" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="48" cy="46" r="3" fill="#EAA838" />
  </svg>
);

// =========================================================================
// 35. BLACK SWALLOWER (Chiasmodon niger)
// =========================================================================
export const BlackSwallowerSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-36" }) => (
  <svg viewBox="0 0 180 130" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Distended balloon stomach holding curled prey */}
    <ellipse cx="95" cy="85" rx="35" ry="26" fill="#78350F" fillOpacity="0.5" stroke="#D97706" strokeWidth="2.5" />
    <path d="M80 85 C88 78, 105 82, 110 92" stroke="#FDE68A" strokeWidth="2" strokeDasharray="3 2" />
    {/* Body */}
    <path d="M25 55 C25 40, 85 38, 155 55 L175 45 L170 55 L175 65 L155 58 C115 65, 45 65, 25 55 Z" fill="#1C1917" stroke="#1E252B" strokeWidth="3" />
    <path d="M25 55 L10 65 L35 72 Z" fill="#0C0A09" stroke="#1E252B" strokeWidth="2" />
    <circle cx="34" cy="50" r="2.5" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 36. VAMPIRE SQUID (Vampyroteuthis infernalis)
// =========================================================================
export const VampireSquidSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-44" }) => (
  <svg viewBox="0 0 160 160" className={`${className} paper-cutout-dark animate-jelly-pulse`} fill="none">
    <path d="M80 20 C60 20, 50 45, 50 65 C50 115, 80 145, 80 145 C80 145, 110 115, 110 65 C110 45, 100 20, 80 20 Z" fill="#4C0519" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M50 75 C30 110, 45 135, 80 145 C115 135, 130 110, 110 75 Z" fill="#881337" opacity="0.85" />
    <g stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round">
      <path d="M60 90 L55 98 M70 100 L68 110 M80 105 L80 118 M90 100 L92 110 M100 90 L105 98" />
    </g>
    <circle cx="65" cy="55" r="6" fill="#0284C7" stroke="#FAF6EE" strokeWidth="2" />
    <circle cx="95" cy="55" r="6" fill="#0284C7" stroke="#FAF6EE" strokeWidth="2" />
    <circle cx="45" cy="115" r="2.5" fill="#38BDF8" />
    <circle cx="115" cy="115" r="2.5" fill="#38BDF8" />
  </svg>
);

// =========================================================================
// 37. GHOST SHARK / CHIMAERA (Hydrolagus trolli)
// =========================================================================
export const GhostSharkSVG: React.FC<{ className?: string }> = ({ className = "w-52 h-32" }) => (
  <svg viewBox="0 0 190 110" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Body with stitch-like seams */}
    <path d="M25 55 C25 38, 85 35, 155 55 L185 55" stroke="#38BDF8" strokeWidth="3" fill="#1E293B" />
    <path d="M35 48 C45 42, 65 42, 75 48 M42 55 C55 58, 70 58, 85 52" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Wing pectoral fins */}
    <path d="M65 58 L50 82 L72 82 Z" fill="#334155" stroke="#1E252B" strokeWidth="2" />
    {/* Large luminous eye */}
    <circle cx="40" cy="48" r="4.5" fill="#38BDF8" stroke="#1E252B" strokeWidth="1.5" />
  </svg>
);

// =========================================================================
// 38. DUMBO OCTOPUS (Grimpoteuthis)
// =========================================================================
export const DumboOctopusSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-36" }) => (
  <svg viewBox="0 0 150 130" className={`${className} paper-cutout-dark animate-paper-float`} fill="none">
    <g className="origin-[42px_45px]">
      <path d="M42 45 C25 32, 10 40, 15 52 C20 62, 35 55, 42 48 Z" fill="#F472B6" stroke="#1E252B" strokeWidth="2.5" />
    </g>
    <g className="origin-[108px_45px]">
      <path d="M108 45 C125 32, 140 40, 135 52 C130 62, 115 55, 108 48 Z" fill="#F472B6" stroke="#1E252B" strokeWidth="2.5" />
    </g>
    <path d="M42 55 C42 25, 108 25, 108 55 C108 85, 42 85, 42 55 Z" fill="#FBCFE8" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M42 80 C25 110, 125 110, 108 80 Z" fill="#F472B6" stroke="#1E252B" strokeWidth="2.5" />
    <circle cx="62" cy="58" r="4" fill="#1E252B" />
    <circle cx="61" cy="57" r="1.5" fill="#FAF6EE" />
    <circle cx="88" cy="58" r="4" fill="#1E252B" />
    <circle cx="87" cy="57" r="1.5" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 39. BLACK DRAGONFISH (Idiacanthus antrostomus)
// =========================================================================
export const DragonfishSVG: React.FC<{ className?: string }> = ({ className = "w-56 h-28" }) => (
  <svg viewBox="0 0 210 100" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Slender ultra-black ribbon */}
    <path d="M35 48 C65 42, 135 42, 195 50" stroke="#030712" strokeWidth="4.5" strokeLinecap="round" />
    {/* Head */}
    <path d="M35 48 L15 45 L28 58 Z" fill="#030712" stroke="#1E252B" strokeWidth="2" />
    {/* Chin barbel with glowing lure */}
    <path d="M26 55 C22 72, 32 85, 42 90" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
    <circle cx="42" cy="90" r="3" fill="#22C55E" stroke="#4ADE80" strokeWidth="1.5" />
    <circle cx="28" cy="46" r="2.5" fill="#EF4444" />
  </svg>
);

// =========================================================================
// 40. INDONESIAN COELACANTH (Latimeria menadoensis)
// =========================================================================
export const CoelacanthSVG: React.FC<{ className?: string }> = ({ className = "w-56 h-36" }) => (
  <svg viewBox="0 0 200 130" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    <path d="M25 65 C25 40, 95 38, 165 65 C130 92, 95 92, 25 65 Z" fill="#1E3A8A" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M165 65 L188 45 L182 65 L188 85 Z" fill="#1E40AF" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M182 65 L198 65" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="75" cy="85" rx="8" ry="14" fill="#1D4ED8" stroke="#1E252B" strokeWidth="2" transform="rotate(-25 75 85)" />
    <ellipse cx="115" cy="85" rx="8" ry="14" fill="#1D4ED8" stroke="#1E252B" strokeWidth="2" transform="rotate(-25 115 85)" />
    <g fill="#FAF6EE" opacity="0.6">
      <circle cx="65" cy="58" r="1.5" /><circle cx="85" cy="55" r="1.5" /><circle cx="105" cy="62" r="1.5" />
    </g>
    <circle cx="45" cy="58" r="4" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
    <circle cx="45" cy="58" r="2" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 41. TRIPOD FISH (Bathypterois grallator)
// =========================================================================
export const TripodFishSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-52" }) => (
  <svg viewBox="0 0 170 190" className={`${className} paper-cutout-dark animate-paper-float`} fill="none">
    <path d="M55 75 L40 180 M85 75 L75 180" stroke="#EAA838" strokeWidth="3" strokeLinecap="round" />
    <path d="M135 68 L155 180" stroke="#EAA838" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 68 C30 52, 85 50, 135 68 C95 82, 30 82, 30 68 Z" fill="#1E252B" stroke="#FAF6EE" strokeWidth="2.5" />
    <path d="M45 62 L32 30 M52 62 L42 28" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 42. ABYSSAL SEA PIG (Scotoplanes globosa)
// =========================================================================
export const SeaPigSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-32" }) => (
  <svg viewBox="0 0 160 110" className={`${className} paper-cutout-dark animate-crab-scuttle`} fill="none">
    {/* Translucent pink bloated body */}
    <ellipse cx="80" cy="50" rx="45" ry="25" fill="#FBCFE8" fillOpacity="0.75" stroke="#F472B6" strokeWidth="3" />
    {/* Hydraulic tube legs */}
    <path d="M50 72 L45 96 M65 74 L62 98 M85 75 L85 98 M105 74 L108 96" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
    {/* Dorsal antennae feelers */}
    <path d="M65 26 L60 8 M95 26 L100 8" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
    <circle cx="60" cy="8" r="3" fill="#DB2777" />
    <circle cx="100" cy="8" r="3" fill="#DB2777" />
  </svg>
);

// =========================================================================
// 43. FACELESS CUSK EEL (Typhlonus nasus)
// =========================================================================
export const FacelessCuskSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-28" }) => (
  <svg viewBox="0 0 180 100" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Smooth faceless bulbous body */}
    <path d="M25 50 C25 28, 85 30, 155 50 C125 72, 85 75, 25 50 Z" fill="#E2E8F0" fillOpacity="0.8" stroke="#94A3B8" strokeWidth="3" />
    {/* Underslung mouth */}
    <path d="M42 62 C38 68, 50 72, 54 62 Z" fill="#475569" stroke="#1E252B" strokeWidth="1.5" />
  </svg>
);

// =========================================================================
// 44. GIANT ISOPOD (Bathynomus giganteus)
// =========================================================================
export const GiantIsopodSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-32" }) => (
  <svg viewBox="0 0 180 115" className={`${className} paper-cutout-dark animate-crab-scuttle`} fill="none">
    {/* Multi-segmented armored plates */}
    <ellipse cx="90" cy="55" rx="55" ry="32" fill="#D6D3D1" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M55 35 L58 75 M72 28 L74 82 M90 24 L90 86 M108 28 L106 82 M125 35 L122 75" stroke="#78716C" strokeWidth="2.5" />
    {/* 14 crawling legs */}
    <path d="M60 82 L52 102 M75 85 L70 105 M90 86 L88 106 M105 85 L108 105 M120 82 L126 102" stroke="#44403C" strokeWidth="3" strokeLinecap="round" />
    {/* Glowing golden eyes */}
    <polygon points="40,48 48,44 48,54" fill="#FACC15" stroke="#1E252B" strokeWidth="1.5" />
  </svg>
);

// =========================================================================
// 45. ABYSSAL COMB JELLY / CTENOPHORE (Beroe abyssicola)
// =========================================================================
export const AbyssalCtenophoreSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-44" }) => (
  <svg viewBox="0 0 150 170" className={`${className} paper-cutout-dark animate-jelly-pulse`} fill="none">
    {/* Vase crystalline body */}
    <path d="M45 40 C45 15, 105 15, 105 40 C105 95, 95 135, 75 145 C55 135, 45 95, 45 40 Z" fill="#F8FAFC" fillOpacity="0.35" stroke="#E2E8F0" strokeWidth="3" />
    {/* Rainbow diffraction comb rows */}
    <path d="M55 42 Q 52 85, 68 135" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="3 3" />
    <path d="M68 38 Q 66 85, 74 140" stroke="#34D399" strokeWidth="2.5" strokeDasharray="3 3" />
    <path d="M82 38 Q 84 85, 76 140" stroke="#F472B6" strokeWidth="2.5" strokeDasharray="3 3" />
    <path d="M95 42 Q 98 85, 82 135" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="3 3" />
  </svg>
);

// =========================================================================
// 46. MARIANA SNAILFISH (Pseudoliparis swirei)
// =========================================================================
export const MarianaSnailfishSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-32" }) => (
  <svg viewBox="0 0 190 120" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    <g className="origin-[110px_60px]">
      <path d="M110 60 C140 45, 160 70, 185 58 C165 78, 140 68, 110 60 Z" fill="#FCE7F3" fillOpacity="0.75" stroke="#F43F5E" strokeWidth="2.5" />
    </g>
    <path d="M30 60 C30 35, 90 35, 115 60 C90 85, 30 85, 30 60 Z" fill="#FCE7F3" fillOpacity="0.85" stroke="#F43F5E" strokeWidth="3" />
    <ellipse cx="65" cy="60" rx="15" ry="10" fill="#FDA4AF" opacity="0.6" />
    <path d="M55 68 C45 92, 85 95, 75 68 Z" fill="#FCE7F3" stroke="#F43F5E" strokeWidth="2" />
    <circle cx="42" cy="54" r="2.5" fill="#881337" />
  </svg>
);

// =========================================================================
// 47. HADAL SUPERGIANT AMPHIPOD (Alicella gigantea)
// =========================================================================
export const HadalAmphipodSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-32" }) => (
  <svg viewBox="0 0 160 120" className={`${className} paper-cutout-dark animate-crab-scuttle`} fill="none">
    <g className="origin-[80px_60px]">
      <path d="M40 50 C40 30, 80 25, 115 45 C125 55, 125 75, 110 90 L100 80 C110 68, 105 55, 95 48 C75 35, 55 42, 50 62 Z" fill="#F4ECE1" stroke="#EAA838" strokeWidth="2.5" />
      <path d="M60 38 L65 58" stroke="#1E252B" strokeWidth="2" />
      <path d="M78 35 L82 58" stroke="#1E252B" strokeWidth="2" />
      <path d="M96 38 L98 62" stroke="#1E252B" strokeWidth="2" />
      <path d="M110 46 L108 72" stroke="#1E252B" strokeWidth="2" />
      <path d="M38 52 C25 45, 15 35, 8 20" stroke="#EAA838" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 56 C22 55, 12 50, 5 40" stroke="#EAA838" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 62 L50 85 L42 98 M72 64 L65 88 L58 102 M84 68 L80 92 L75 106 M96 74 L95 96 L92 110" stroke="#1E252B" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// =========================================================================
// 48. ETHEREAL SNAILFISH (Careproctus hadalis)
// =========================================================================
export const EtherealSnailfishSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-30" }) => (
  <svg viewBox="0 0 180 110" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Ghostly white body */}
    <path d="M30 55 C30 32, 85 35, 115 55 C145 45, 165 65, 175 55 C160 72, 135 65, 115 55 C85 78, 30 75, 30 55 Z" fill="#F8FAFC" fillOpacity="0.9" stroke="#E2E8F0" strokeWidth="2.5" />
    {/* Suction disk pelvic fin */}
    <ellipse cx="65" cy="68" rx="8" ry="4" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="44" cy="50" r="2" fill="#64748B" />
  </svg>
);

// =========================================================================
// 49. HADAL SEA CUCUMBER (Elpidia belyaevi)
// =========================================================================
export const HadalCucumberSVG: React.FC<{ className?: string }> = ({ className = "w-36 h-24" }) => (
  <svg viewBox="0 0 140 90" className={`${className} paper-cutout-dark animate-crab-scuttle`} fill="none">
    <ellipse cx="70" cy="45" rx="42" ry="18" fill="#F1F5F9" fillOpacity="0.85" stroke="#94A3B8" strokeWidth="2.5" />
    {/* Feeding tentacle crown */}
    <path d="M30 45 L18 36 M30 47 L16 45 M30 49 L18 54" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Stubby walking feet */}
    <path d="M50 63 L48 76 M68 63 L68 76 M88 63 L90 76 M102 61 L106 74" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 50. GIANT XENOPHYOPHORE (Syringammina fragilissima)
// =========================================================================
export const XenophyophoreSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-44" }) => (
  <svg viewBox="0 0 160 160" className={`${className} paper-cutout-dark animate-paper-float`} fill="none">
    {/* Agglutinated test labyrinth */}
    <circle cx="80" cy="80" r="48" fill="#78716C" fillOpacity="0.4" stroke="#A8A29E" strokeWidth="2" strokeDasharray="4 3" />
    <path d="M55 60 C65 50, 75 65, 85 55 C95 45, 105 60, 115 50" stroke="#D6D3D1" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 80 C60 70, 75 90, 85 78 C100 85, 110 75, 120 85" stroke="#D6D3D1" strokeWidth="3" strokeLinecap="round" />
    <path d="M55 100 C65 110, 80 95, 95 108 C105 100, 115 110, 112 120" stroke="#D6D3D1" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 51. CHALLENGER DEEP TUBE WORM (Oasisia hadalis)
// =========================================================================
export const HadalTubewormSVG: React.FC<{ className?: string }> = ({ className = "w-36 h-52" }) => (
  <svg viewBox="0 0 130 200" className={`${className} paper-cutout-dark animate-jelly-pulse`} fill="none">
    {/* White chitinous tube */}
    <path d="M55 70 L52 185 L78 185 L75 70 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="3" />
    <path d="M54 110 L76 110 M53 145 L77 145" stroke="#CBD5E1" strokeWidth="2" />
    {/* Crimson vascular branchial plume */}
    <path d="M65 70 C50 40, 52 20, 65 12 C78 20, 80 40, 65 70 Z" fill="#DC2626" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M65 65 L65 22" stroke="#FCA5A5" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
