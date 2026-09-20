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
    {/* Walking Legs Left */}
    <g className="origin-[60px_60px]">
      <path d="M60 62 L32 50 L14 68" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 68 L28 66 L12 84" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 74 L36 82 L24 100" stroke="#D95A47" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Walking Legs Right */}
    <g className="origin-[100px_60px]">
      <path d="M100 62 L128 50 L146 68" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 68 L132 66 L148 84" stroke="#D95A47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 74 L124 82 L136 100" stroke="#D95A47" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Main Pincers Left */}
    <g className="origin-[52px_50px]">
      <path d="M54 52 L36 34 L32 20 C24 22, 22 34, 30 40 Z" fill="#EAA838" stroke="#B8781B" strokeWidth="2.5" />
    </g>
    {/* Main Pincers Right */}
    <g className="origin-[108px_50px]">
      <path d="M106 52 L126 30 L134 16 C144 20, 146 34, 132 44 Z" fill="#D95A47" stroke="#A93B2B" strokeWidth="2.5" />
    </g>

    {/* Crab Shell Carapace */}
    <path d="M52 46 C52 38, 108 38, 108 46 C112 65, 110 82, 80 84 C50 82, 48 65, 52 46 Z" fill="#F4ECE1" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M60 52 C70 56, 90 56, 100 52" stroke="#EAA838" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="70" cy="64" r="3" fill="#D95A47" />
    <circle cx="90" cy="64" r="3" fill="#D95A47" />

    {/* Periscope Eyestalks */}
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
      <path d="M5 32 L18 25 L16 35 Z" fill="#1E252B" />
    </g>
    <g className="origin-[70px_45px]">
      <path d="M70 45 C90 20, 122 18, 135 32 C120 40, 92 42, 70 45 Z" fill="#DDE7E8" stroke="#1E252B" strokeWidth="2.5" />
      <path d="M135 32 L122 25 L124 35 Z" fill="#1E252B" />
    </g>
    <path d="M55 52 C55 35, 85 35, 85 52 C85 64, 78 72, 70 78 C62 72, 55 64, 55 52 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="3" />
    <path d="M64 76 L70 88 L76 76 Z" fill="#1E252B" />
    <path d="M68 40 L70 28 L72 40 Z" fill="#EAA838" stroke="#1E252B" strokeWidth="1.5" />
    <circle cx="71" cy="34" r="1.5" fill="#D95A47" />
    <circle cx="66" cy="44" r="2" fill="#1E252B" />
    <circle cx="74" cy="44" r="2" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 4. CLOWNFISH & ANEMONE (Sunlight · Amphiprion ocellaris)
// =========================================================================
export const ClownfishAnemoneSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-36" }) => (
  <svg viewBox="0 0 180 140" className={`${className} paper-cutout`} fill="none">
    {/* Anemone Stalks */}
    <g className="origin-[90px_130px]">
      <path d="M30 135 C30 90, 45 60, 40 40" stroke="#D95A47" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
      <path d="M55 135 C60 95, 50 65, 62 48" stroke="#EAA838" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
      <path d="M80 135 C78 90, 92 65, 88 35" stroke="#E06D53" strokeWidth="8" strokeLinecap="round" />
      <path d="M105 135 C115 100, 102 70, 114 42" stroke="#EAA838" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
      <path d="M130 135 C125 95, 140 70, 136 38" stroke="#D95A47" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
    </g>

    {/* Clownfish Swimming with Fish Tail Kick */}
    <g className="animate-fish-tail origin-[85px_75px]">
      <path d="M75 58 C85 50, 110 52, 115 62 Z" fill="#D95A47" stroke="#1E252B" strokeWidth="2" />
      <path d="M55 75 C55 60, 115 58, 130 75 C115 92, 55 90, 55 75 Z" fill="#E06D53" stroke="#1E252B" strokeWidth="3" />
      <path d="M72 61 C76 70, 76 80, 72 89 C67 89, 67 61, 72 61 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
      <path d="M96 60 C101 70, 101 80, 96 90 C91 90, 91 60, 96 60 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
      <path d="M120 68 C123 72, 123 78, 120 82 C117 82, 117 68, 120 68 Z" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
      <path d="M130 75 L144 64 L142 86 Z" fill="#E06D53" stroke="#1E252B" strokeWidth="2" />
      <circle cx="63" cy="72" r="3" fill="#1E252B" />
      <circle cx="62" cy="71" r="1" fill="#FAF6EE" />
    </g>
  </svg>
);

