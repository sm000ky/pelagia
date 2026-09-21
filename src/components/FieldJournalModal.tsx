import React, { useEffect, useState } from 'react';
import { BiotaSpecimen, ZoneData, AnatomyHotspot } from '../types';
import { SpecimenRenderer } from './papercraft/SpecimenRenderer';
import { DiverScaleSVG } from './papercraft/SpecimenSVGs';
import {
  X,
  Sparkles,
  BookOpen,
  Ruler,
  Compass,
  Gauge,
  Thermometer,
  CheckCircle2,
  Info
} from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';
import { Translations } from '../lib/i18n';

interface FieldJournalModalProps {
  specimen: BiotaSpecimen | null;
  zone: ZoneData | null;
  onClose: () => void;
  isDiscovered?: boolean;
  onStampDiscovered?: (specimenId: string) => void;
  t: Translations;
}

const getModalZoneTheme = (zoneId: string) => {
  switch (zoneId) {
    case 'coastal':
      return {
        bg: 'bg-[#FAF3E8]',
        border: 'border-[#DEC6AE]',
        text: 'text-[#2D312E]',
        subtext: 'text-[#6B7280]',
        accent: 'text-[#D95A47]',
        headerBg: 'bg-[#F4ECE1]',
        innerBg: 'bg-[#FDFBF7]',
        innerBorder: 'border-[#DEC6AE]',
        cardBg: 'bg-[#F4ECE1]',
        tabActive: 'bg-[#1E252B] text-white border-[#1E252B]',
        tabInactive: 'bg-[#F4ECE1] text-[#2D312E] border-[#DEC6AE] hover:bg-[#EBDDCB]',
        glow: 'shadow-paper-lg',
      };
    case 'sunlight':
      return {
        bg: 'bg-[#EDF7F5]',
        border: 'border-[#50857D]',
        text: 'text-[#0F332B]',
        subtext: 'text-[#3B665D]',
        accent: 'text-[#2F6D68]',
        headerBg: 'bg-[#DDECE8]',
        innerBg: 'bg-[#F5FAF8]',
        innerBorder: 'border-[#50857D]/50',
        cardBg: 'bg-[#DDECE8]',
        tabActive: 'bg-[#0F332B] text-white border-[#0F332B]',
        tabInactive: 'bg-[#DDECE8] text-[#0F332B] border-[#50857D]/40 hover:bg-[#C9E0D9]',
        glow: 'shadow-paper-lg',
      };
    case 'twilight':
      return {
        bg: 'bg-[#132A3A]',
        border: 'border-[#38BDF8]/60',
        text: 'text-[#F1F5F9]',
        subtext: 'text-[#94A3B8]',
        accent: 'text-[#38BDF8]',
        headerBg: 'bg-[#0E1E2B]',
        innerBg: 'bg-[#0A1620]',
        innerBorder: 'border-[#38BDF8]/40',
        cardBg: 'bg-[#0E1E2B]',
        tabActive: 'bg-[#38BDF8] text-[#0A1620] border-[#38BDF8] font-bold',
        tabInactive: 'bg-[#0E1E2B] text-[#94A3B8] border-[#38BDF8]/30 hover:bg-[#162F42]',
        glow: 'shadow-[0_0_35px_rgba(56,189,248,0.25)]',
      };
    case 'midnight':
      return {
        bg: 'bg-[#0D1520]',
        border: 'border-[#EAA838]/60',
        text: 'text-[#FFFBEB]',
        subtext: 'text-[#94A3B8]',
        accent: 'text-[#F59E0B]',
        headerBg: 'bg-[#080E17]',
        innerBg: 'bg-[#050910]',
        innerBorder: 'border-[#EAA838]/40',
        cardBg: 'bg-[#080E17]',
        tabActive: 'bg-[#EAA838] text-[#080E17] border-[#EAA838] font-bold',
        tabInactive: 'bg-[#080E17] text-[#94A3B8] border-[#EAA838]/30 hover:bg-[#121E2C]',
        glow: 'shadow-[0_0_35px_rgba(234,168,56,0.25)]',
      };
    case 'abyss':
      return {
        bg: 'bg-[#0E0C18]',
        border: 'border-[#A855F7]/60',
        text: 'text-[#FAF5FF]',
        subtext: 'text-[#A78BFA]',
        accent: 'text-[#C084FC]',
        headerBg: 'bg-[#080610]',
        innerBg: 'bg-[#05040B]',
        innerBorder: 'border-[#A855F7]/40',
        cardBg: 'bg-[#080610]',
        tabActive: 'bg-[#A855F7] text-white border-[#A855F7] font-bold',
        tabInactive: 'bg-[#080610] text-[#A78BFA] border-[#A855F7]/30 hover:bg-[#151224]',
        glow: 'shadow-[0_0_40px_rgba(168,85,247,0.3)]',
      };
    case 'hadal':
    default:
      return {
        bg: 'bg-[#08090D]',
        border: 'border-[#EF4444]/70',
        text: 'text-[#FFFFFF]',
        subtext: 'text-[#94A3B8]',
        accent: 'text-[#F87171]',
        headerBg: 'bg-[#030406]',
        innerBg: 'bg-[#020204]',
        innerBorder: 'border-[#EF4444]/40',
        cardBg: 'bg-[#040508]',
        tabActive: 'bg-[#EF4444] text-white border-[#EF4444] font-bold',
        tabInactive: 'bg-[#040508] text-[#94A3B8] border-[#EF4444]/30 hover:bg-[#12151F]',
        glow: 'shadow-[0_0_40px_rgba(239,68,68,0.3)]',
      };
  }
};

