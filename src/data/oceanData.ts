import { ZoneData, BiotaSpecimen } from '../types';

export const ZONES: ZoneData[] = [
  {
    id: 'coastal',
    name: 'Coastal Shore & Dunes',
    depthRange: '+10m to 0m',
    depthMin: -10,
    depthMax: 0,
    paperBg: 'bg-[#FDFBF7]',
    cardBg: 'bg-[#F7EFE2]',
    textColor: 'text-[#2D312E]',
    subtextColor: 'text-[#626863]',
    accentColor: '#D95A47', // Terracotta ink
    lightLevel: '100% Direct Sunlight',
    pressure: '1.0 ATM',
    temperature: '26°C - 31°C',
    summary: 'The sunlit boundary between continental soil and restless saltwater. Sea oats whisper in the breeze as ghost crabs scuttle across tidal flats.',
    quote: '"The edge of the sea is a strange and beautiful place." — Rachel Carson'
  },
  {
    id: 'sunlight',
    name: 'Epipelagic · Sunlight Realm',
    depthRange: '0m to -200m',
    depthMin: 0,
    depthMax: 200,
    paperBg: 'bg-[#EBF3EF]',
    cardBg: 'bg-[#DDECE5]',
    textColor: 'text-[#1B322D]',
    subtextColor: 'text-[#44665E]',
    accentColor: '#2F6D68', // Coastal Teal
    lightLevel: '90% - 1% Ambient Light',
    pressure: '1.0 to 21.0 ATM',
    temperature: '18°C - 27°C',
    summary: 'The nursery of marine life. Photosynthesis thrives in emerald-cyan water where corals branch and graceful pelagic migrators glide through filtered sunbeams.',
    quote: '"Under the sea, our world is colored in sapphire and liquid sun."'
  },
  {
    id: 'twilight',
    name: 'Mesopelagic · Twilight Domain',
    depthRange: '-200m to -1,000m',
    depthMin: 200,
    depthMax: 1000,
    paperBg: 'bg-[#D3E0EA]',
    cardBg: 'bg-[#BFCFD9]',
    textColor: 'text-[#162736]',
    subtextColor: 'text-[#3E5C73]',
    accentColor: '#346285', // Faded Indigo
    lightLevel: 'Dim Twilight (No Red Spectrum)',
    pressure: '21.0 to 101.0 ATM',
    temperature: '4°C - 10°C',
    summary: 'A ghostly realm where red wavelengths perish. Strange creatures navigate perpetual dusk with gargantuan telescopic lenses and silvery reflective scales.',
    quote: '"In this perpetual gloaming, light ceases to nourish and begins to deceive."'
  },
  {
    id: 'midnight',
    name: 'Bathypelagic · The Midnight Realm',
    depthRange: '-1,000m to -4,000m',
    depthMin: 1000,
    depthMax: 4000,
    paperBg: 'bg-[#232F3E]',
    cardBg: 'bg-[#192430]',
    textColor: 'text-[#EDE8DF]',
    subtextColor: 'text-[#8EA2B3]',
    accentColor: '#EAA838', // Bioluminescent Amber
    lightLevel: '0% Solar (Bioluminescence Only)',
    pressure: '101.0 to 401.0 ATM',
    temperature: '2°C - 4°C',
    summary: 'Eternal darkness reigns. The sun is completely extinguished. Only living sparks, glowing lures, and bioluminescent photophores pierce the cold black ink.',
    quote: '"Darkness here is not the absence of light, but an ancient, sovereign presence."'
  },
  {
    id: 'abyss',
    name: 'Abyssopelagic · The Abyssal Plains',
    depthRange: '-4,000m to -6,000m',
    depthMin: 4000,
    depthMax: 6000,
    paperBg: 'bg-[#151D26]',
    cardBg: 'bg-[#0E151C]',
    textColor: 'text-[#F4EDE2]',
    subtextColor: 'text-[#7D8F9E]',
    accentColor: '#6BB7B9', // Pale Abyssal Cyan
    lightLevel: 'Total Perpetual Aphotic',
    pressure: '401.0 to 601.0 ATM',
    temperature: '1°C - 2°C',
    summary: 'Vast, silent mud plains stretching across the seabed. Extreme hydrostatic compression demands delicate cartilaginous bodies and sensory stilts.',
    quote: '"Here lies the floor of our world, tranquil under mountains of cold water."'
  },
  {
    id: 'hadal',
    name: 'Hadalpelagic · The Oceanic Trenches',
    depthRange: '-6,000m to -10,994m',
    depthMin: 6000,
    depthMax: 11000,
    paperBg: 'bg-[#0B0F14]',
    cardBg: 'bg-[#06090D]',
    textColor: 'text-[#F9F7F1]',
    subtextColor: 'text-[#94A3B8]',
    accentColor: '#E06D53', // Deep Magma Terracotta
    lightLevel: 'Absolute Void (1,086 ATM)',
    pressure: '601.0 to 1,086.0 ATM',
    temperature: '1.1°C - 2.5°C',
    summary: 'The deepest wounds of Earth: tectonic trenches descending into the mantle. Pressure reaches 1.1 metric tons per square centimeter, yet life tenaciously endures.',
    quote: '"Challenger Deep: Earth’s utmost solitary threshold."'
  }
];