// =========================================================================
// 5. GREEN SEA TURTLE (Sunlight · Chelonia mydas)
// =========================================================================
export const GreenTurtleSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-36" }) => (
  <svg viewBox="0 0 190 140" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Front Left Flipper (Paddle Stroke Cycle) */}
    <g className="animate-turtle-flipper origin-[85px_55px]">
      <path d="M90 60 C80 30, 45 10, 25 18 C15 32, 50 65, 85 70 Z" fill="#6D9886" stroke="#1E252B" strokeWidth="3" />
      <path d="M35 24 L55 45" stroke="#FAF6EE" strokeWidth="2" strokeDasharray="3 3" />
    </g>

    {/* Front Right Flipper */}
    <g className="animate-turtle-flipper-rev origin-[135px_55px]">
      <path d="M130 60 C140 30, 175 10, 195 18 C205 32, 170 65, 135 70 Z" fill="#6D9886" stroke="#1E252B" strokeWidth="3" />
      <path d="M185 24 L165 45" stroke="#FAF6EE" strokeWidth="2" strokeDasharray="3 3" />
    </g>

    {/* Rear Flippers */}
    <path d="M80 105 L60 125 C58 132, 70 135, 78 128 L90 110 Z" fill="#507B6C" stroke="#1E252B" strokeWidth="2.5" />
    <path d="M140 105 L160 125 C162 132, 150 135, 142 128 L130 110 Z" fill="#507B6C" stroke="#1E252B" strokeWidth="2.5" />

    {/* Head & Neck */}
    <path d="M102 52 C98 32, 122 32, 118 52 Z" fill="#6D9886" stroke="#1E252B" strokeWidth="3" />
    <circle cx="106" cy="38" r="2.5" fill="#1E252B" />
    <circle cx="114" cy="38" r="2.5" fill="#1E252B" />

    {/* Shell Carapace */}
    <ellipse cx="110" cy="85" rx="38" ry="32" fill="#EAA838" stroke="#1E252B" strokeWidth="3.5" />
    <path d="M110 58 L122 72 L122 92 L110 108 L98 92 L98 72 Z" fill="#D95A47" stroke="#1E252B" strokeWidth="2" />
    <path d="M98 72 L78 78 L80 96 L98 92" fill="#2F6D68" stroke="#1E252B" strokeWidth="2" />
    <path d="M122 72 L142 78 L140 96 L122 92" fill="#2F6D68" stroke="#1E252B" strokeWidth="2" />
  </svg>
);

// =========================================================================
// 6. LION'S MANE JELLYFISH (Sunlight · Cyanea capillata) - NEW!
// =========================================================================
export const LionsManeJellySVG: React.FC<{ className?: string }> = ({ className = "w-44 h-52" }) => (
  <svg viewBox="0 0 170 200" className={`${className} paper-cutout animate-jelly-pulse`} fill="none">
    {/* Scalloped Upper Bell Dome */}
    <path 
      d="M35 75 C35 30, 135 30, 135 75 C125 85, 110 80, 100 85 C90 80, 80 80, 70 85 C60 80, 45 85, 35 75 Z" 
      fill="#D95A47" 
      stroke="#1E252B" 
      strokeWidth="3" 
    />
    <path d="M50 48 C70 42, 100 42, 120 48" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />

    {/* Oral Arms (Crimson Frills) */}
    <path d="M55 80 C48 115, 65 140, 58 175" stroke="#EAA838" strokeWidth="4" strokeLinecap="round" />
    <path d="M72 82 C65 125, 82 150, 74 185" stroke="#D95A47" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M85 82 C85 130, 95 155, 88 190" stroke="#E06D53" strokeWidth="5" strokeLinecap="round" />
    <path d="M98 82 C105 125, 90 150, 96 185" stroke="#D95A47" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M115 80 C122 115, 105 140, 112 175" stroke="#EAA838" strokeWidth="4" strokeLinecap="round" />

    {/* Trailing Filament Streamers */}
    <g className="animate-tentacle-drift origin-[85px_85px]" opacity="0.6">
      <path d="M42 80 L38 185" stroke="#1E252B" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M62 82 L60 195" stroke="#1E252B" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M108 82 L110 195" stroke="#1E252B" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M128 80 L132 185" stroke="#1E252B" strokeWidth="1.5" strokeDasharray="4 3" />
    </g>
  </svg>
);

