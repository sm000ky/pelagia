import React, { useEffect, useRef, useState } from 'react';
import { ZONES, SPECIMENS } from './data/oceanData';
import { BiotaSpecimen, ZoneData } from './types';
import { MechanicalDepthGauge } from './components/MechanicalDepthGauge';
import { CoastalShore } from './components/CoastalShore';
import { WaterlineThreshold } from './components/WaterlineThreshold';
import { SpecimenItem } from './components/SpecimenItem';
import { FieldJournalModal } from './components/FieldJournalModal';
import { LogbookDrawer } from './components/LogbookDrawer';
import { EasterEggs } from './components/EasterEggs';
import { ChallengerDeepFinale } from './components/ChallengerDeepFinale';
import { ForbiddenAbyssSequence } from './components/ForbiddenAbyssSequence';
import { pelagiaAudio } from './lib/audioEngine';
import { Language, DICTIONARY } from './lib/i18n';
import { getLocalizedSpecimen } from './lib/biotaTranslations';
import { Compass, Sparkles, Volume2 } from 'lucide-react';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const t = DICTIONARY[currentLang];

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

  // Track vertical scroll to calculate depth accurately (from +10m down to -13,000m)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      // Bathymetric depth mapping curve across 50 specimens + Forbidden Abyss up to 13,000m
      let depth = 0;
      if (progress < 0.05) {
        depth = -10 + (progress / 0.05) * 10;
      } else if (progress < 0.22) {
        depth = ((progress - 0.05) / 0.17) * 200;
      } else if (progress < 0.40) {
        depth = 200 + ((progress - 0.22) / 0.18) * 800;
      } else if (progress < 0.62) {
        depth = 1000 + ((progress - 0.40) / 0.22) * 3000;
      } else if (progress < 0.78) {
        depth = 4000 + ((progress - 0.62) / 0.16) * 2000;
      } else if (progress < 0.90) {
        depth = 6000 + ((progress - 0.78) / 0.12) * 4994;
      } else {
        // Beyond Challenger Deep (-10,994m to -13,000m)
        depth = 10994 + ((progress - 0.90) / 0.10) * 2006;
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

  // Psychology of exploration: Next upcoming specimen Sonar Radar indicator
  const upcomingSpecimen = SPECIMENS.find((s) => s.depthMeters > currentDepth && s.depthMeters > 0);
  const nextSpecimenDist = upcomingSpecimen ? Math.round(upcomingSpecimen.depthMeters - currentDepth) : undefined;
  const nextSpecimenName = upcomingSpecimen ? getLocalizedSpecimen(upcomingSpecimen, currentLang).commonName : undefined;

  return (
    <div
      className="relative min-h-screen select-none paper-grain"
      style={{
        // Seamless ocean gradient extending into the subterranean cosmos!
        background: `linear-gradient(
          to bottom,
          #F4E7D3 0%,
          #E8D5BC 2%,
          #DDECE5 4.5%,
          #6CAE9E 10%,
          #46857C 16%,
          #2C6A7B 22%,
          #1D4A62 30%,
          #143345 38%,
          #102434 48%,
          #0D1C28 58%,
          #09141D 68%,
          #060D14 78%,
          #04080D 86%,
          #020407 90%,
          #1A0505 93%,
          #0F172A 96%,
          #1E1B4B 100%
        )`,
      }}
    >
      {/* Sticky Mechanical Depth Gauge HUD with Language Selector & Radar */}
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
        currentLang={currentLang}
        onSelectLanguage={setCurrentLang}
        t={t}
        nextSpecimenName={nextSpecimenName}
        nextSpecimenDist={nextSpecimenDist}
      />

      {/* Ambient Audio Starter Banner Toast (Steady craft card, zero kelap-kelip) */}
      {showAudioPrompt && isMuted && (
        <div className="fixed bottom-4 left-4 z-40 max-w-sm bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] p-3.5 rounded-xl shadow-paper-lg paper-grain flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Volume2 className="w-4 h-4 text-[#D95A47]" />
            <span>Enable real ocean ambient audio?</span>
          </div>
          <button
            onClick={handleToggleMute}
            className="px-3 py-1 bg-[#D95A47] text-white rounded font-mono text-[10px] font-bold uppercase hover:bg-[#E06D53] transition-colors cursor-pointer"
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
          specimens={SPECIMENS.filter((s) => s.zoneId === 'coastal').map((s) =>
            getLocalizedSpecimen(s, currentLang)
          )}
          zone={ZONES[0]}
          onSelectSpecimen={setSelectedSpecimen}
          discoveredIds={discoveredIds}
          t={t}
        />
      </div>

      {/* ===================================================================
       * 2. WATERLINE BREAKTHROUGH (0M) + EASTER EGG 1
       * =================================================================== */}
      <WaterlineThreshold />
      <EasterEggs currentDepth={currentDepth} />

      {/* ===================================================================
       * 3. THE SUNLIGHT REALM (0m to -200m) — 12 SPECIES
       * =================================================================== */}
      <section id="zone-sunlight" className="relative py-16 px-4">
        {/* Shimmering Surface Caustic Ray Overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        {/* Adaptive Paper Banner (Sunlight Emerald Theme) */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#EDF7F5] text-[#0F332B] border-2 border-[#50857D] shadow-paper-md text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDECE8] border border-[#50857D]/50 text-[#2F6D68] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 01 // EPIPELAGIC (0M TO -200M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#0F332B]">
            The Sunlight Realm
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#3B665D] italic max-w-md mx-auto">
            "{ZONES[1].summary}"
          </p>
        </div>

        {/* Free-floating Biota in Open Water (Fully Localized!) */}
        {SPECIMENS.filter((s) => s.zoneId === 'sunlight')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
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
        {/* Adaptive Paper Banner (Twilight Cyan/Slate Theme) */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#132A3A]/95 text-[#F1F5F9] border-2 border-[#38BDF8]/60 shadow-[0_0_25px_rgba(56,189,248,0.2)] text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1E2B] border border-[#38BDF8]/40 text-[#38BDF8] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>ZONE 02 // MESOPELAGIC (-200M TO -1,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#F8FAFC]">
            The Twilight Domain
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#94A3B8] italic max-w-md mx-auto">
            "{ZONES[2].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'twilight')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
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
        {/* Adaptive Paper Banner (Midnight Amber Theme) */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#0D1520]/95 text-[#FFFBEB] border-2 border-[#EAA838]/60 shadow-[0_0_25px_rgba(234,168,56,0.2)] text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080E17] border border-[#EAA838]/40 text-[#F59E0B] font-mono text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>ZONE 03 // BATHYPELAGIC (-1,000M TO -4,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#FFFBEB]">
            The Midnight Realm
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#94A3B8] italic max-w-md mx-auto">
            "{ZONES[3].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'midnight')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
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
        {/* Adaptive Paper Banner (Abyssal Purple Theme) */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#0E0C18]/95 text-[#FAF5FF] border-2 border-[#A855F7]/60 shadow-[0_0_25px_rgba(168,85,247,0.25)] text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080610] border border-[#A855F7]/40 text-[#C084FC] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>ZONE 04 // ABYSSOPELAGIC (-4,000M TO -6,000M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#FAF5FF]">
            The Abyssal Plains
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#C4B5FD] italic max-w-md mx-auto">
            "{ZONES[4].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'abyss')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
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
        {/* Adaptive Paper Banner (Hadal Magma Red Theme) */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#08090D]/95 text-[#FFFFFF] border-2 border-[#EF4444]/70 shadow-[0_0_25px_rgba(239,68,68,0.25)] text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#030406] border border-[#EF4444]/50 text-[#F87171] font-mono text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>ZONE 05 // HADALPELAGIC (-6,000M TO -10,994M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            The Hadal Trenches
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#94A3B8] italic max-w-md mx-auto">
            "{ZONES[5].summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'hadal')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
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
       * 8. CHALLENGER DEEP (-10,994M)
       * =================================================================== */}
      <ChallengerDeepFinale onScrollToTop={handleScrollToTop} />

      {/* ===================================================================
       * 9. THE FORBIDDEN ABYSS WARNINGS & THE SUBTERRANEAN STAR SEA CLIMAX!
       * =================================================================== */}
      <ForbiddenAbyssSequence
        currentDepth={currentDepth}
        onScrollToTop={handleScrollToTop}
        t={t}
      />

      {/* Interactive Field Journal Modal Drawer Adapted to Depth Zone */}
      <FieldJournalModal
        specimen={selectedSpecimen ? getLocalizedSpecimen(selectedSpecimen, currentLang) : null}
        zone={selectedZoneData}
        onClose={() => setSelectedSpecimen(null)}
        isDiscovered={selectedSpecimen ? discoveredIds.has(selectedSpecimen.id) : false}
        onStampDiscovered={handleStampDiscovered}
        t={t}
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
        currentLang={currentLang}
      />
    </div>
  );
}

export default App;
