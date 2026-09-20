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
  ShieldCheck,
  CheckCircle2,
  Info,
  Maximize2
} from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface FieldJournalModalProps {
  specimen: BiotaSpecimen | null;
  zone: ZoneData | null;
  onClose: () => void;
  isDiscovered?: boolean;
  onStampDiscovered?: (specimenId: string) => void;
}

export const FieldJournalModal: React.FC<FieldJournalModalProps> = ({
  specimen,
  zone,
  onClose,
  isDiscovered = false,
  onStampDiscovered,
}) => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'scale' | 'physics'>('anatomy');
  const [activeHotspot, setActiveHotspot] = useState<AnatomyHotspot | null>(null);
  const [scaleMode, setScaleMode] = useState<'diver' | 'submersible' | 'hand'>('diver');
  const [stamped, setStamped] = useState<boolean>(isDiscovered);
  const [isStampAnimating, setIsStampAnimating] = useState<boolean>(false);

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
    setIsStampAnimating(true);
    pelagiaAudio.playStampThud();
    setStamped(true);
    if (onStampDiscovered) {
      onStampDiscovered(specimen.id);
    }
    setTimeout(() => {
      setIsStampAnimating(false);
    }, 600);
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
      {/* Origami Field Journal Unfolding Notebook */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[94vh] flex flex-col bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-lg rounded-2xl overflow-hidden paper-grain animate-in zoom-in-95 fade-in-0 duration-300 ease-out"
        style={{ perspective: '1200px' }}
      >
        {/* Vintage Bookmark Tag Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b-2 border-[#1E252B] bg-[#F4ECE1]">
          <div className="flex items-center gap-3 font-mono">
            <div className="w-6 h-6 rounded bg-[#EAA838] border border-[#1E252B] flex items-center justify-center font-bold text-xs text-[#1E252B] shadow-paper-sm">
              {specimen.plateNumber.replace('PL-', '')}
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-[#D95A47] font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPEDITION ARCHIVE // {specimen.plateNumber}</span>
              </div>
              <div className="text-xs text-[#626863] flex items-center gap-2">
                <span>{zone.name.split('·')[0].trim()}</span>
                <span>·</span>
                <span className="font-bold text-[#1E252B]">
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-paper-sm ${
                stamped
                  ? 'bg-emerald-100 border-emerald-600 text-emerald-800 cursor-default'
                  : 'bg-[#FAF6EE] border-[#D95A47] text-[#D95A47] hover:bg-[#D95A47] hover:text-white active:scale-95'
              }`}
              title={stamped ? 'Specimen already recorded in logbook' : 'Stamp specimen into your expedition journal'}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{stamped ? 'LOGGED' : 'STAMP LOG'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] hover:bg-[#D95A47] hover:text-white transition-colors shadow-paper-sm active:translate-y-0.5"
              title="Close Field Note (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Journal Notebook Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Specimen Showcase Arena with Interactive Hotspot Pins */}
          <div className="relative p-6 sm:p-10 rounded-xl border-2 border-[#1E252B] bg-[#FDFBF7] shadow-inner flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
            {/* Background millimeter graph grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1E252B_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            {/* Rendered Specimen SVG */}
            <div className="relative z-10 transform scale-110 sm:scale-125 transition-transform duration-300 my-4">
              <SpecimenRenderer type={specimen.papercraftType} />
            </div>

            {/* Red Wax Stamp Indicator overlay */}
            {stamped && (
              <div
                className={`absolute top-4 right-4 border-2 border-[#D95A47] text-[#D95A47] font-mono font-bold text-xs uppercase px-3 py-1 rounded rotate-[-12deg] bg-white/70 shadow-paper-sm transition-transform duration-300 ${
                  isStampAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                ★ EXAMINED // VERIFIED
              </div>
            )}

            {/* Specimen Length Pill */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#F4ECE1] border border-[#1E252B] rounded text-[10px] font-mono shadow-paper-sm">
              LENGTH: <span className="font-bold text-[#D95A47]">{specimen.lengthMeters} M</span>
            </div>
          </div>

          {/* Interactive Anatomical Adaptation Selector (Clean Pills Below, No Red Dots On Image!) */}
          {specimen.hotspots && specimen.hotspots.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold tracking-wider text-[#626863] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D95A47]" />
                <span>SELECT ANATOMICAL ADAPTATION TO EXAMINE:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specimen.hotspots.map((hs) => {
                  const isSelected = activeHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => handleSelectHotspot(hs)}
                      className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#1E252B] text-white border-[#1E252B] shadow-paper-sm'
                          : 'bg-[#F4ECE1] text-[#1E252B] border-[#DEC6AE] hover:bg-[#EBDDCB]'
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
            <div className="p-4 rounded-xl border-2 border-[#D95A47] bg-[#FFF5F2] shadow-paper-sm space-y-1 animate-in fade-in-50 slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#D95A47] flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ANATOMICAL ADAPTATION: {activeHotspot.title}</span>
                </span>
                <span className="text-[10px] text-[#8C3A2E] font-semibold">HOTSPOT PIN</span>
              </div>
              <p className="font-serif text-sm text-[#2D312E] leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
          )}

          {/* Titles & Taxonomy */}
          <div className="border-b-2 border-dashed border-[#1E252B]/20 pb-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E252B]">
              {specimen.commonName}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono text-xs text-[#626863]">
              <span className="italic font-serif text-base text-[#D95A47]">
                {specimen.binomialName}
              </span>
              <span>·</span>
              <span>{specimen.japaneseName}</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded bg-[#EAA838]/20 border border-[#EAA838] text-[#9A6715] font-semibold text-[10px]">
                {specimen.curiosityRating}
              </span>
              <span>·</span>
              <span>DISCOVERED: {specimen.discoveryYear}</span>
            </div>
          </div>

          {/* Interactive Inspection Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#1E252B]/20 pb-2 font-mono text-xs">
            <button
              onClick={() => {
                pelagiaAudio.playWaterBubble();
                setActiveTab('anatomy');
              }}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-colors ${
                activeTab === 'anatomy'
                  ? 'bg-[#1E252B] text-white border-[#1E252B]'
                  : 'bg-[#F4ECE1] text-[#1E252B] border-[#DEC6AE] hover:bg-[#EBDDCB]'
              }`}
            >
              📖 Field Notes
            </button>

            <button
              onClick={() => {
                pelagiaAudio.playWaterBubble();
                setActiveTab('scale');
              }}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-colors ${
                activeTab === 'scale'
                  ? 'bg-[#1E252B] text-white border-[#1E252B]'
                  : 'bg-[#F4ECE1] text-[#1E252B] border-[#DEC6AE] hover:bg-[#EBDDCB]'
              }`}
            >
              📏 Scale Comparison
            </button>

            <button
              onClick={() => {
                pelagiaAudio.playWaterBubble();
                setActiveTab('physics');
              }}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-colors ${
                activeTab === 'physics'
                  ? 'bg-[#1E252B] text-white border-[#1E252B]'
                  : 'bg-[#F4ECE1] text-[#1E252B] border-[#DEC6AE] hover:bg-[#EBDDCB]'
              }`}
            >
              🌊 Deep Ocean Physics
            </button>
          </div>

          {/* TAB 1: FIELD NOTES & ANATOMICAL KEY */}
          {activeTab === 'anatomy' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Field Observation Log */}
              <div className="space-y-1.5 bg-[#F4ECE1] p-4 sm:p-5 rounded-xl border border-[#1E252B]/20 shadow-paper-sm">
                <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#2F6D68] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>NATURALIST FIELD OBSERVATION</span>
                </div>
                <p className="font-serif text-base sm:text-lg leading-relaxed italic text-[#2D312E]">
                  "{specimen.observationNotes}"
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#626863] border-t border-[#1E252B]/10 mt-2">
                  <span>DIET: <strong className="text-[#1E252B]">{specimen.diet}</strong></span>
                  {specimen.weightKg && (
                    <span>WEIGHT: <strong className="text-[#1E252B]">{specimen.weightKg}</strong></span>
                  )}
                </div>
              </div>

              {/* Anatomical Key Features */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#1E252B]">
                  KEY ANATOMICAL CHARACTERISTICS
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {specimen.anatomicalFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg border border-[#DEC6AE] bg-[#FDFBF7] text-xs font-serif leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded bg-[#D95A47] text-white flex-shrink-0 flex items-center justify-center font-mono font-bold text-[10px] shadow-paper-sm">
                        {i + 1}
                      </span>
                      <span className="text-[#2D312E]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SCALE COMPARISON */}
          {activeTab === 'scale' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 sm:p-5 rounded-xl border-2 border-[#1E252B] bg-[#FDFBF7] shadow-paper-sm space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase tracking-wider text-[#1E252B]">
                      SCALE EXPLORER //
                    </span>
                    {/* Scale Mode Switcher */}
                    <div className="inline-flex rounded border border-[#1E252B] overflow-hidden">
                      <button
                        onClick={() => setScaleMode('diver')}
                        className={`px-2 py-0.5 text-[10px] ${scaleMode === 'diver' ? 'bg-[#1E252B] text-white font-bold' : 'bg-[#FAF6EE]'}`}
                      >
                        Diver (1.8m)
                      </button>
                      <button
                        onClick={() => setScaleMode('submersible')}
                        className={`px-2 py-0.5 text-[10px] border-l border-[#1E252B] ${scaleMode === 'submersible' ? 'bg-[#1E252B] text-white font-bold' : 'bg-[#FAF6EE]'}`}
                      >
                        Submersible (8m)
                      </button>
                      <button
                        onClick={() => setScaleMode('hand')}
                        className={`px-2 py-0.5 text-[10px] border-l border-[#1E252B] ${scaleMode === 'hand' ? 'bg-[#1E252B] text-white font-bold' : 'bg-[#FAF6EE]'}`}
                      >
                        Mask (0.2m)
                      </button>
                    </div>
                  </div>

                  <span className="text-[#D95A47] font-bold">
                    ≈ {scaleRatio}× {comparisonLabel.split('(')[0].trim()}
                  </span>
                </div>

                <div className="flex items-end gap-8 pt-6 pb-4 justify-center border-t border-dashed border-[#1E252B]/20 min-h-[160px]">
                  <div className="flex flex-col items-center gap-1">
                    <DiverScaleSVG className="w-10 h-20 text-[#1E252B]" />
                    <span className="text-[10px] font-mono opacity-70">{comparisonSize} M</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
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
                {/* Atmospheric Pressure */}
                <div className="p-4 rounded-xl border border-[#DEC6AE] bg-[#F4ECE1] space-y-1">
                  <div className="text-[10px] text-[#626863] flex items-center gap-1 uppercase">
                    <Gauge className="w-3.5 h-3.5 text-[#D95A47]" />
                    <span>HYDROSTATIC PRESSURE</span>
                  </div>
                  <div className="text-xl font-bold text-[#1E252B]">{rawAtm.toFixed(1)} ATM</div>
                  <div className="text-[10px] text-[#626863]">
                    {psi} PSI · {kgPerCm2} kg/cm²
                  </div>
                </div>

                {/* Temperature */}
                <div className="p-4 rounded-xl border border-[#DEC6AE] bg-[#F4ECE1] space-y-1">
                  <div className="text-[10px] text-[#626863] flex items-center gap-1 uppercase">
                    <Thermometer className="w-3.5 h-3.5 text-[#2F6D68]" />
                    <span>TEMPERATURE</span>
                  </div>
                  <div className="text-xl font-bold text-[#1E252B]">{tempC} °C</div>
                  <div className="text-[10px] text-[#626863]">{zone.temperature}</div>
                </div>

                {/* Light Transmission */}
                <div className="p-4 rounded-xl border border-[#DEC6AE] bg-[#F4ECE1] space-y-1">
                  <div className="text-[10px] text-[#626863] flex items-center gap-1 uppercase">
                    <Compass className="w-3.5 h-3.5 text-[#EAA838]" />
                    <span>SOLAR PENETRATION</span>
                  </div>
                  <div className="text-base font-bold text-[#1E252B] line-clamp-1">{zone.lightLevel.split('(')[0]}</div>
                  <div className="text-[10px] text-[#626863]">{zone.name}</div>
                </div>
              </div>

              {/* Adaptations for Pressure */}
              <div className="p-4 rounded-xl border border-[#DEC6AE] bg-[#FDFBF7] space-y-2 text-xs font-serif leading-relaxed text-[#2D312E]">
                <strong className="font-mono text-[10px] text-[#2F6D68] uppercase block tracking-wider">
                  Deep Bathymetric Survival Adaptations
                </strong>
                <p>
                  At a depth of <strong>{specimen.depthMeters} meters</strong>, the pressure exerts{' '}
                  <strong>{kgPerCm2} kilograms per square centimeter</strong>. Species here have replaced
                  rigid rigid air cavities with fluid-saturated cartilage, high TMAO osmolyte concentrations,
                  and unsaturated piezophilic cell membranes to prevent enzyme collapse.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