// =========================================================================
// 7. MANTA RAY (Sunlight · Mobula birostris)
// =========================================================================
export const MantaRaySVG: React.FC<{ className?: string }> = ({ className = "w-52 h-36" }) => (
  <svg viewBox="0 0 210 140" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Left Wing Undulation */}
    <g className="animate-manta-left origin-[105px_65px]">
      <path d="M105 65 L40 75 L5 55 C20 85, 65 95, 105 88 Z" fill="#1F3144" stroke="#0E1720" strokeWidth="3" />
    </g>
    {/* Right Wing Undulation */}
    <g className="animate-manta-right origin-[105px_65px]">
      <path d="M105 65 L170 75 L205 55 C190 85, 145 95, 105 88 Z" fill="#1F3144" stroke="#0E1720" strokeWidth="3" />
    </g>

    {/* Central Diamond Body */}
    <path d="M105 38 L130 65 L105 92 L80 65 Z" fill="#2C4251" stroke="#0E1720" strokeWidth="3" />
    <path d="M92 40 C88 28, 96 22, 98 35 Z" fill="#FAF6EE" stroke="#0E1720" strokeWidth="2" />
    <path d="M118 40 C122 28, 114 22, 112 35 Z" fill="#FAF6EE" stroke="#0E1720" strokeWidth="2" />
    <path d="M105 92 L105 135" stroke="#0E1720" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 8. BLUE WHALE (Sunlight · Balaenoptera musculus) - NEW!
// =========================================================================
export const BlueWhaleSVG: React.FC<{ className?: string }> = ({ className = "w-72 h-36" }) => (
  <svg viewBox="0 0 280 130" className={`${className} paper-cutout animate-whale-fluke`} fill="none">
    {/* Massive Fluke Tail at Right */}
    <g className="origin-[220px_65px]">
      <path d="M220 65 L260 32 C268 45, 255 65, 275 65 C255 65, 268 85, 260 98 Z" fill="#2C4251" stroke="#0E1720" strokeWidth="3" />
    </g>

    {/* Colossal Streamlined Blue-Gray Body */}
    <path 
      d="M20 65 C30 40, 160 38, 225 65 C160 88, 30 85, 20 65 Z" 
      fill="#3A506B" 
      stroke="#0E1720" 
      strokeWidth="3.5" 
    />

    {/* Ventral Throat Pleats (Accordion Grooves) */}
    <path d="M35 70 C70 82, 110 82, 140 76" stroke="#FAF6EE" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M40 74 C75 86, 115 86, 145 78" stroke="#FAF6EE" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M45 78 C80 90, 120 90, 150 80" stroke="#FAF6EE" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Tiny Dorsal Fin set far back */}
    <path d="M195 48 L205 35 L212 50 Z" fill="#2C4251" stroke="#0E1720" strokeWidth="2" />

    {/* Long Tapered Pectoral Flipper */}
    <path d="M90 74 L75 105 L95 95 Z" fill="#2C4251" stroke="#0E1720" strokeWidth="2.5" />

    {/* Blowhole & Eye */}
    <path d="M50 42 L52 44" stroke="#FAF6EE" strokeWidth="3" strokeLinecap="round" />
    <circle cx="48" cy="58" r="2.5" fill="#0E1720" />
  </svg>
);

