import React, { useEffect, useRef, useState } from 'react';
import { ZONES, SPECIMENS } from './data/oceanData';
import { BiotaSpecimen, ZoneData } from './types';
import { MechanicalDepthGauge } from './components/MechanicalDepthGauge';
import { WaterlineThreshold } from './components/WaterlineThreshold';
import { SpecimenCard } from './components/SpecimenCard';
import { FieldJournalModal } from './components/FieldJournalModal';
import { ChallengerDeepFinale } from './components/ChallengerDeepFinale';
import { pelagiaAudio } from './lib/audioEngine';
import { ChevronDown, Compass, Sparkles } from 'lucide-react';

export function App() {
  const [currentDepth, setCurrentDepth] = useState<number>(-5); // Start at +5m beach
  const [currentZone, setCurrentZone] = useState<ZoneData>(ZONES[0]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedSpecimen, setSelectedSpecimen] = useState<BiotaSpecimen | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const lastTickDepthRef = useRef<number>(-5);
  const lastZoneIdRef = useRef<string>('coastal');

  // Track vertical scroll to calculate depth accurately
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      // Map progress to depth:
      // 0.0 -> -10m (Coast)
      // 0.08 -> 0m (Waterline)
      // 0.28 -> 200m (Sunlight)
      // 0.48 -> 1,000m (Twilight)
      // 0.70 -> 4,000m (Midnight)
      // 0.86 -> 6,000m (Abyss)
      // 1.00 -> 10,994m (Hadal)
      let depth = 0;
      if (progress < 0.08) {
        depth = -10 + (progress / 0.08) * 10; // -10 to 0
      } else if (progress < 0.28) {
        depth = ((progress - 0.08) / 0.2) * 200; // 0 to 200
      } else if (progress < 0.48) {
        depth = 200 + ((progress - 0.28) / 0.2) * 800; // 200 to 1000
      } else if (progress < 0.70) {
        depth = 1000 + ((progress - 0.48) / 0.22) * 3000; // 1000 to 4000
      } else if (progress < 0.86) {
        depth = 4000 + ((progress - 0.70) / 0.16) * 2000; // 4000 to 6000
      } else {
        depth = 6000 + ((progress - 0.86) / 0.14) * 4994; // 6000 to 10994
      }

      setCurrentDepth(depth);

      // Determine Zone
      let activeZone = ZONES[0];
      if (depth >= 6000) activeZone = ZONES[5];
      else if (depth >= 4000) activeZone = ZONES[4];
      else if (depth >= 1000) activeZone = ZONES[3];
      else if (depth >= 200) activeZone = ZONES[2];
      else if (depth > 0) activeZone = ZONES[1];

      setCurrentZone(activeZone);

      // Audio feedback: stepped mechanical tick every ~150 meters
      if (Math.abs(depth - lastTickDepthRef.current) > 150) {
        pelagiaAudio.playMechanicalTick();
        lastTickDepthRef.current = depth;
      }

      // Audio feedback: zone crossing chime
      if (activeZone.id !== lastZoneIdRef.current) {
        pelagiaAudio.playZoneChime(depth);
        lastZoneIdRef.current = activeZone.id;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio Toggle
  const handleToggleMute = () => {
    pelagiaAudio.init();
    const muted = pelagiaAudio.toggleMute();
    setIsMuted(muted);
  };

  // Jump to Zone helper
  const handleJumpToZone = (zoneId: string) => {
    const el = document.getElementById(`zone-${zoneId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedZoneData = selectedSpecimen
    ? ZONES.find((z) => z.id === selectedSpecimen.zoneId) || null
    : null;

  return (
    <div className="relative min-h-screen transition-colors duration-700 select-none">
      {/* Mechanical Depth Gauge Sticky HUD */}
      <MechanicalDepthGauge
        currentDepth={currentDepth}
        currentZone={currentZone}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onJumpToZone={handleJumpToZone}
        scrollProgress={scrollProgress}
      />

      {/* ===================================================================
       * 1. COASTAL SHORE & DUNES (+10m to 0m)
       * =================================================================== */}
      <section
        id="zone-coastal"
        className="relative pt-28 pb-16 px-4 sm:px-8 bg-[#FAF6EE] text-[#1E252B] paper-grain"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBDDCB] border border-[#DEC6AE] text-[#D95A47] font-mono text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZONE 00 // LITTORAL INTERFACE (+10M TO 0M)</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-serif font-bold tracking-tight text-[#1E252B]">
            PELAGIA
          </h1>
          <p className="font-mono text-sm sm:text-base text-[#D95A47] tracking-widest uppercase">
            A STOP-MOTION PAPERCRAFT OCEAN DESCENT
          </p>

          <p className="font-serif text-base sm:text-lg text-[#626863] max-w-xl mx-auto leading-relaxed italic">
            "We begin on sunlit sand dunes. Scroll downward to break through the foam and descend eleven vertical kilometers into Earth's deepest wound."
          </p>

          {/* Scroll Down Hint */}
          <div className="pt-4 flex flex-col items-center gap-1 font-mono text-xs text-[#626863]">
            <span>SCROLL DOWN TO DIVE</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D95A47]" />
          </div>
        </div>

        {/* Coastal Specimens */}
        <div className="mt-12 space-y-6">
          {SPECIMENS.filter((s) => s.zoneId === 'coastal').map((specimen, idx) => (
            <SpecimenCard
              key={specimen.id}
              specimen={specimen}
              zone={ZONES[0]}
              index={idx}
              onSelect={setSelectedSpecimen}
            />
          ))}
        </div>
      </section>

      {/* ===================================================================
       * 2. THE WATERLINE THRESHOLD (0M)
       * =================================================================== */}
      <WaterlineThreshold onScrollToSunlight={() => handleJumpToZone('sunlight')} />

      {/* ===================================================================
       * 3. SUNLIGHT REALM (0m to -200m)
       * =================================================================== */}
      <section
        id="zone-sunlight"
        className="relative py-20 px-4 sm:px-8 bg-[#EBF3EF] text-[#1B322D] border-t-2 border-[#1E252B] paper-grain"
      >
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDECE5] border border-[#2F6D68]/30 text-[#2F6D68] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 01 // EPIPELAGIC (0M TO -200M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            The Sunlight Realm
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#44665E] max-w-xl mx-auto leading-relaxed italic">
            "{ZONES[1].summary}"
          </p>
        </div>

        {/* Sunlight Specimens */}
        <div className="space-y-6">
          {SPECIMENS.filter((s) => s.zoneId === 'sunlight').map((specimen, idx) => (
            <SpecimenCard
              key={specimen.id}
              specimen={specimen}
              zone={ZONES[1]}
              index={idx}
              onSelect={setSelectedSpecimen}
            />
          ))}
        </div>
      </section>

      {/* ===================================================================
       * 4. TWILIGHT DOMAIN (-200m to -1,000m)
       * =================================================================== */}
      <section
        id="zone-twilight"
        className="relative py-20 px-4 sm:px-8 bg-[#D3E0EA] text-[#162736] border-t-2 border-[#1E252B] paper-grain"
      >
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFCFD9] border border-[#346285]/30 text-[#346285] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 02 // MESOPELAGIC (-200M TO -1,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            The Twilight Domain
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#3E5C73] max-w-xl mx-auto leading-relaxed italic">
            "{ZONES[2].summary}"
          </p>
        </div>

        <div className="space-y-6">
          {SPECIMENS.filter((s) => s.zoneId === 'twilight').map((specimen, idx) => (
            <SpecimenCard
              key={specimen.id}
              specimen={specimen}
              zone={ZONES[2]}
              index={idx}
              onSelect={setSelectedSpecimen}
            />
          ))}
        </div>
      </section>

      {/* ===================================================================
       * 5. THE MIDNIGHT REALM (-1,000m to -4,000m)
       * =================================================================== */}
      <section
        id="zone-midnight"
        className="relative py-20 px-4 sm:px-8 bg-[#232F3E] text-[#EDE8DF] border-t-2 border-[#3B5366] paper-grain-dark"
      >
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192430] border border-[#EAA838]/40 text-[#EAA838] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 03 // BATHYPELAGIC (-1,000M TO -4,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            The Midnight Realm
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#8EA2B3] max-w-xl mx-auto leading-relaxed italic">
            "{ZONES[3].summary}"
          </p>
        </div>

        <div className="space-y-6">
          {SPECIMENS.filter((s) => s.zoneId === 'midnight').map((specimen, idx) => (
            <SpecimenCard
              key={specimen.id}
              specimen={specimen}
              zone={ZONES[3]}
              index={idx}
              onSelect={setSelectedSpecimen}
            />
          ))}
        </div>
      </section>

      {/* ===================================================================
       * 6. THE ABYSSAL PLAINS (-4,000m to -6,000m)
       * =================================================================== */}
      <section
        id="zone-abyss"
        className="relative py-20 px-4 sm:px-8 bg-[#151D26] text-[#F4EDE2] border-t-2 border-[#3B5366] paper-grain-dark"
      >
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E151C] border border-[#6BB7B9]/40 text-[#6BB7B9] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 04 // ABYSSOPELAGIC (-4,000M TO -6,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            The Abyssal Plains
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#7D8F9E] max-w-xl mx-auto leading-relaxed italic">
            "{ZONES[4].summary}"
          </p>
        </div>

        <div className="space-y-6">
          {SPECIMENS.filter((s) => s.zoneId === 'abyss').map((specimen, idx) => (
            <SpecimenCard
              key={specimen.id}
              specimen={specimen}
              zone={ZONES[4]}
              index={idx}
              onSelect={setSelectedSpecimen}
            />
          ))}
        </div>
      </section>

      {/* ===================================================================
       * 7. THE HADAL TRENCHES (-6,000m to -10,994m)
       * =================================================================== */}
      <section
        id="zone-hadal"
        className="relative py-20 px-4 sm:px-8 bg-[#0B0F14] text-[#F9F7F1] border-t-2 border-red-500/30 paper-grain-dark"
      >
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06090D] border border-red-500/40 text-[#E06D53] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 05 // HADALPELAGIC (-6,000M TO -10,994M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            The Hadal Trenches
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed italic">
            "{ZONES[5].summary}"
          </p>
        </div>

        <div className="space-y-6">
          {SPECIMENS.filter((s) => s.zoneId === 'hadal').map((specimen, idx) => (
            <SpecimenCard
              key={specimen.id}
              specimen={specimen}
              zone={ZONES[5]}
              index={idx}
              onSelect={setSelectedSpecimen}
            />
          ))}
        </div>
      </section>

      {/* ===================================================================
       * 8. CHALLENGER DEEP FINALE (-10,994M)
       * =================================================================== */}
      <ChallengerDeepFinale onScrollToTop={handleScrollToTop} />

      {/* ===================================================================
       * 9. FIELD JOURNAL SPECIMEN INSPECTION MODAL
       * =================================================================== */}
      <FieldJournalModal
        specimen={selectedSpecimen}
        zone={selectedZoneData}
        onClose={() => setSelectedSpecimen(null)}
      />
    </div>
  );
}

export default App;
