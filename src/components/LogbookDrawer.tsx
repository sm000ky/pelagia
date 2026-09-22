import React, { useState } from 'react';
import { BiotaSpecimen, ApocryphalRelic } from '../types';
import { SPECIMENS, ZONES } from '../data/oceanData';
import { APOCRYPHAL_RELICS } from '../data/relicsData';
import {
  X,
  Sparkles,
  CheckCircle2,
  Filter,
  Search,
  Compass,
  Award,
  Lock,
  Eye,
  HelpCircle,
} from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';
import { Language, DICTIONARY } from '../lib/i18n';
import { getLocalizedSpecimen } from '../lib/biotaTranslations';

interface LogbookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredIds: Set<string>;
  discoveredRelicIds?: Set<string>;
  onSelectSpecimen: (specimen: BiotaSpecimen) => void;
  onSelectRelic?: (relic: ApocryphalRelic) => void;
  onJumpToSpecimenDepth: (depthMeters: number) => void;
  currentLang?: Language;
  onOpenCertificate?: () => void;
}

export const LogbookDrawer: React.FC<LogbookDrawerProps> = ({
  isOpen,
  onClose,
  discoveredIds,
  discoveredRelicIds = new Set<string>(),
  onSelectSpecimen,
  onSelectRelic,
  currentLang = 'en',
  onOpenCertificate,
}) => {
  const [drawerTab, setDrawerTab] = useState<'fauna' | 'relics'>('fauna');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = DICTIONARY[currentLang];

  if (!isOpen) return null;

  const categories = ['all', 'Fish', 'Cephalopod', 'Crustacean', 'Mammal', 'Jelly', 'Bioluminescent'];

  const filteredSpecimens = SPECIMENS.filter((base) => {
    const s = getLocalizedSpecimen(base, currentLang);
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'Bioluminescent'
        ? s.tagCategory === 'Bioluminescent' || s.zoneId === 'midnight' || s.zoneId === 'abyss' || s.zoneId === 'hadal'
        : s.tagCategory === selectedCategory);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      s.commonName.toLowerCase().includes(q) ||
      s.binomialName.toLowerCase().includes(q) ||
      s.japaneseName.toLowerCase().includes(q) ||
      s.plateNumber.toLowerCase().includes(q) ||
      s.observationNotes.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const discoveredCount = SPECIMENS.filter((s) => discoveredIds.has(s.id)).length;
  const progressPercent = ((discoveredCount / SPECIMENS.length) * 100).toFixed(0);

  const unlockedRelicsCount = APOCRYPHAL_RELICS.filter((r) => discoveredRelicIds.has(r.id)).length;

  const handleCardClick = (specimen: BiotaSpecimen) => {
    pelagiaAudio.playWaterBubble();
    onSelectSpecimen(specimen);
  };

  const handleJumpToSpecimen = (e: React.MouseEvent, specimenId: string) => {
    e.stopPropagation();
    pelagiaAudio.playWaterBubble();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(`specimen-${specimenId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm select-none transition-all duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-[#FAF6EE] text-[#1E252B] border-l-2 border-[#1E252B] shadow-paper-lg flex flex-col paper-grain animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b-2 border-[#1E252B] bg-[#F4ECE1] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#D95A47] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NATURALIST EXPEDITION ARCHIVE</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1E252B]">
              {drawerTab === 'fauna' ? t.rosterTitle : 'Apocryphal Relics Index'}
            </h2>
            <div className="text-xs font-mono text-[#626863] flex items-center gap-2">
              {drawerTab === 'fauna' ? (
                <span>{discoveredCount} / {SPECIMENS.length} {t.speciesStamped} ({progressPercent}%)</span>
              ) : (
                <span className="text-[#B45309] font-bold">
                  {unlockedRelicsCount} / {APOCRYPHAL_RELICS.length} Forbidden Relics Uncovered
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] hover:bg-[#D95A47] hover:text-white transition-colors shadow-paper-sm cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: 50 Fauna vs 8 Apocryphal Relics */}
        <div className="grid grid-cols-2 border-b-2 border-[#1E252B] bg-[#EBDDCB] font-mono text-xs font-bold text-center">
          <button
            onClick={() => {
              pelagiaAudio.playWaterBubble();
              setDrawerTab('fauna');
            }}
            className={`py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              drawerTab === 'fauna'
                ? 'bg-[#FAF6EE] text-[#1E252B] border-b-2 border-[#D95A47]'
                : 'text-[#626863] hover:bg-white/40'
            }`}
          >
            <span>🐟 50 FAUNA ({discoveredCount})</span>
          </button>

          <button
            onClick={() => {
              pelagiaAudio.playWaterBubble();
              setDrawerTab('relics');
            }}
            className={`py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              drawerTab === 'relics'
                ? 'bg-[#FAF6EE] text-[#D95A47] border-b-2 border-[#D95A47]'
                : 'text-[#626863] hover:bg-white/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>🏺 8 RELICS ({unlockedRelicsCount})</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#DEC6AE] h-2">
          <div
            className="bg-[#D95A47] h-full transition-all duration-500"
            style={{
              width: `${
                drawerTab === 'fauna'
                  ? progressPercent
                  : ((unlockedRelicsCount / APOCRYPHAL_RELICS.length) * 100).toFixed(0)
              }%`,
            }}
          />
        </div>

        {/* Certificate / Share Diploma Action Bar */}
        {onOpenCertificate && (
          <div className="px-4 py-2 bg-[#F4ECE1] border-b border-[#1E252B]/15 flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] text-[#626863]">
              Official Diploma:
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenCertificate();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EAA838]/25 border border-[#EAA838] text-[#9A6715] hover:bg-[#EAA838]/40 font-mono text-[10px] font-bold transition-all shadow-paper-sm cursor-pointer active:scale-95"
            >
              <Award className="w-3.5 h-3.5 text-[#B8781B]" />
              <span>VIEW & SHARE DIPLOMA</span>
            </button>
          </div>
        )}

        {/* TAB 1: 50 MARINE FAUNA ROSTER */}
        {drawerTab === 'fauna' && (
          <>
            {/* Live Search Input */}
            <div className="px-4 py-2.5 border-b border-[#1E252B]/15 bg-[#FAF6EE] flex items-center gap-2">
              <Search className="w-4 h-4 text-[#626863]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent border-none outline-none font-mono text-xs placeholder:text-[#626863]/60 text-[#1E252B]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-0.5 hover:text-[#D95A47] cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="p-3 border-b border-[#1E252B]/15 bg-[#FDFBF7] flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-[10px]">
              <Filter className="w-3.5 h-3.5 text-[#626863] ml-1 mr-1 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    pelagiaAudio.playWaterBubble();
                    setSelectedCategory(cat);
                  }}
                  className={`px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors uppercase font-bold cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1E252B] text-white border-[#1E252B]'
                      : 'bg-[#FAF6EE] text-[#626863] border-[#DEC6AE] hover:bg-[#EBDDCB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Specimen List with Swim/Jump Action */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {filteredSpecimens.map((baseSpecimen) => {
                const specimen = getLocalizedSpecimen(baseSpecimen, currentLang);
                const isLogged = discoveredIds.has(specimen.id);
                const zone = ZONES.find((z) => z.id === specimen.zoneId);

                return (
                  <div
                    key={specimen.id}
                    onClick={() => handleCardClick(specimen)}
                    className="group cursor-pointer p-3.5 rounded-xl border border-[#DEC6AE] bg-[#FDFBF7] hover:border-[#1E252B] hover:shadow-paper-sm transition-all duration-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#F4ECE1] border border-[#DEC6AE] flex items-center justify-center font-mono text-xs font-bold text-[#D95A47] group-hover:scale-105 transition-transform">
                        {specimen.plateNumber.replace('PL-', '')}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base text-[#1E252B] group-hover:text-[#D95A47] transition-colors">
                            {specimen.commonName}
                          </span>
                          {isLogged && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <div className="text-xs font-mono text-[#626863] flex items-center gap-2 mt-0.5">
                          <span>{specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}m` : `-${specimen.depthMeters}m`}</span>
                          <span>·</span>
                          <span className="italic font-serif">{specimen.binomialName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Swim directly to habitat button */}
                    <button
                      onClick={(e) => handleJumpToSpecimen(e, specimen.id)}
                      className="px-2.5 py-1 rounded bg-[#F4ECE1] hover:bg-[#D95A47] hover:text-white border border-[#DEC6AE] font-mono text-[10px] font-bold text-[#1E252B] transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                      title="Swim directly to this creature's depth"
                    >
                      <Compass className="w-3 h-3" />
                      <span className="hidden sm:inline">SWIM</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* TAB 2: 8 APOCRYPHAL RELICS (WITH CRYPTIC CLUES & HINTS!) */}
        {drawerTab === 'relics' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-[#F4ECE1] border border-[#DEC6AE] space-y-1 font-mono text-xs">
              <div className="font-bold text-[#D95A47] flex items-center gap-1.5 uppercase text-[11px]">
                <HelpCircle className="w-4 h-4" />
                <span>EXPEDITION CLUES // DEEP ANOMALIES</span>
              </div>
              <p className="text-[#626863] font-serif italic text-xs">
                "Eight enigmatic artifacts lie scattered from the Pacific sky to the tectonic mantle. Read the cryptic clues below and search the water column to uncover them."
              </p>
            </div>

            <div className="space-y-3">
              {APOCRYPHAL_RELICS.map((relic) => {
                const isFound = discoveredRelicIds.has(relic.id);

                return (
                  <div
                    key={relic.id}
                    onClick={() => {
                      if (isFound && onSelectRelic) {
                        pelagiaAudio.playWaterBubble();
                        onSelectRelic(relic);
                      }
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isFound
                        ? 'bg-[#FDFBF7] border-[#EAA838] shadow-paper-sm cursor-pointer hover:border-[#D95A47]'
                        : 'bg-[#F4ECE1]/60 border-dashed border-[#1E252B]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-[#D95A47]">
                            {relic.relicNumber}
                          </span>
                          <span className="font-mono text-[10px] text-[#626863]">
                            {relic.depthMeters <= 0 ? `+${Math.abs(relic.depthMeters)}M SHORE` : `-${relic.depthMeters}M DEPTH`}
                          </span>
                          {isFound ? (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold border border-emerald-300">
                              ✓ CLASSIFIED
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold border border-amber-300 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" />
                              <span>LOCKED</span>
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif font-bold text-base text-[#1E252B]">
                          {isFound ? relic.title : '??? Unidentified Bathymetric Anomaly'}
                        </h4>

                        {/* If Unlocked: Show Subtitle & Preview */}
                        {isFound ? (
                          <p className="font-serif italic text-xs text-[#626863]">
                            "{relic.subtitle}"
                          </p>
                        ) : (
                          /* If Locked: Display the CRYPTIC CLUE HINT! */
                          <div className="p-2.5 rounded bg-[#EBDDCB]/60 border border-[#DEC6AE] mt-1 space-y-1">
                            <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#D95A47] flex items-center gap-1">
                              <span>CRYPTIC DISCOVERY CLUE:</span>
                            </div>
                            <p className="font-serif text-xs text-[#2D312E] italic leading-relaxed">
                              "{relic.locationHint}"
                            </p>
                          </div>
                        )}
                      </div>

                      {isFound && (
                        <div className="flex flex-col items-end">
                          <button
                            className="px-2.5 py-1 rounded bg-[#EAA838]/20 hover:bg-[#EAA838] hover:text-white border border-[#EAA838] font-mono text-[10px] font-bold text-[#9A6715] transition-colors"
                          >
                            READ LOG
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