// =========================================================================
// 9. WHALE SHARK (Sunlight · Rhincodon typus)
// =========================================================================
export const WhaleSharkSVG: React.FC<{ className?: string }> = ({ className = "w-64 h-36" }) => (
  <svg viewBox="0 0 250 130" className={`${className} paper-cutout animate-fish-tail`} fill="none">
    <g className="origin-[190px_65px]">
      <path d="M190 65 L225 35 L220 65 L245 85 L215 75 Z" fill="#2C4251" stroke="#111A24" strokeWidth="3" />
    </g>
    <path d="M30 65 C40 45, 140 42, 195 65 C140 88, 40 85, 30 65 Z" fill="#3B5366" stroke="#111A24" strokeWidth="3.5" />
    <path d="M30 58 L30 72" stroke="#111A24" strokeWidth="4" strokeLinecap="round" />
    <circle cx="44" cy="52" r="2.5" fill="#111A24" />
    <path d="M80 72 L65 105 L95 90 Z" fill="#2C4251" stroke="#111A24" strokeWidth="2.5" />
    <path d="M125 45 L140 22 L150 47 Z" fill="#2C4251" stroke="#111A24" strokeWidth="2.5" />

    {/* Star Dots */}
    <circle cx="70" cy="55" r="2" fill="#FAF6EE" />
    <circle cx="85" cy="52" r="2" fill="#FAF6EE" />
    <circle cx="100" cy="50" r="2" fill="#FAF6EE" />
    <circle cx="115" cy="53" r="2" fill="#FAF6EE" />
    <circle cx="130" cy="55" r="2" fill="#FAF6EE" />
    <circle cx="145" cy="58" r="2" fill="#FAF6EE" />
    <circle cx="160" cy="62" r="2" fill="#FAF6EE" />
    <circle cx="75" cy="65" r="2" fill="#FAF6EE" />
    <circle cx="90" cy="63" r="2" fill="#FAF6EE" />
    <circle cx="105" cy="62" r="2" fill="#FAF6EE" />
    <circle cx="120" cy="64" r="2" fill="#FAF6EE" />
    <circle cx="135" cy="65" r="2" fill="#FAF6EE" />
  </svg>
);

// =========================================================================
// 10. GIANT PACIFIC OCTOPUS (Twilight · Enteroctopus dofleini) - NEW!
// =========================================================================
export const GiantOctopusSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-44" }) => (
  <svg viewBox="0 0 180 160" className={`${className} paper-cutout animate-paper-float`} fill="none">
    {/* Large Round Mantle */}
    <path d="M60 55 C60 25, 120 25, 120 55 C120 78, 60 78, 60 55 Z" fill="#D95A47" stroke="#1E252B" strokeWidth="3" />

    {/* Eyes with Horizontal Slit Pupils */}
    <circle cx="75" cy="68" r="5" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
    <rect x="72" y="67" width="6" height="2" fill="#1E252B" />

    <circle cx="105" cy="68" r="5" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
    <rect x="102" y="67" width="6" height="2" fill="#1E252B" />

    {/* 8 Curled Tentacles with Suction Cups */}
    <g className="animate-tentacle-drift origin-[90px_75px]">
      <path d="M65 75 C45 95, 25 110, 32 135 C38 145, 52 135, 48 120" stroke="#D95A47" strokeWidth="6" strokeLinecap="round" />
      <path d="M78 78 C65 105, 55 125, 68 150 C75 155, 82 145, 78 130" stroke="#EAA838" strokeWidth="6" strokeLinecap="round" />
      <path d="M90 78 C90 108, 92 135, 95 155 C100 155, 102 142, 98 125" stroke="#D95A47" strokeWidth="6" strokeLinecap="round" />
      <path d="M102 78 C115 105, 125 125, 112 150 C105 155, 98 145, 102 130" stroke="#EAA838" strokeWidth="6" strokeLinecap="round" />
      <path d="M115 75 C135 95, 155 110, 148 135 C142 145, 128 135, 132 120" stroke="#D95A47" strokeWidth="6" strokeLinecap="round" />
    </g>
  </svg>
);

// =========================================================================
// 11. GIANT OARFISH (Twilight · Regalecus glesne)
// =========================================================================
export const GiantOarfishSVG: React.FC<{ className?: string }> = ({ className = "w-60 h-28" }) => (
  <svg viewBox="0 0 240 100" className={`${className} paper-cutout animate-fish-tail`} fill="none">
    <g className="origin-[35px_30px]">
      <path d="M35 38 L25 10 L30 36 L40 8 L42 36 L52 14 L48 38" stroke="#D95A47" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <path 
      d="M30 45 C70 30, 110 60, 150 45 C180 35, 210 55, 235 48 C210 60, 180 45, 150 55 C110 70, 70 40, 30 55 Z" 
      fill="#DDE7E8" 
      stroke="#1E252B" 
      strokeWidth="3" 
    />
    <path d="M35 38 C70 25, 110 52, 150 38 C180 30, 210 48, 235 44" stroke="#D95A47" strokeWidth="3.5" strokeDasharray="4 2" />
    <path d="M42 55 L35 85 C32 90, 42 90, 38 85 L44 55" stroke="#D95A47" strokeWidth="2" fill="#D95A47" />
    <circle cx="34" cy="46" r="3" fill="#1E252B" />
  </svg>
);