export const SPECIMENS: BiotaSpecimen[] = [
  // 1. Coastal Shore (+5m)
  {
    id: 'ghost-crab',
    plateNumber: 'PLATE 01 // LITTORAL',
    commonName: 'Atlantic Ghost Crab',
    binomialName: 'Ocypode quadrata',
    japaneseName: 'スナガニ (Sunagani)',
    zoneId: 'coastal',
    depthMeters: -2, // Above sea level
    lengthMeters: 0.05,
    weightKg: '0.04 kg',
    diet: 'Carrion, clams, sea turtle hatchlings',
    curiosityRating: 'Common',
    discoveryYear: '1787',
    observationNotes: 'Scuttles in rapid 360-degree bursts along twilight beaches. Its pale translucent carapace mimics fine quartz sand with uncanny precision.',
    anatomicalFeatures: [
      'Periscopic 360° compound eye stalks',
      'High-speed sideways galloping locomotion (up to 20 km/h)',
      'Gills moistened via subterranean damp sand chambers'
    ],
    papercraftType: 'ghost-crab'
  },
  // 2. Coastal Shore (+8m)
  {
    id: 'seagull',
    plateNumber: 'PLATE 02 // AERIAL',
    commonName: 'Herring Gull',
    binomialName: 'Larus argentatus',
    japaneseName: 'セグロカモメ (Segurokamome)',
    zoneId: 'coastal',
    depthMeters: -6,
    lengthMeters: 0.65,
    weightKg: '1.2 kg',
    diet: 'Fish, crustaceans, coastal mollusks',
    curiosityRating: 'Common',
    discoveryYear: '1763',
    observationNotes: 'Rides warm maritime thermals above crashing surf. Emits rhythmic territorial cries while scanning shallow shoals for silver silhouettes.',
    anatomicalFeatures: [
      'Salt-excreting supraorbital glands',
      'Aerodynamic wingtips calibrated for wind shear',
      'Yellow bill with red striking spot used for chick feeding'
    ],
    papercraftType: 'seagull'
  },
  // 3. Sunlight Zone (-15m)
  {
    id: 'clownfish-anemone',
    plateNumber: 'PLATE 03 // EPIPELAGIC',
    commonName: 'Ocellaris Clownfish & Magnificent Anemone',
    binomialName: 'Amphiprion ocellaris & Heteractis magnifica',
    japaneseName: 'カクレクマノミ (Kakurekumanomi)',
    zoneId: 'sunlight',
    depthMeters: 15,
    lengthMeters: 0.11,
    weightKg: '0.025 kg',
    diet: 'Zooplankton, algae, anemone parasites',
    curiosityRating: 'Common',
    discoveryYear: '1830',
    observationNotes: 'Dances within stinging paper tentacles without harm. A thick lipid mucus coat prevents anemone nematocyst fire in mutualist perfection.',
    anatomicalFeatures: [
      'Mucus-based chemical cloaking against anemone venom',
      'Protandrous hermaphroditic social hierarchy',
      'Distinctive three-band white porcelain lacquer markings'
    ],
    papercraftType: 'clownfish-anemone'
  },
  // 4. Sunlight Zone (-35m)
  {
    id: 'green-turtle',
    plateNumber: 'PLATE 04 // EPIPELAGIC',
    commonName: 'Green Sea Turtle',
    binomialName: 'Chelonia mydas',
    japaneseName: 'アオウミガメ (Aoumigame)',
    zoneId: 'sunlight',
    depthMeters: 35,
    lengthMeters: 1.5,
    weightKg: '160 kg',
    diet: 'Seagrass, marine macroalgae, jellyfish',
    curiosityRating: 'Rare',
    discoveryYear: '1758',
    observationNotes: 'Glides like an ancient kite through sunlit seagrass meadows. Navigates entire ocean basins using geomagnetic sensory crystals in its skull.',
    anatomicalFeatures: [
      'Hydrodynamic teardrop-shaped bone carapace',
      'Modified pectoral paddle-flippers with serrated claw remnants',
      'Heart rate reduces to 1 beat per 9 minutes during sleep dives'
    ],
    papercraftType: 'green-turtle'
  },
  // 5. Sunlight Zone (-80m)
  {
    id: 'manta-ray',
    plateNumber: 'PLATE 05 // EPIPELAGIC',
    commonName: 'Giant Oceanic Manta Ray',
    binomialName: 'Mobula birostris',
    japaneseName: 'オニイトマキエイ (Oniitomakiei)',
    zoneId: 'sunlight',
    depthMeters: 80,
    lengthMeters: 7.0,
    weightKg: '1,400 kg',
    diet: 'Krill, planktonic blooms, fish larvae',
    curiosityRating: 'Rare',
    discoveryYear: '1798',
    observationNotes: 'Wings span seven meters of quiet velvet. Performs slow barrel-rolls across tidal convergence zones, scooping plankton through cephalic horns.',
    anatomicalFeatures: [
      'Highest brain-to-body mass ratio of all cold-blooded fish',
      'Flexible cephalic lobes that unfurl into funnel scoops',
      'Unique ventral spot patterns permanent as fingerprints'
    ],
    papercraftType: 'manta-ray'
  },
  // 6. Sunlight Zone (-140m)
  {
    id: 'whale-shark',
    plateNumber: 'PLATE 06 // EPIPELAGIC',
    commonName: 'Whale Shark',
    binomialName: 'Rhincodon typus',
    japaneseName: 'ジンベエザメ (Jinbeezame)',
    zoneId: 'sunlight',
    depthMeters: 140,
    lengthMeters: 12.0,
    weightKg: '19,000 kg',
    diet: 'Plankton, micro-crustaceans, fish eggs',
    curiosityRating: 'Mythical',
    discoveryYear: '1828',
    observationNotes: 'A colossal, benevolent wanderer. Its slate-blue flank carries a constellation of star-like ivory dots, cruising at an unhurried 5 kilometers per hour.',
    anatomicalFeatures: [
      'Massive 1.5-meter filter-feeding transverse mouth',
      'Over 3,000 microscopic vestigial teeth arranged in 300 rows',
      'Carapace skin armored with thousands of dermal denticles'
    ],
    papercraftType: 'whale-shark'
  },
  // 7. Twilight Zone (-380m)
  {
    id: 'giant-oarfish',
    plateNumber: 'PLATE 07 // MESOPELAGIC',
    commonName: 'Giant Oarfish · King of Herrings',
    binomialName: 'Regalecus glesne',
    japaneseName: 'リュウグウノツカイ (Ryugu-no-tsukai)',
    zoneId: 'twilight',
    depthMeters: 380,
    lengthMeters: 8.5,
    weightKg: '270 kg',
    diet: 'Euphausiids, small pelagic squid, jellyfish',
    curiosityRating: 'Mythical',
    discoveryYear: '1772',
    observationNotes: 'The origin of historic sea serpent legends. Hangs vertically suspended in indigo silence, undulating its crimson dorsal crest to detect subtle water currents.',
    anatomicalFeatures: [
      'Scaleless silvery paper body dusted with guanine crystals',
      'Brilliant crimson dorsal crest consisting of 400+ rays',
      'Propels itself primarily via amiiform wave locomotion'
    ],
    papercraftType: 'giant-oarfish'
  },
  // 8. Twilight Zone (-650m)
  {
    id: 'barreleye',
    plateNumber: 'PLATE 08 // MESOPELAGIC',
    commonName: 'Barreleye Fish',
    binomialName: 'Macropinna microstoma',
    japaneseName: 'デメニギス (Demenigisu)',
    zoneId: 'twilight',
    depthMeters: 650,
    lengthMeters: 0.15,
    weightKg: '0.12 kg',
    diet: 'Siphonophores, zooplankton trapped in jellyfish tentacles',
    curiosityRating: 'Rare',
    discoveryYear: '1939',
    observationNotes: 'Possesses a completely transparent fluid-filled dome skull. Its bright emerald-green tubular eyes rotate inside its head to spot shadows passing overhead.',
    anatomicalFeatures: [
      'Crystal-clear transparent cranial fluid shield',
      'Tubular eyes with glowing green bioluminescent light filters',
      'Large flat fins that allow precise stationary hovering'
    ],
    papercraftType: 'barreleye'
  },
  // 9. Twilight Zone (-880m)
  {
    id: 'glass-squid',
    plateNumber: 'PLATE 09 // MESOPELAGIC',
    commonName: 'Cockatoo Glass Squid',
    binomialName: 'Taonius borealis',
    japaneseName: 'サメハダホウズキイカ (Samehadahozuki-ika)',
    zoneId: 'twilight',
    depthMeters: 880,
    lengthMeters: 0.5,
    weightKg: '0.4 kg',
    diet: 'Small mesopelagic crustaceans and lanternfish',
    curiosityRating: 'Rare',
    discoveryYear: '1882',
    observationNotes: 'A living glass vase floating in darkness. Only its opaque digestive gland and ink sac cast shadows, which it conceals using counter-illuminating photophores.',
    anatomicalFeatures: [
      'Optical transparency throughout 95% of tissue volume',
      'Ammonium chloride coelomic buoyancy chamber',
      'Photophore ring beneath eyes that cancels its downward silhouette'
    ],
    papercraftType: 'glass-squid'
  },
  // 10. Midnight Zone (-1,450m)
  {
    id: 'anglerfish',
    plateNumber: 'PLATE 10 // BATHYPELAGIC',
    commonName: 'Humpback Anglerfish',
    binomialName: 'Melanocetus johnsonii',
    japaneseName: 'ペリカンアンコウ (Pelikan-ankou)',
    zoneId: 'midnight',
    depthMeters: 1450,
    lengthMeters: 0.2,
    weightKg: '0.5 kg',
    diet: 'Fish and crustaceans lured by photophore glow',
    curiosityRating: 'Abyssal',
    discoveryYear: '1864',
    observationNotes: 'Dangles a living lantern filled with symbiotic glowing bacteria. Her translucent needles of teeth hinge inward so struggling prey cannot escape.',
    anatomicalFeatures: [
      'Illicium (fishing rod dorsal spine) tipped with a glowing esca',
      'Extreme sexual dimorphism (dwarf parasitic males)',
      'Highly distensible stomach accommodating prey twice its size'
    ],
    papercraftType: 'anglerfish'
  },
  // 11. Midnight Zone (-2,200m)
  {
    id: 'gulper-eel',
    plateNumber: 'PLATE 11 // BATHYPELAGIC',
    commonName: 'Pelican Gulper Eel',
    binomialName: 'Eurypharynx pelecanoides',
    japaneseName: 'フクロウナギ (Fukuro-unagi)',
    zoneId: 'midnight',
    depthMeters: 2200,
    lengthMeters: 1.0,
    weightKg: '0.8 kg',
    diet: 'Crustaceans, squid, and sinking detritus',
    curiosityRating: 'Abyssal',
    discoveryYear: '1882',
    observationNotes: 'Its head is an enormous origami pouch. The jaws can unhinge into a cavernous scoop four times the volume of its own body, tipped with a ruby bioluminescent tail.',
    anatomicalFeatures: [
      'Loose hinged jaws comprising over a quarter of total body length',
      'Whip-like tail with glowing red and pink photophore bulb',
      'Drastically reduced skeleton and vestigial swim bladder'
    ],
    papercraftType: 'gulper-eel'
  },
  // 12. Midnight Zone (-3,100m)
  {
    id: 'vampire-squid',
    plateNumber: 'PLATE 12 // BATHYPELAGIC',
    commonName: 'Vampire Squid from Hell',
    binomialName: 'Vampyroteuthis infernalis',
    japaneseName: 'コウモリダコ (Komoridako)',
    zoneId: 'midnight',
    depthMeters: 3100,
    lengthMeters: 0.3,
    weightKg: '0.45 kg',
    diet: 'Marine snow, organic fecal pellets, discarded plankton',
    curiosityRating: 'Abyssal',
    discoveryYear: '1903',
    observationNotes: 'Neither a true squid nor an octopus, but a living fossil relic. Inverted within a velvet black webbed cloak, it feeds entirely on sinking marine snow with two retractable filaments.',
    anatomicalFeatures: [
      'Eight arms webbed together in a dark cape lined with fleshy cirri',
      'Ejects a cloud of glowing bioluminescent mucus instead of black ink',
      'Lowest mass-specific metabolic rate of any cephalopod'
    ],
    papercraftType: 'vampire-squid'
  },
  // 13. Abyssal Plains (-4,200m)
  {
    id: 'dumbo-octopus',
    plateNumber: 'PLATE 13 // ABYSSOPELAGIC',
    commonName: 'Dumbo Octopus',
    binomialName: 'Grimpoteuthis',
    japaneseName: 'ダンボオクトパス (Danbo-okutopasu)',
    zoneId: 'abyss',
    depthMeters: 4200,
    lengthMeters: 0.3,
    weightKg: '0.9 kg',
    diet: 'Benthic isopods, copepods, bristle worms',
    curiosityRating: 'Rare',
    discoveryYear: '1883',
    observationNotes: 'Flaps two soft ear-like fins like a paper marionette. Drifts peacefully millimeters above the abyssal sediment without making a sound.',
    anatomicalFeatures: [
      'Pectoral fins positioned above eyes resembling elephant ears',
      'Webbed arms forming an umbrella-like swimming bell',
      'Complete lack of an ink sac due to the total absence of predators'
    ],
    papercraftType: 'dumbo-octopus'
  },
  // 14. Abyssal Plains (-5,150m)
  {
    id: 'tripod-fish',
    plateNumber: 'PLATE 14 // ABYSSOPELAGIC',
    commonName: 'Tripod Spiderfish',
    binomialName: 'Bathypterois grallator',
    japaneseName: 'イトヒキイワシ (Itohiki-iwashi)',
    zoneId: 'abyss',
    depthMeters: 5150,
    lengthMeters: 0.35,
    weightKg: '0.3 kg',
    diet: 'Benthic mysid shrimp, planktonic detritus',
    curiosityRating: 'Abyssal',
    discoveryYear: '1886',
    observationNotes: 'Stands motionless on three elongated needle-like pelvic and caudal fins. Faces directly into the slow abyssal bottom current, waiting for prey to drift into its pectoral touch sensors.',
    anatomicalFeatures: [
      'Pelvic fins elongated up to 1 meter serving as rigid stilts',
      'Nearly blind degenerate eyes replaced by tactile pectoral fin rays',
      'Simultaneous hermaphrodite capable of self-fertilization'
    ],
    papercraftType: 'tripod-fish'
  },
  // 15. Hadal Trench (-8,145m)
  {
    id: 'mariana-snailfish',
    plateNumber: 'PLATE 15 // HADALPELAGIC',
    commonName: 'Mariana Snailfish',
    binomialName: 'Pseudoliparis swirei',
    japaneseName: 'マリアナスネイルフィッシュ',
    zoneId: 'hadal',
    depthMeters: 8145,
    lengthMeters: 0.28,
    weightKg: '0.16 kg',
    diet: 'Hadal amphipods (Hirondellea gigas)',
    curiosityRating: 'Mythical',
    discoveryYear: '2017',
    observationNotes: 'The deepest-dwelling vertebrate known to science. Pink, scaleless, and translucent as tracing paper, its cells are supercharged with TMAO piezolytes that prevent protein denaturation under 800 atmospheres.',
    anatomicalFeatures: [
      'Extremely dense cellular concentrations of TMAO (piezolyte)',
      'Fused pelvic sucking disc for clinging to canyon rocks',
      'Thin unmineralized cartilaginous skull resistant to cracking'
    ],
    papercraftType: 'mariana-snailfish'
  },
  // 16. Challenger Deep (-10,920m)
  {
    id: 'hadal-amphipod',
    plateNumber: 'PLATE 16 // HADALPELAGIC',
    commonName: 'Giant Hadal Amphipod',
    binomialName: 'Hirondellea gigas',
    japaneseName: 'カイコウオオソコエビ (Kaikou-oosokoebi)',
    zoneId: 'hadal',
    depthMeters: 10920,
    lengthMeters: 0.05,
    weightKg: '0.008 kg',
    diet: 'Wood debris, sinking dead organic matter, sulfur bacteria',
    curiosityRating: 'Mythical',
    discoveryYear: '1899',
    observationNotes: 'Swarms in absolute darkness at the bottom of Challenger Deep. Produces a unique aluminum gel coating on its shell derived from sediment minerals to withstand 1,086 atmospheres of crushing hydrostatic load.',
    anatomicalFeatures: [
      'Endogenous cell-surface aluminum hydroxide protective armor',
      'Cellulase enzyme capable of digesting sunken wood chips',
      'Hyper-efficient anaerobic-tolerant metabolic pathways'
    ],
    papercraftType: 'hadal-amphipod'
  }
];