export const FieldJournalModal: React.FC<FieldJournalModalProps> = ({
  specimen,
  zone,
  onClose,
  isDiscovered = false,
  onStampDiscovered,
  t,
}) => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'scale' | 'physics'>('anatomy');
  const [activeHotspot, setActiveHotspot] = useState<AnatomyHotspot | null>(null);
  const [scaleMode, setScaleMode] = useState<'diver' | 'submersible' | 'hand'>('diver');
  const [stamped, setStamped] = useState<boolean>(isDiscovered);

  useEffect(() => {
    if (specimen) {
      pelagiaAudio.playPaperRustle();
      setStamped(isDiscovered);
      if (specimen.hotspots && specimen.hotspots.length > 0) {
        setActiveHotspot(specimen.hotspots[0]);
      } else {
        setActiveHotspot(null);
      }
    }
  }, [specimen, isDiscovered]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!specimen || !zone) return null;

  const theme = getModalZoneTheme(zone.id);

  // Pressure and environmental math
  const rawAtm = Math.max(1, 1.0 + Math.max(0, specimen.depthMeters) * 0.0987);
  const psi = (rawAtm * 14.696).toFixed(0);
  const kgPerCm2 = (rawAtm * 1.0332).toFixed(1);
  const fraction = Math.min(1, Math.max(0, specimen.depthMeters / 10994));
  const tempC = specimen.depthMeters <= 0 ? '28.4' : (28.4 * Math.pow(0.04, fraction)).toFixed(1);

  // Scale ratio based on comparison target
  const comparisonSize = scaleMode === 'diver' ? 1.8 : scaleMode === 'submersible' ? 8.0 : 0.2;
  const comparisonLabel = scaleMode === 'diver' ? 'Human Diver (1.8m)' : scaleMode === 'submersible' ? 'Deep Submersible (8.0m)' : 'Scuba Mask (0.2m)';
  const scaleRatio = (specimen.lengthMeters / comparisonSize).toFixed(1);

  const handleStamp = () => {
    if (stamped) return;
    pelagiaAudio.playStampThud();
    setStamped(true);
    if (onStampDiscovered) {
      onStampDiscovered(specimen.id);
    }
  };

  const handleSelectHotspot = (hs: AnatomyHotspot) => {
    pelagiaAudio.playWaterBubble();
    setActiveHotspot(hs);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md select-none transition-all duration-300"
      onClick={onClose}
    >
      {/* Origami Field Journal Notebook Adapted to Depth Theme */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl max-h-[94vh] flex flex-col ${theme.bg} ${theme.text} border-2 ${theme.border} ${theme.glow} rounded-2xl overflow-hidden paper-grain animate-in zoom-in-95 fade-in-0 duration-300 ease-out`}
        style={{ perspective: '1200px' }}
      >
        {/* Bookmark Tag Header */}
        <div className={`flex items-center justify-between px-5 sm:px-8 py-3.5 border-b-2 ${theme.border} ${theme.headerBg}`}>
          <div className="flex items-center gap-3 font-mono">
            <div className={`w-6 h-6 rounded bg-[#EAA838] border border-black/20 flex items-center justify-center font-bold text-xs text-[#1E252B] shadow-paper-sm`}>
              {specimen.plateNumber.replace('PL-', '')}
            </div>
            <div>
              <div className={`text-[10px] tracking-widest ${theme.accent} font-bold uppercase flex items-center gap-1.5`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.modalArchive} // {specimen.plateNumber}</span>
              </div>
              <div className={`text-xs ${theme.subtext} flex items-center gap-2`}>
                <span>{zone.name.split('·')[0].trim()}</span>
                <span>·</span>
                <span className="font-bold">
                  {specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}M SHORE` : `-${specimen.depthMeters}M DEPTH`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Collector Stamp Button */}
            <button
              onClick={handleStamp}
              disabled={stamped}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-paper-sm cursor-pointer ${
                stamped
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 cursor-default'
                  : 'bg-transparent border-current hover:bg-white/10 active:scale-95'
              }`}
              title={stamped ? 'Specimen already recorded' : 'Stamp specimen into journal'}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{stamped ? t.logged : t.stampLog}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-current hover:bg-white/10 transition-colors shadow-paper-sm active:translate-y-0.5 cursor-pointer"
              title={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Journal Notebook Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Specimen Showcase Arena with High-Contrast Archival Mounting Mat */}
          <div className={`relative p-6 sm:p-10 rounded-xl border ${theme.innerBorder} ${theme.innerBg} shadow-inner flex flex-col items-center justify-center min-h-[280px] overflow-hidden`}>
            {/* Luminous Naturalist Mounting Mat (Ensures 100% visibility for black & deep-sea creatures!) */}
            <div className="absolute inset-3 sm:inset-4 rounded-lg bg-[#FAF6EE] text-[#1E252B] border border-[#DEC6AE] shadow-paper-sm flex flex-col items-center justify-center overflow-hidden">
              {/* Subtle Millimeter Graph Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#1E252B_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              {/* Corner Archival Photo Corners */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#1E252B]/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#1E252B]/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#1E252B]/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#1E252B]/40" />
            </div>

            {/* Specimen SVG mounted cleanly on the mat */}
            <div className="relative z-10 transform scale-110 sm:scale-125 transition-transform duration-300 my-4">
              <SpecimenRenderer type={specimen.papercraftType} />
            </div>

            {/* Red Wax Stamp Indicator overlay if logged */}
            {stamped && (
              <div className="absolute top-6 right-6 z-20 border-2 border-[#D95A47] text-[#D95A47] font-mono font-bold text-xs uppercase px-3 py-1 rounded rotate-[-10deg] bg-[#FAF6EE]/90 shadow-paper-sm">
                {t.stampExamined}
              </div>
            )}

            {/* Specimen Length Pill */}
            <div className="absolute bottom-5 left-5 z-20 px-2.5 py-1 bg-[#F4ECE1] text-[#1E252B] border border-[#DEC6AE] rounded text-[10px] font-mono shadow-paper-sm">
              {t.size}: <span className="font-bold text-[#D95A47]">{specimen.lengthMeters} M</span>
            </div>
          </div>

          {/* Interactive Anatomical Adaptation Selector (Clean Pills Below, Zero Red Dots!) */}
          {specimen.hotspots && specimen.hotspots.length > 0 && (
            <div className="space-y-2">
              <div className={`text-[10px] font-mono font-bold tracking-wider ${theme.subtext} uppercase flex items-center gap-1.5`}>
                <Sparkles className={`w-3 h-3 ${theme.accent}`} />
                <span>{t.examinePills}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specimen.hotspots.map((hs) => {
                  const isSelected = activeHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => handleSelectHotspot(hs)}
                      className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? `${theme.tabActive} shadow-paper-sm`
                          : `${theme.tabInactive}`
                      }`}
                    >
                      {hs.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Hotspot Callout Card */}
          {activeHotspot && (
            <div className={`p-4 rounded-xl border ${theme.innerBorder} ${theme.cardBg} shadow-paper-sm space-y-1 animate-in fade-in-50 duration-200`}>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className={`font-bold ${theme.accent} flex items-center gap-1.5 uppercase tracking-wider`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ADAPTATION: {activeHotspot.title}</span>
                </span>
                <span className={`text-[10px] ${theme.subtext}`}>FEATURE NOTE</span>
              </div>
              <p className="font-serif text-sm leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
          )}

          {/* Titles & Taxonomy */}
          <div className={`border-b border-dashed border-current/20 pb-4`}>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {specimen.commonName}
            </h2>
            <div className={`flex flex-wrap items-center gap-2 mt-1.5 font-mono text-xs ${theme.subtext}`}>
              <span className={`italic font-serif text-base ${theme.accent}`}>
                {specimen.binomialName}
              </span>
              <span>·</span>
              <span>{specimen.japaneseName}</span>
              <span>·</span>
              <span className={`px-2 py-0.5 rounded ${theme.cardBg} border ${theme.innerBorder} font-semibold text-[10px]`}>
                {specimen.curiosityRating}
              </span>
              <span>·</span>
              <span>{t.discoveredYear}: {specimen.discoveryYear}</span>
            </div>
          </div>

          {/* Inspection Navigation Tabs */}
          <div className={`flex items-center gap-2 border-b border-current/20 pb-2 font-mono text-xs`}>
            <button
              onClick={() => {
                pelagiaAudio.playWaterBubble();
                setActiveTab('anatomy');
              }}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-colors cursor-pointer ${
                activeTab === 'anatomy' ? theme.tabActive : theme.tabInactive
              }`}
            >
              📖 {t.fieldNotes}
            </button>

            <button
              onClick={() => {
                pelagiaAudio.playWaterBubble();
                setActiveTab('scale');
              }}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-colors cursor-pointer ${
                activeTab === 'scale' ? theme.tabActive : theme.tabInactive
              }`}
            >
              📏 {t.scaleExplorer}
            </button>

            <button
              onClick={() => {
                pelagiaAudio.playWaterBubble();
                setActiveTab('physics');
              }}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-colors cursor-pointer ${
                activeTab === 'physics' ? theme.tabActive : theme.tabInactive
              }`}
            >
              🌊 {t.oceanPhysics}
            </button>
          </div>

          {/* TAB 1: FIELD NOTES */}
          {activeTab === 'anatomy' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`space-y-1.5 ${theme.cardBg} p-4 sm:p-5 rounded-xl border ${theme.innerBorder} shadow-paper-sm`}>
                <div className={`text-[10px] font-mono tracking-widest uppercase font-bold ${theme.accent} flex items-center gap-1.5`}>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>NATURALIST OBSERVATION LOG</span>
                </div>
                <p className="font-serif text-base sm:text-lg leading-relaxed italic">
                  "{specimen.observationNotes}"
                </p>
                <div className={`pt-2 flex flex-wrap gap-4 text-xs font-mono ${theme.subtext} border-t border-current/15 mt-2`}>
                  <span>{t.diet}: <strong className={theme.text}>{specimen.diet}</strong></span>
                  {specimen.weightKg && (
                    <span>{t.weight}: <strong className={theme.text}>{specimen.weightKg}</strong></span>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold tracking-widest uppercase opacity-80">
                  KEY ANATOMICAL ADAPTATIONS
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {specimen.anatomicalFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${theme.innerBorder} ${theme.innerBg} text-xs font-serif leading-relaxed`}
                    >
                      <span className="w-5 h-5 rounded bg-[#D95A47] text-white flex-shrink-0 flex items-center justify-center font-mono font-bold text-[10px] shadow-paper-sm">
                        {i + 1}
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCALE COMPARISON */}
          {activeTab === 'scale' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 sm:p-5 rounded-xl border ${theme.innerBorder} ${theme.innerBg} shadow-paper-sm space-y-4`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase tracking-wider">
                      SCALE //
                    </span>
                    <div className="inline-flex rounded border border-current overflow-hidden text-[10px]">
                      <button
                        onClick={() => setScaleMode('diver')}
                        className={`px-2 py-0.5 ${scaleMode === 'diver' ? theme.tabActive : 'opacity-70'}`}
                      >
                        Diver (1.8m)
                      </button>
                      <button
                        onClick={() => setScaleMode('submersible')}
                        className={`px-2 py-0.5 border-l border-current ${scaleMode === 'submersible' ? theme.tabActive : 'opacity-70'}`}
                      >
                        Submersible (8m)
                      </button>
                      <button
                        onClick={() => setScaleMode('hand')}
                        className={`px-2 py-0.5 border-l border-current ${scaleMode === 'hand' ? theme.tabActive : 'opacity-70'}`}
                      >
                        Mask (0.2m)
                      </button>
                    </div>
                  </div>

                  <span className={`font-bold ${theme.accent}`}>
                    ≈ {scaleRatio}× {comparisonLabel.split('(')[0].trim()}
                  </span>
                </div>

                <div className="relative flex items-end gap-8 pt-8 pb-4 justify-center rounded-lg bg-[#FAF6EE] text-[#1E252B] border border-[#DEC6AE] shadow-inner min-h-[170px] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#1E252B_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <DiverScaleSVG className="w-10 h-20 text-[#1E252B]" />
                    <span className="text-[10px] font-mono opacity-70">{comparisonSize} M</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div
                      className="transform origin-bottom transition-transform duration-300"
                      style={{
                        transform: `scale(${Math.min(2.2, Math.max(0.35, specimen.lengthMeters / comparisonSize))})`,
                      }}
                    >
                      <SpecimenRenderer type={specimen.papercraftType} className="w-24 h-20" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#D95A47]">
                      {specimen.lengthMeters} M ({specimen.commonName})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEEP OCEAN PHYSICS */}
          {activeTab === 'physics' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className={`p-4 rounded-xl border ${theme.innerBorder} ${theme.cardBg} space-y-1`}>
                  <div className={`text-[10px] ${theme.subtext} flex items-center gap-1 uppercase`}>
                    <Gauge className="w-3.5 h-3.5" />
                    <span>{t.hydrostaticPressure}</span>
                  </div>
                  <div className="text-xl font-bold">{rawAtm.toFixed(1)} ATM</div>
                  <div className={`text-[10px] ${theme.subtext}`}>
                    {psi} PSI · {kgPerCm2} kg/cm²
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${theme.innerBorder} ${theme.cardBg} space-y-1`}>
                  <div className={`text-[10px] ${theme.subtext} flex items-center gap-1 uppercase`}>
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>{t.temperature}</span>
                  </div>
                  <div className="text-xl font-bold">{tempC} °C</div>
                  <div className={`text-[10px] ${theme.subtext}`}>{zone.temperature}</div>
                </div>

                <div className={`p-4 rounded-xl border ${theme.innerBorder} ${theme.cardBg} space-y-1`}>
                  <div className={`text-[10px] ${theme.subtext} flex items-center gap-1 uppercase`}>
                    <Compass className="w-3.5 h-3.5" />
                    <span>{t.solarPenetration}</span>
                  </div>
                  <div className="text-base font-bold line-clamp-1">{zone.lightLevel.split('(')[0]}</div>
                  <div className={`text-[10px] ${theme.subtext}`}>{zone.name}</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${theme.innerBorder} ${theme.innerBg} space-y-2 text-xs font-serif leading-relaxed`}>
                <strong className={`font-mono text-[10px] ${theme.accent} uppercase block tracking-wider`}>
                  {t.survivalAdaptations}
                </strong>
                <p>
                  At a depth of <strong>{specimen.depthMeters} meters</strong>, the pressure exerts{' '}
                  <strong>{kgPerCm2} kilograms per square centimeter</strong>. Species here have replaced
                  rigid air cavities with fluid-saturated cartilage, high TMAO osmolyte concentrations,
                  and unsaturated piezophilic cell membranes to prevent cellular enzyme collapse.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