// =========================================================================
// 12. BARRELEYE FISH (Twilight · Macropinna microstoma)
// =========================================================================
export const BarreleyeSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-32" }) => (
  <svg viewBox="0 0 170 120" className={`${className} paper-cutout animate-paper-float`} fill="none">
    <g className="animate-fish-tail origin-[130px_60px]">
      <path d="M130 60 L155 42 L150 60 L158 78 Z" fill="#1F3144" stroke="#0E1720" strokeWidth="2.5" />
    </g>
    <path d="M70 40 C100 38, 125 45, 132 60 C125 75, 100 82, 70 80 Z" fill="#1F3144" stroke="#0E1720" strokeWidth="3" />
    <path d="M85 75 L70 102 L95 90 Z" fill="#2C4251" stroke="#0E1720" strokeWidth="2" />
    <path d="M30 65 C30 35, 75 30, 78 65 C78 75, 60 78, 30 75 Z" fill="#6BB7B9" fillOpacity="0.3" stroke="#FAF6EE" strokeWidth="2.5" />

    <g className="animate-bulb-flicker">
      <ellipse cx="52" cy="48" rx="6" ry="8" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
      <circle cx="52" cy="45" r="3" fill="#064E3B" />
      <ellipse cx="64" cy="48" rx="6" ry="8" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
      <circle cx="64" cy="45" r="3" fill="#064E3B" />
    </g>
  </svg>
);

// =========================================================================
// 13. GLASS SQUID (Twilight · Taonius borealis)
// =========================================================================
export const GlassSquidSVG: React.FC<{ className?: string }> = ({ className = "w-36 h-48" }) => (
  <svg viewBox="0 0 140 180" className={`${className} paper-cutout animate-jelly-pulse`} fill="none">
    <path d="M70 20 L50 35 L70 30 L90 35 Z" fill="#FAF6EE" fillOpacity="0.6" stroke="#2C4251" strokeWidth="2" />
    <path d="M70 22 C50 50, 42 100, 52 125 C62 135, 78 135, 88 125 C98 100, 90 50, 70 22 Z" fill="#FAF6EE" fillOpacity="0.25" stroke="#2C4251" strokeWidth="2.5" />
    <ellipse cx="70" cy="85" rx="5" ry="18" fill="#D95A47" opacity="0.8" />
    <circle cx="50" cy="130" r="6" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
    <circle cx="50" cy="130" r="2.5" fill="#1E252B" />
    <circle cx="90" cy="130" r="6" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
    <circle cx="90" cy="130" r="2.5" fill="#1E252B" />

    <g className="origin-[70px_135px]">
      <path d="M58 135 C52 150, 62 165, 55 175" stroke="#2C4251" strokeWidth="2" strokeLinecap="round" />
      <path d="M66 135 C64 152, 70 168, 65 180" stroke="#2C4251" strokeWidth="2" strokeLinecap="round" />
      <path d="M74 135 C76 152, 70 168, 75 180" stroke="#2C4251" strokeWidth="2" strokeLinecap="round" />
      <path d="M82 135 C88 150, 78 165, 85 175" stroke="#2C4251" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// =========================================================================
// 14. SLOANE'S VIPERFISH (Midnight · Chauliodus sloani) - NEW!
// =========================================================================
export const ViperfishSVG: React.FC<{ className?: string }> = ({ className = "w-52 h-32" }) => (
  <svg viewBox="0 0 200 110" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Tail fin */}
    <g className="origin-[160px_55px]">
      <path d="M160 55 L185 38 L180 55 L188 72 Z" fill="#0F172A" stroke="#FAF6EE" strokeWidth="2.5" />
    </g>

    {/* Slender Dark Elongated Body with Photophore Rows */}
    <path d="M45 55 C70 48, 140 48, 162 55 C140 64, 70 64, 45 55 Z" fill="#0F172A" stroke="#FAF6EE" strokeWidth="3" />

    {/* Rows of Ventral Photophores (Bioluminescent Dots) */}
    <circle cx="65" cy="58" r="1.5" fill="#38BDF8" className="animate-bulb-flicker" />
    <circle cx="80" cy="58" r="1.5" fill="#38BDF8" className="animate-bulb-flicker" />
    <circle cx="95" cy="58" r="1.5" fill="#38BDF8" className="animate-bulb-flicker" />
    <circle cx="110" cy="58" r="1.5" fill="#38BDF8" className="animate-bulb-flicker" />
    <circle cx="125" cy="58" r="1.5" fill="#38BDF8" className="animate-bulb-flicker" />
    <circle cx="140" cy="58" r="1.5" fill="#38BDF8" className="animate-bulb-flicker" />

    {/* Long Dorsal Ray with Lure at Tip */}
    <path d="M60 48 C70 20, 95 18, 110 32" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
    <circle cx="110" cy="32" r="3" fill="#38BDF8" className="animate-bulb-flicker" />

    {/* Gaping Head & Massive Curved Needle Fangs Extending Outside Skull */}
    <path d="M45 55 L25 45 L15 55 L25 65 Z" fill="#0F172A" stroke="#FAF6EE" strokeWidth="3" />
    {/* Upper Fangs curling DOWN past lower jaw */}
    <path d="M22 45 L18 72" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 47 L26 68" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
    {/* Lower Fangs curling UP past eye */}
    <path d="M20 65 L16 38" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M26 63 L24 42" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />

    {/* Large Blue Eye */}
    <circle cx="32" cy="50" r="3.5" fill="#38BDF8" stroke="#FAF6EE" strokeWidth="1.5" />
    <circle cx="32" cy="50" r="1.5" fill="#0F172A" />
  </svg>
);

