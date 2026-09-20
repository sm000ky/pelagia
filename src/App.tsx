import React, { useEffect, useRef, useState } from 'react';
import { ZONES, SPECIMENS } from './data/oceanData';
import { BiotaSpecimen, ZoneData } from './types';
import { MechanicalDepthGauge } from './components/MechanicalDepthGauge';
import { CoastalShore } from './components/CoastalShore';
import { WaterlineThreshold } from './components/WaterlineThreshold';
import { SpecimenItem } from './components/SpecimenItem';
import { FieldJournalModal } from './components/FieldJournalModal';
import { LogbookDrawer } from './components/LogbookDrawer';
import { ChallengerDeepFinale } from './components/ChallengerDeepFinale';
import { pelagiaAudio } from './lib/audioEngine';
import { Compass, Sparkles, Volume2 } from 'lucide-react';

export function App() {
  const [currentDepth, setCurrentDepth] = useState<number>(-5);
  const [currentZone, setCurrentZone] = useState<ZoneData>(ZONES[0]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedSpecimen, setSelectedSpecimen] = useState<BiotaSpecimen | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLogbookOpen, setIsLogbookOpen] = useState<boolean>(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState<boolean>(true);

  // LocalStorage discovery tracker for all 50 species
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('pelagia_discovered_ids');
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // ignore
    }
    return new Set<string>();
  });

  const lastZoneIdRef = useRef<string>('coastal');

  // Track vertical scroll to calculate depth accurately
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      // Bathymetric depth mapping curve across 50 specimens
      let depth = 0;
      if (progress < 0.06) {
        depth = -10 + (progress / 0.06) * 10;
      } else if (progress < 0.26) {
        depth = ((progress - 0.06) / 0.20) * 200;
      } else if (progress < 0.46) {
        depth = 200 + ((progress - 0.26) / 0.20) * 800;
      } else if (progress < 0.72) {
        depth = 1000 + ((progress - 0.46) / 0.26) * 3000;
      } else if (progress < 0.88) {
        depth = 4000 + ((progress - 0.72) / 0.16) * 2000;
      } else {
        depth = 6000 + ((progress - 0.88) / 0.12) * 4994;
      }

      setCurrentDepth(depth);

      // Determine active zone
      let activeZone = ZONES[0];
      if (depth >= 6000) activeZone = ZONES[5];
      else if (depth >= 4000) activeZone = ZONES[4];
      else if (depth >= 1000) activeZone = ZONES[3];
      else if (depth >= 200) activeZone = ZONES[2];
      else if (depth > 0) activeZone = ZONES[1];

      setCurrentZone(activeZone);

      // Update ambient audio depth filter
      pelagiaAudio.updateDepthFilter(depth);

      // Zone crossing chime
      if (activeZone.id !== lastZoneIdRef.current) {
        pelagiaAudio.playZoneChime(depth);
        lastZoneIdRef.current = activeZone.id;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save discovered specimens to localStorage
  const handleStampDiscovered = (specimenId: string) => {
    setDiscoveredIds((prev) => {
      const next = new Set(prev);
      next.add(specimenId);
      try {
        localStorage.setItem('pelagia_discovered_ids', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Audio Toggle
  const handleToggleMute = () => {
    const muted = pelagiaAudio.toggleMute();
    setIsMuted(muted);
    setShowAudioPrompt(false);
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
        // Seamless continuous ocean descent background gradient from Shore (+10m) to Challenger Deep (-10,994m)
        background: `linear-gradient(
          to bottom,
          #F4E7D3 0%,
          #E8D5BC 2.5%,
          #DDECE5 5%,
          #6CAE9E 12%,
          #46857C 18%,
          #2C6A7B 25%,
          #1D4A62 34%,
          #143345 44%,
          #102434 54%,
          #0D1C28 64%,
          #09141D 74%,
          #060D14 84%,
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
        discoveredCount={discoveredIds.size}
        totalSpecimens={SPECIMENS.length}
        onToggleLogbookDrawer={() => setIsLogbookOpen(true)}
      />

      {/* Ambient Audio Starter Banner Toast (Shown until user toggles or dismisses) */}
      {showAudioPrompt && isMuted && (
        <div className="fixed bottom-4 left-4 z-40 max-w-sm bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] p-3.5 rounded-xl shadow-paper-lg paper-grain flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Volume2 className="w-4 h-4 text-[#D95A47]" />
            <span>Enable real ocean ambient audio?</span>
          </div>
          <button
            onClick={handleToggleMute}
            className="px-3 py-1 bg-[#D95A47] text-white rounded font-mono text-[10px] font-bold uppercase hover:bg-[#E06D53] transition-colors"
          >
            PLAY SOUND
          </button>
        </div>
      )}

      {/* ===================================================================
       * 1. COASTAL SHORE & DUNES (+10m to 0m) — 5 SPECIES
       * =================================================================== */}
      <div id="zone-coastal">
        <CoastalShore
          specimens={SPECIMENS.filter((s) => s.zoneId === 'coastal')}
          zone={ZONES[0]}
          onSelectSpecimen={setSelectedSpecimen}
          discoveredIds={discoveredIds}
        />
      </div>

      {/* ===================================================================
       * 2. WATERLINE BREAKTHROUGH (0M)
       * =================================================================== */}
      <WaterlineThreshold />

      {/* ===================================================================
       * 3. THE SUNLIGHT REALM (0m to -200m) — 12 SPECIES
       * =================================================================== */}
      <section id="zone-sunlight" className="relative py-16 px-4">
        {/* Shimmering Surface Caustic Ray Overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        {/* Paper Placard Zone Banner (100% Readable!) */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-md text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#2F6D68]/40 text-[#2F6D68] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 01 // EPIPELAGIC (0M TO -200M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E252B]">
            The Sunlight Realm
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#4B5563] italic max-w-md mx-auto">
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
            isDiscovered={discoveredIds.has(specimen.id)}
          />
        ))}
      </section>

      {/* ===================================================================
       * 4. THE TWILIGHT DOMAIN (-200m to -1,000m) — 11 SPECIES
       * =================================================================== */}
      <section id="zone-twilight" className="relative py-16 px-4">
        {/* Paper Placard Zone Banner */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-md text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#5DADE2]/60 text-[#1D4A62] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#5DADE2]" />
            <span>ZONE 02 // MESOPELAGIC (-200M TO -1,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E252B]">
            The Twilight Domain
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#4B5563] italic max-w-md mx-auto">
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
            isDiscovered={discoveredIds.has(specimen.id)}
          />
        ))}
      </section>

      {/* ===================================================================
       * 5. THE MIDNIGHT REALM (-1,000m to -4,000m) — 10 SPECIES
       * =================================================================== */}
      <section id="zone-midnight" className="relative py-16 px-4">
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-md text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#EAA838]/60 text-[#8C5810] font-mono text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>ZONE 03 // BATHYPELAGIC (-1,000M TO -4,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E252B]">
            The Midnight Realm
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#4B5563] italic max-w-md mx-auto">
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
            isDiscovered={discoveredIds.has(specimen.id)}
          />
        ))}
      </section>

      {/* ===================================================================
       * 6. THE ABYSS (-4,000m to -6,000m) — 6 SPECIES
       * =================================================================== */}
      <section id="zone-abyss" className="relative py-16 px-4">
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-md text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#8E44AD]/40 text-[#5B2C6F] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#8E44AD]" />
            <span>ZONE 04 // ABYSSOPELAGIC (-4,000M TO -6,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E252B]">
            The Abyssal Plains
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#4B5563] italic max-w-md mx-auto">
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
            isDiscovered={discoveredIds.has(specimen.id)}
          />
        ))}
      </section>

      {/* ===================================================================
       * 7. THE TRENCHES / HADAL REALM (-6,000m to -10,994m) — 6 SPECIES
       * =================================================================== */}
      <section id="zone-hadal" className="relative py-16 px-4">
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-md text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4ECE1] border border-red-500/40 text-[#991B1B] font-mono text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>ZONE 05 // HADALPELAGIC (-6,000M TO -10,994M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E252B]">
            The Hadal Trenches
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#4B5563] italic max-w-md mx-auto">
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
            isDiscovered={discoveredIds.has(specimen.id)}
          />
        ))}
      </section>

      {/* ===================================================================
       * 8. CHALLENGER DEEP FINALE (-10,994M)
       * =================================================================== */}
      <ChallengerDeepFinale onScrollToTop={handleScrollToTop} />

      {/* Interactive Field Journal Modal Drawer */}
      <FieldJournalModal
        specimen={selectedSpecimen}
        zone={selectedZoneData}
        onClose={() => setSelectedSpecimen(null)}
        isDiscovered={selectedSpecimen ? discoveredIds.has(selectedSpecimen.id) : false}
        onStampDiscovered={handleStampDiscovered}
      />

      {/* Expedition Logbook Drawer (50 Species) */}
      <LogbookDrawer
        isOpen={isLogbookOpen}
        onClose={() => setIsLogbookOpen(false)}
        discoveredIds={discoveredIds}
        onSelectSpecimen={(s) => {
          setIsLogbookOpen(false);
          setSelectedSpecimen(s);
        }}
        onJumpToSpecimenDepth={() => {}}
      />
    </div>
  );
}
export default App;
