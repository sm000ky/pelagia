import React, { useEffect, useRef, useState } from 'react';
import { ZONES, SPECIMENS } from './data/oceanData';
import { BiotaSpecimen, ZoneData } from './types';
import { MechanicalDepthGauge } from './components/MechanicalDepthGauge';
import { CoastalShore } from './components/CoastalShore';
import { WaterlineThreshold } from './components/WaterlineThreshold';
import { SpecimenItem } from './components/SpecimenItem';
import { FieldJournalModal } from './components/FieldJournalModal';
import { ChallengerDeepFinale } from './components/ChallengerDeepFinale';
import { pelagiaAudio } from './lib/audioEngine';
import { Compass } from 'lucide-react';

export function App() {
  const [currentDepth, setCurrentDepth] = useState<number>(-5);
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

      // Depth mapping curve:
      // 0.00 -> -10m (Coast)
      // 0.07 -> 0m (Waterline)
      // 0.25 -> 200m (Sunlight)
      // 0.45 -> 1,000m (Twilight)
      // 0.72 -> 4,000m (Midnight)
      // 0.88 -> 6,000m (Abyss)
      // 1.00 -> 10,994m (Hadal)
      let depth = 0;
      if (progress < 0.07) {
        depth = -10 + (progress / 0.07) * 10;
      } else if (progress < 0.25) {
        depth = ((progress - 0.07) / 0.18) * 200;
      } else if (progress < 0.45) {
        depth = 200 + ((progress - 0.25) / 0.20) * 800;
      } else if (progress < 0.72) {
        depth = 1000 + ((progress - 0.45) / 0.27) * 3000;
      } else if (progress < 0.88) {
        depth = 4000 + ((progress - 0.72) / 0.16) * 2000;
      } else {
        depth = 6000 + ((progress - 0.88) / 0.12) * 4994;
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

      // Update audio depth filter
      pelagiaAudio.updateDepthFilter(depth);

      // Audio feedback: mechanical odometer tick every ~120 meters
      if (Math.abs(depth - lastTickDepthRef.current) > 120) {
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
    <div
      className="relative min-h-screen select-none paper-grain"
      style={{
        // Seamless continuous ocean descent background gradient (No hard cuts!)
        background: `linear-gradient(
          to bottom,
          #F4E7D3 0%,
          #E8D5BC 3%,
          #DDECE5 6%,
          #6CAE9E 14%,
          #46857C 20%,
          #2C6A7B 25%,
          #1D4A62 35%,
          #143345 45%,
          #102434 55%,
          #0D1C28 65%,
          #09141D 75%,
          #060D14 85%,
          #04080D 92%,
          #020407 100%
        )`,
      }}
    >
      {/* Sticky Mechanical Depth Gauge HUD */}
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
      <div id="zone-coastal">
        <CoastalShore
          specimens={SPECIMENS.filter((s) => s.zoneId === 'coastal')}
          zone={ZONES[0]}
          onSelectSpecimen={setSelectedSpecimen}
        />
      </div>

      {/* ===================================================================
       * 2. WATERLINE BREAKTHROUGH (0M)
       * =================================================================== */}
      <WaterlineThreshold />

      {/* ===================================================================
       * 3. THE SUNLIGHT REALM (0m to -200m)
       * =================================================================== */}
      <section id="zone-sunlight" className="relative py-16 px-4">
        {/* Floating Minimal Zone Marker (Zero Box!) */}
        <div className="max-w-4xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EE]/80 border border-[#2F6D68]/30 text-[#1B322D] font-mono text-xs font-bold tracking-widest uppercase shadow-paper-sm">
            <Compass className="w-3.5 h-3.5 text-[#2F6D68]" />
            <span>ZONE 01 // EPIPELAGIC (0M TO -200M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1B322D]">
            The Sunlight Realm
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#2E4A44] max-w-lg mx-auto italic">
            "{ZONES[1].summary}"
          </p>
        </div>

        {/* Free-floating Biota in Open Water */}
        {SPECIMENS.filter((s) => s.zoneId === 'sunlight').map((specimen, idx) => (
          <SpecimenItem
            key={specimen.id}
            specimen={specimen}
            zone={ZONES[1]}
            index={idx}
            onSelect={setSelectedSpecimen}
          />
        ))}
      </section>

      {/* ===================================================================
       * 4. THE TWILIGHT DOMAIN (-200m to -1,000m)
       * =================================================================== */}
      <section id="zone-twilight" className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163244]/80 border border-[#5DADE2]/40 text-[#5DADE2] font-mono text-xs font-bold tracking-widest uppercase shadow-paper-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 02 // MESOPELAGIC (-200M TO -1,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#EDE8DF]">
            The Twilight Domain
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#94A3B8] max-w-lg mx-auto italic">
            "{ZONES[2].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'twilight').map((specimen, idx) => (
          <SpecimenItem
            key={specimen.id}
            specimen={specimen}
            zone={ZONES[2]}
            index={idx}
            onSelect={setSelectedSpecimen}
          />
        ))}
      </section>

      {/* ===================================================================
       * 5. THE MIDNIGHT REALM (-1,000m to -4,000m)
       * =================================================================== */}
      <section id="zone-midnight" className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1620]/80 border border-[#EAA838]/40 text-[#EAA838] font-mono text-xs font-bold tracking-widest uppercase shadow-paper-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 03 // BATHYPELAGIC (-1,000M TO -4,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            The Midnight Realm
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#8EA2B3] max-w-lg mx-auto italic">
            "{ZONES[3].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'midnight').map((specimen, idx) => (
          <SpecimenItem
            key={specimen.id}
            specimen={specimen}
            zone={ZONES[3]}
            index={idx}
            onSelect={setSelectedSpecimen}
          />
        ))}
      </section>

      {/* ===================================================================
       * 6. THE ABYSSAL PLAINS (-4,000m to -6,000m)
       * =================================================================== */}
      <section id="zone-abyss" className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#060A0E]/80 border border-[#6BB7B9]/40 text-[#6BB7B9] font-mono text-xs font-bold tracking-widest uppercase shadow-paper-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 04 // ABYSSOPELAGIC (-4,000M TO -6,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            The Abyssal Plains
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#7D8F9E] max-w-lg mx-auto italic">
            "{ZONES[4].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'abyss').map((specimen, idx) => (
          <SpecimenItem
            key={specimen.id}
            specimen={specimen}
            zone={ZONES[4]}
            index={idx}
            onSelect={setSelectedSpecimen}
          />
        ))}
      </section>

      {/* ===================================================================
       * 7. THE HADAL TRENCHES (-6,000m to -10,994m)
       * =================================================================== */}
      <section id="zone-hadal" className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#010204]/80 border border-red-500/40 text-[#E06D53] font-mono text-xs font-bold tracking-widest uppercase shadow-paper-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 05 // HADALPELAGIC (-6,000M TO -10,994M)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            The Hadal Trenches
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#94A3B8] max-w-lg mx-auto italic">
            "{ZONES[5].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'hadal').map((specimen, idx) => (
          <SpecimenItem
            key={specimen.id}
            specimen={specimen}
            zone={ZONES[5]}
            index={idx}
            onSelect={setSelectedSpecimen}
          />
        ))}
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