// =========================================================================
// 15. HUMPBACK ANGLERFISH (Midnight · Melanocetus johnsonii)
// =========================================================================
export const AnglerfishSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-40" }) => (
  <svg viewBox="0 0 190 150" className={`${className} paper-cutout-dark animate-paper-float`} fill="none">
    {/* Fishing Rod Stalk */}
    <path d="M75 52 C70 25, 42 18, 48 30" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" />
    {/* Glowing Esca */}
    <circle cx="48" cy="32" r="6" fill="#EAA838" className="animate-bulb-flicker" />
    <circle cx="48" cy="32" r="12" fill="#EAA838" fillOpacity="0.25" className="animate-bulb-flicker" />

    {/* Globular Body */}
    <path d="M75 52 C115 48, 140 65, 145 85 C145 110, 95 125, 65 110 C50 95, 45 75, 75 52 Z" fill="#141C24" stroke="#FAF6EE" strokeWidth="3" />

    {/* Gaping Jaw & Teeth */}
    <path d="M48 78 L90 85 L52 105" stroke="#FAF6EE" strokeWidth="3" strokeLinejoin="round" />
    <path d="M54 78 L56 87 M62 79 L64 91 M72 81 L73 90 M80 83 L81 88" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 102 L60 92 M68 98 L69 88 M78 93 L79 86" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />

    <circle cx="68" cy="65" r="2.5" fill="#FAF6EE" />
    <g className="origin-[145px_85px]">
      <path d="M145 85 L170 70 L165 85 L172 100 Z" fill="#141C24" stroke="#FAF6EE" strokeWidth="2" />
    </g>
  </svg>
);

// =========================================================================
// 16. GULPER EEL (Midnight · Eurypharynx pelecanoides)
// =========================================================================
export const GulperEelSVG: React.FC<{ className?: string }> = ({ className = "w-56 h-36" }) => (
  <svg viewBox="0 0 220 130" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    <path d="M25 45 C45 28, 90 28, 105 45 L95 85 C65 95, 30 85, 25 45 Z" fill="#E06D53" fillOpacity="0.4" stroke="#FAF6EE" strokeWidth="2.5" />
    <path d="M25 45 L105 45" stroke="#FAF6EE" strokeWidth="3" />
    <path d="M25 45 L95 85" stroke="#FAF6EE" strokeWidth="3" />
    <circle cx="28" cy="42" r="2" fill="#FAF6EE" />

    <path d="M100 55 C130 50, 150 75, 175 65 C195 55, 205 75, 215 70" stroke="#FAF6EE" strokeWidth="3" strokeLinecap="round" />
    <circle cx="215" cy="70" r="4" fill="#F43F5E" className="animate-bulb-flicker" />
  </svg>
);

