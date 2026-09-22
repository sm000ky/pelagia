import React, { useEffect, useRef, useState } from 'react';
import { ZONES, SPECIMENS } from './data/oceanData';
import { BiotaSpecimen, ZoneData } from './types';
import { MechanicalDepthGauge } from './components/MechanicalDepthGauge';
import { CoastalShore } from './components/CoastalShore';
import { WaterlineThreshold } from './components/WaterlineThreshold';
import { SpecimenItem } from './components/SpecimenItem';
import { FieldJournalModal } from './components/FieldJournalModal';
import { LogbookDrawer } from './components/LogbookDrawer';
import {
  InWorldPaperCloud,
  InWorldGiantClam,
  InWorldLiftableRock,
  InWorldTrenchEyes,
  InWorldBeebeSphere,
  InWorldCoralOrgan,
  InWorldCrushedDrum,
  SecretNotificationToast,
} from './components/EasterEggs';
import { EnvironmentalPhenomena } from './components/EnvironmentalPhenomena';
import { APOCRYPHAL_RELICS } from './data/relicsData';
import { ApocryphalRelic } from './types';
import { ChallengerDeepFinale } from './components/ChallengerDeepFinale';
import { ForbiddenAbyssSequence } from './components/ForbiddenAbyssSequence';
import { DepthScrubberRail } from './components/DepthScrubberRail';
import { BathyscapheCockpitOverlay } from './components/BathyscapheCockpitOverlay';
import { NaturalistCertificateModal } from './components/NaturalistCertificateModal';
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
  const [isPOVActive, setIsPOVActive] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

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

  // LocalStorage tracker for 8 Apocryphal Relics (Easter Eggs)
  const [discoveredRelicIds, setDiscoveredRelicIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('pelagia_discovered_relics');
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // ignore
    }
    return new Set<string>();
  });

  const [secretToast, setSecretToast] = useState<{
    title: string;
    relicNumber: string;
    depthText: string;
  } | null>(null);

  // Environmental Phenomenon States (Update: Sovereign Tide)
  const [isPlanktonActive, setIsPlanktonActive] = useState<boolean>(false);
  const [isTitanSwimming, setIsTitanSwimming] = useState<boolean>(false);
  const [is1930sMode, setIs1930sMode] = useState<boolean>(false);
  const [isUVMode, setIsUVMode] = useState<boolean>(false);

  const handleUnlockSecret = (relic: ApocryphalRelic) => {
    pelagiaAudio.playRelicUnlock();
    if (!discoveredRelicIds.has(relic.id)) {
      setDiscoveredRelicIds((prev) => {
        const next = new Set(prev);
        next.add(relic.id);
        try {
          localStorage.setItem('pelagia_discovered_relics', JSON.stringify(Array.from(next)));
        } catch {
          // ignore
        }
        return next;
      });
    }

    const depthText = relic.depthMeters <= 0 ? `+${Math.abs(relic.depthMeters)}m` : `-${relic.depthMeters}m`;
    setSecretToast({
      title: relic.title,
      relicNumber: relic.relicNumber,
      depthText,
    });
  };

  const lastZoneIdRef = useRef<string>('coastal');

  // Track vertical scroll to calculate depth accurately via real DOM benchmarks
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      // Calibrated DOM-anchored Bathymetric Depth Mapping
      const viewportCenter = scrollY + window.innerHeight * 0.38;

      const zoneDefs = [
        { id: 'zone-coastal', min: -10, max: 0, zone: ZONES[0] },
        { id: 'zone-sunlight', min: 0, max: 200, zone: ZONES[1] },
        { id: 'zone-twilight', min: 200, max: 1000, zone: ZONES[2] },
        { id: 'zone-midnight', min: 1000, max: 4000, zone: ZONES[3] },
        { id: 'zone-abyss', min: 4000, max: 6000, zone: ZONES[4] },
        { id: 'zone-hadal', min: 6000, max: 10994, zone: ZONES[5] },
        { id: 'zone-challenger', min: 10994, max: 10994, zone: ZONES[5] },
        { id: 'zone-celestial-core', min: 10994, max: 13000, zone: ZONES[5] },
      ];

      let depth = 0;
      let activeZone = ZONES[0];
      let matched = false;

      for (let i = 0; i < zoneDefs.length; i++) {
        const def = zoneDefs[i];
        const el = document.getElementById(def.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const height = rect.height;
        const bottom = top + height;

        if (viewportCenter >= top && viewportCenter <= bottom) {
          const fraction = height > 0 ? (viewportCenter - top) / height : 0;
          depth = def.min + fraction * (def.max - def.min);
          activeZone = def.zone;
          matched = true;
          break;
        }
      }

      if (!matched) {
        const firstEl = document.getElementById('zone-coastal');
        if (firstEl && viewportCenter < firstEl.getBoundingClientRect().top + scrollY) {
          depth = -10;
          activeZone = ZONES[0];
        } else {
          depth = 10994 + progress * 2006;
          activeZone = ZONES[5];
        }
      }

      setCurrentDepth(depth);
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
    // Run once on load to calibrate initial position
    handleScroll();
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

  // Jump to Zone helper (calibrated to anchor IDs)
  const handleJumpToZone = (zoneId: string) => {
    let targetId = zoneId.startsWith('zone-') ? zoneId : `zone-${zoneId}`;
    let el = document.getElementById(targetId);
    if (!el) {
      el = document.getElementById(zoneId);
    }
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Jump to Hidden Relic helper with golden illuminated locator beacon
  const handleJumpToRelic = (relicId: string) => {
    const el = document.getElementById(relicId) || document.getElementById(`relic-${relicId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-[#F59E0B]', 'shadow-[0_0_45px_rgba(245,158,11,0.85)]', 'animate-pulse');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#F59E0B]', 'shadow-[0_0_45px_rgba(245,158,11,0.85)]', 'animate-pulse');
      }, 4500);
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

  // Proximity Sonar Detector: Finds undiscovered apocryphal relic nearby!
  const nearbyRelic = APOCRYPHAL_RELICS.find(
    (r) =>
      !discoveredRelicIds.has(r.id) &&
      Math.abs(r.depthMeters - currentDepth) <= 180
  );
  const nearbyRelicHint = nearbyRelic
    ? `${nearbyRelic.title} (${Math.abs(Math.round(nearbyRelic.depthMeters - currentDepth))}m)`
    : undefined;

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
        nearbyRelicHint={nearbyRelicHint}
        isPOVActive={isPOVActive}
        onTogglePOV={() => setIsPOVActive(!isPOVActive)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Full Release: Submersible Viewport & Halogen Spotlight Overlay */}
      <BathyscapheCockpitOverlay
        isActive={isPOVActive}
        currentDepth={currentDepth}
        currentZone={currentZone}
        t={t}
      />

      {/* Floating Kinetic Bathymetric Depth Scrubber Rail (Calibrated with Elevator Thumb) */}
      <DepthScrubberRail
        currentDepth={currentDepth}
        scrollProgress={scrollProgress}
        onJumpToZone={handleJumpToZone}
        hasNearbyAnomaly={Boolean(nearbyRelic)}
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
        {/* In-World Anomaly 1: The Aerial Cloud & Jian Origami Albatross (+12m) */}
        <InWorldPaperCloud
          isUnlocked={discoveredRelicIds.has('relic-albatross')}
          onUnlock={handleUnlockSecret}
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

        {/* Adaptive Paper Banner (Sunlight Emerald Theme) */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#EDF7F5] text-[#0F332B] border-2 border-[#50857D] shadow-paper-md text-center space-y-2 mb-14 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDECE8] border border-[#50857D]/50 text-[#2F6D68] font-mono text-xs font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ZONE 01 // EPIPELAGIC (0M TO -200M)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#0F332B]">
            {t.zone1Title}
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#3B665D] italic max-w-md mx-auto">
            "{t.zone1Summary}"
          </p>
        </div>

        {/* Free-floating Biota in Open Water (Fully Localized!) */}
        {SPECIMENS.filter((s) => s.zoneId === 'sunlight')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
            <React.Fragment key={specimen.id}>
              <SpecimenItem
                specimen={specimen}
                zone={ZONES[1]}
                index={idx}
                onSelect={setSelectedSpecimen}
                isDiscovered={discoveredIds.has(specimen.id)}
              />
              {/* In-World Anomaly 2: The Shy Giant Clam holding Corsair Treasure (-110m) */}
              {idx === 5 && (
                <InWorldGiantClam
                  isUnlocked={discoveredRelicIds.has('relic-cutlass')}
                  onUnlock={handleUnlockSecret}
                />
              )}
            </React.Fragment>
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
            {t.zone2Title}
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#94A3B8] italic max-w-md mx-auto">
            "{t.zone2Summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'twilight')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
            <React.Fragment key={specimen.id}>
              <SpecimenItem
                specimen={specimen}
                zone={ZONES[2]}
                index={idx}
                onSelect={setSelectedSpecimen}
                isDiscovered={discoveredIds.has(specimen.id)}
              />
              {/* In-World Anomaly 3: The Liftable Volcanic Basalt Rock & Emerald Bottle (-680m) */}
              {idx === 4 && (
                <InWorldLiftableRock
                  isUnlocked={discoveredRelicIds.has('relic-bottle')}
                  onUnlock={handleUnlockSecret}
                  onTriggerPlankton={() => setIsPlanktonActive(true)}
                />
              )}
            </React.Fragment>
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
            {t.zone3Title}
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#94A3B8] italic max-w-md mx-auto">
            "{t.zone3Summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'midnight')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
            <React.Fragment key={specimen.id}>
              <SpecimenItem
                specimen={specimen}
                zone={ZONES[3]}
                index={idx}
                onSelect={setSelectedSpecimen}
                isDiscovered={discoveredIds.has(specimen.id)}
              />
              {/* In-World Anomaly 4: The Trench Wall Crevice & Eyes of the 120m Titan (-2,400m) */}
              {idx === 3 && (
                <InWorldTrenchEyes
                  isUnlocked={discoveredRelicIds.has('relic-titan')}
                  onUnlock={handleUnlockSecret}
                  onTriggerTitan={() => setIsTitanSwimming(true)}
                />
              )}
              {/* In-World Anomaly 5: The 1930 Beebe Diving Sphere tangled in Sea Lilies (-3,850m) */}
              {idx === 7 && (
                <InWorldBeebeSphere
                  isUnlocked={discoveredRelicIds.has('relic-bathysphere')}
                  onUnlock={handleUnlockSecret}
                  onToggle1930s={() => setIs1930sMode((v) => !v)}
                />
              )}
            </React.Fragment>
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
            {t.zone4Title}
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#C4B5FD] italic max-w-md mx-auto">
            "{t.zone4Summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'abyss')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
            <React.Fragment key={specimen.id}>
              <SpecimenItem
                specimen={specimen}
                zone={ZONES[4]}
                index={idx}
                onSelect={setSelectedSpecimen}
                isDiscovered={discoveredIds.has(specimen.id)}
              />
              {/* In-World Anomaly 6: The Sea Organ Coral Pipes & UV Luminescence (-5,100m) */}
              {idx === 2 && (
                <InWorldCoralOrgan
                  isUnlocked={discoveredRelicIds.has('relic-blacklight')}
                  onUnlock={handleUnlockSecret}
                  onToggleUV={() => setIsUVMode((v) => !v)}
                />
              )}
            </React.Fragment>
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
            {t.zone5Title}
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#94A3B8] italic max-w-md mx-auto">
            "{t.zone5Summary}"
          </p>
        </div>

        {SPECIMENS.filter((s) => s.zoneId === 'hadal')
          .map((s) => getLocalizedSpecimen(s, currentLang))
          .map((specimen, idx) => (
            <React.Fragment key={specimen.id}>
              <SpecimenItem
                specimen={specimen}
                zone={ZONES[5]}
                index={idx}
                onSelect={setSelectedSpecimen}
                isDiscovered={discoveredIds.has(specimen.id)}
              />
              {/* In-World Anomaly 7: The Crushed Steel Drum & Indestructible Mug (-10,250m) */}
              {idx === 4 && (
                <InWorldCrushedDrum
                  isUnlocked={discoveredRelicIds.has('relic-mug')}
                  onUnlock={handleUnlockSecret}
                />
              )}
            </React.Fragment>
          ))}
      </section>

      {/* ===================================================================
       * 8. CHALLENGER DEEP (-10,994M) + APOCRYPHA 8: KLAXOSAUR CORE
       * =================================================================== */}
      <div id="zone-challenger">
        <ChallengerDeepFinale
          onScrollToTop={handleScrollToTop}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          isKlaxosaurUnlocked={discoveredRelicIds.has('relic-klaxosaur')}
          onUnlockKlaxosaur={() => {
            const r = APOCRYPHAL_RELICS.find((x) => x.id === 'relic-klaxosaur');
            if (r) handleUnlockSecret(r);
          }}
        />
      </div>

      {/* ===================================================================
       * 9. THE FORBIDDEN ABYSS WARNINGS & THE SUBTERRANEAN STAR SEA CLIMAX!
       * =================================================================== */}
      <div id="zone-celestial-core">
        <ForbiddenAbyssSequence
          currentDepth={currentDepth}
          onScrollToTop={handleScrollToTop}
          t={t}
        />
      </div>

      {/* Interactive Field Journal Modal Drawer Adapted to Depth Zone */}
      <FieldJournalModal
        specimen={selectedSpecimen ? getLocalizedSpecimen(selectedSpecimen, currentLang) : null}
        zone={selectedZoneData}
        onClose={() => setSelectedSpecimen(null)}
        isDiscovered={selectedSpecimen ? discoveredIds.has(selectedSpecimen.id) : false}
        onStampDiscovered={handleStampDiscovered}
        t={t}
      />

      {/* Expedition Logbook Drawer (50 Species & 8 Apocryphal Relics) */}
      <LogbookDrawer
        isOpen={isLogbookOpen}
        onClose={() => setIsLogbookOpen(false)}
        discoveredIds={discoveredIds}
        discoveredRelicIds={discoveredRelicIds}
        onSelectSpecimen={(s) => {
          setIsLogbookOpen(false);
          setSelectedSpecimen(s);
        }}
        onSelectRelic={(r) => {
          setIsLogbookOpen(false);
          handleJumpToRelic(r.id);
        }}
        onJumpToSpecimenDepth={() => {}}
        onJumpToRelic={handleJumpToRelic}
        currentLang={currentLang}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Full Release: Printable Official Expedition Diploma Modal */}
      <NaturalistCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        discoveredCount={discoveredIds.size}
        totalCount={SPECIMENS.length}
        relicsCount={discoveredRelicIds.size}
        totalRelics={APOCRYPHAL_RELICS.length}
        terminalDepth={10994}
      />

      {/* Discreet In-World Secret Unlocked Toast (Zero Immersion-Breaking Modals!) */}
      <SecretNotificationToast
        toast={secretToast}
        onDismiss={() => setSecretToast(null)}
        relicsCount={discoveredRelicIds.size}
        totalRelics={APOCRYPHAL_RELICS.length}
      />

      {/* Environmental Magic Engine (Update: Sovereign Tide) */}
      <EnvironmentalPhenomena
        isPlanktonActive={isPlanktonActive}
        onTogglePlankton={(active) => setIsPlanktonActive(active ?? !isPlanktonActive)}
        isTitanSwimming={isTitanSwimming}
        onTitanFinish={() => setIsTitanSwimming(false)}
        is1930sMode={is1930sMode}
        onToggle1930sMode={(active) => setIs1930sMode(active ?? !is1930sMode)}
        isUVMode={isUVMode}
        onToggleUVMode={(active) => setIsUVMode(active ?? !isUVMode)}
      />
    </div>
  );
}

export default App;