// =========================================================================
// 17. GIANT SQUID (Midnight · Architeuthis dux) - NEW!
// =========================================================================
export const GiantSquidSVG: React.FC<{ className?: string }> = ({ className = "w-60 h-44" }) => (
  <svg viewBox="0 0 240 160" className={`${className} paper-cutout-dark animate-jelly-pulse`} fill="none">
    {/* Triangular Mantle Fin */}
    <path d="M30 80 L65 52 L65 108 Z" fill="#991B1B" stroke="#FAF6EE" strokeWidth="2.5" />

    {/* Long Torpedo Mantle */}
    <path d="M60 55 C90 55, 130 62, 145 80 C130 98, 90 105, 60 105 Z" fill="#7F1D1D" stroke="#FAF6EE" strokeWidth="3.5" />

    {/* Huge Dinner-Plate Eye (27cm) */}
    <circle cx="140" cy="74" r="9" fill="#F8FAFC" stroke="#FAF6EE" strokeWidth="2" />
    <circle cx="140" cy="74" r="5" fill="#090D14" />
    <circle cx="142" cy="72" r="2" fill="#38BDF8" />

    {/* Arms Cluster */}
    <path d="M145 74 C165 68, 185 65, 205 60" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" />
    <path d="M145 78 C170 76, 195 75, 215 72" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
    <path d="M145 82 C170 85, 195 85, 215 88" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
    <path d="M145 86 C165 92, 185 95, 205 100" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" />

    {/* Two Extra Long Feeding Tentacles */}
    <g className="animate-tentacle-drift origin-[145px_80px]">
      <path d="M145 76 C180 70, 210 55, 235 52 L238 48" stroke="#FAF6EE" strokeWidth="3" strokeLinecap="round" />
      <path d="M145 84 C180 90, 210 105, 235 108 L238 112" stroke="#FAF6EE" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// =========================================================================
// 18. VAMPIRE SQUID (Midnight · Vampyroteuthis infernalis)
// =========================================================================
export const VampireSquidSVG: React.FC<{ className?: string }> = ({ className = "w-44 h-44" }) => (
  <svg viewBox="0 0 160 160" className={`${className} paper-cutout-dark animate-jelly-pulse`} fill="none">
    <g className="origin-[60px_45px]">
      <path d="M60 45 L35 32 L45 52 Z" fill="#881337" stroke="#FAF6EE" strokeWidth="2" />
    </g>
    <g className="origin-[100px_45px]">
      <path d="M100 45 L125 32 L115 52 Z" fill="#881337" stroke="#FAF6EE" strokeWidth="2" />
    </g>
    <path d="M60 45 C60 25, 100 25, 100 45 L108 75 L52 75 Z" fill="#4C0519" stroke="#FAF6EE" strokeWidth="3" />
    <circle cx="62" cy="72" r="8" fill="#38BDF8" stroke="#FAF6EE" strokeWidth="2" />
    <circle cx="62" cy="72" r="3" fill="#0C4A6E" />
    <circle cx="98" cy="72" r="8" fill="#38BDF8" stroke="#FAF6EE" strokeWidth="2" />
    <circle cx="98" cy="72" r="3" fill="#0C4A6E" />

    <g className="origin-[80px_75px]">
      <path 
        d="M52 75 C45 105, 30 135, 38 145 C50 120, 60 115, 68 145 C78 120, 82 120, 92 145 C100 115, 110 120, 122 145 C130 135, 115 105, 108 75 Z" 
        fill="#881337" 
        stroke="#FAF6EE" 
        strokeWidth="3" 
      />
      <circle cx="38" cy="144" r="3" fill="#38BDF8" className="animate-bulb-flicker" />
      <circle cx="68" cy="144" r="3" fill="#38BDF8" className="animate-bulb-flicker" />
      <circle cx="92" cy="144" r="3" fill="#38BDF8" className="animate-bulb-flicker" />
      <circle cx="122" cy="144" r="3" fill="#38BDF8" className="animate-bulb-flicker" />
    </g>
  </svg>
);

// =========================================================================
// 19. COELACANTH (Midnight · Latimeria chalumnae) - NEW!
// =========================================================================
export const CoelacanthSVG: React.FC<{ className?: string }> = ({ className = "w-56 h-36" }) => (
  <svg viewBox="0 0 220 130" className={`${className} paper-cutout-dark animate-fish-tail`} fill="none">
    {/* Unique Tri-Lobed Caudal Tail */}
    <g className="origin-[165px_65px]">
      <path d="M165 65 L195 40 L190 60 L208 65 L190 70 L195 90 Z" fill="#1E293B" stroke="#FAF6EE" strokeWidth="2.5" />
    </g>

    {/* Armored Slate-Blue Ancient Body */}
    <path d="M40 65 C55 45, 130 45, 170 65 C130 85, 55 85, 40 65 Z" fill="#334155" stroke="#FAF6EE" strokeWidth="3" />

    {/* White Irregular Fleck Scales */}
    <circle cx="75" cy="58" r="2" fill="#FAF6EE" />
    <circle cx="95" cy="62" r="2" fill="#FAF6EE" />
    <circle cx="115" cy="56" r="2" fill="#FAF6EE" />
    <circle cx="135" cy="64" r="2" fill="#FAF6EE" />
    <circle cx="150" cy="60" r="2" fill="#FAF6EE" />

    {/* Unique Fleshy Lobed Pectoral and Pelvic Fins */}
    <path d="M75 75 L62 98 L82 92 Z" fill="#1E293B" stroke="#FAF6EE" strokeWidth="2" />
    <path d="M110 75 L102 98 L122 92 Z" fill="#1E293B" stroke="#FAF6EE" strokeWidth="2" />
    <path d="M140 72 L136 94 L152 88 Z" fill="#1E293B" stroke="#FAF6EE" strokeWidth="2" />

    {/* Lobe Dorsal Fin */}
    <path d="M130 46 L142 26 L150 48 Z" fill="#1E293B" stroke="#FAF6EE" strokeWidth="2" />

    {/* Heavy Armored Head & Eye */}
    <path d="M40 65 L55 52 L62 76 Z" fill="#1E293B" stroke="#FAF6EE" strokeWidth="2" />
    <circle cx="52" cy="60" r="3.5" fill="#FAF6EE" />
    <circle cx="52" cy="60" r="1.5" fill="#090D14" />
  </svg>
);

// =========================================================================
// 20. DUMBO OCTOPUS (Abyss · Grimpoteuthis)
// =========================================================================
export const DumboOctopusSVG: React.FC<{ className?: string }> = ({ className = "w-40 h-36" }) => (
  <svg viewBox="0 0 160 140" className={`${className} paper-cutout-dark animate-paper-float`} fill="none">
    <g className="origin-[52px_45px]">
      <path d="M52 45 C35 32, 20 45, 32 60 C42 68, 50 55, 52 45 Z" fill="#F472B6" stroke="#FAF6EE" strokeWidth="2.5" />
    </g>
    <g className="origin-[108px_45px]">
      <path d="M108 45 C125 32, 140 45, 128 60 C118 68, 110 55, 108 45 Z" fill="#F472B6" stroke="#FAF6EE" strokeWidth="2.5" />
    </g>
    <path d="M55 52 C55 25, 105 25, 105 52 C115 78, 112 95, 80 95 C48 95, 45 78, 55 52 Z" fill="#FBCFE8" stroke="#FAF6EE" strokeWidth="3" />
    <circle cx="68" cy="62" r="4.5" fill="#1E252B" />
    <circle cx="67" cy="60" r="1.5" fill="#FAF6EE" />
    <circle cx="92" cy="62" r="4.5" fill="#1E252B" />
    <circle cx="91" cy="60" r="1.5" fill="#FAF6EE" />
    <g className="origin-[80px_95px]">
      <path d="M48 95 C55 118, 62 120, 68 98 C74 120, 86 120, 92 98 C98 120, 105 118, 112 95 Z" fill="#F472B6" stroke="#FAF6EE" strokeWidth="2.5" />
    </g>
  </svg>
);

// =========================================================================
// 21. TRIPOD FISH (Abyss · Bathypterois grallator)
// =========================================================================
export const TripodFishSVG: React.FC<{ className?: string }> = ({ className = "w-48 h-52" }) => (
  <svg viewBox="0 0 180 190" className={`${className} paper-cutout-dark animate-paper-float`} fill="none">
    <path d="M75 90 L52 185" stroke="#6BB7B9" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M95 90 L118 185" stroke="#6BB7B9" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M142 80 L160 185" stroke="#6BB7B9" strokeWidth="3.5" strokeLinecap="round" />

    <g className="origin-[90px_80px]">
      <path d="M35 78 C50 68, 125 68, 142 80 C125 92, 50 92, 35 78 Z" fill="#1E293B" stroke="#FAF6EE" strokeWidth="3" />
      <path d="M55 72 L35 25 M60 72 L50 20" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="76" r="2" fill="#94A3B8" />
    </g>
  </svg>
);

// =========================================================================
// 22. MARIANA SNAILFISH (Hadal · Pseudoliparis swirei)
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
// 23. GIANT HADAL AMPHIPOD (Challenger Deep · Hirondellea gigas)
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
