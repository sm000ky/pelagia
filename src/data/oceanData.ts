import { ZoneData, BiotaSpecimen } from '../types';

export const ZONES: ZoneData[] = [
  {
    id: 'coastal',
    name: 'Coastal Shore & Dunes',
    depthRange: '+10m to 0m',
    depthMin: -10,
    depthMax: 0,
    paperBg: 'bg-[#F4E7D3]',
    cardBg: 'bg-[#EBDDCB]',
    textColor: 'text-[#2D312E]',
    subtextColor: 'text-[#626863]',
    accentColor: '#D95A47',
    lightLevel: '100% Direct Sunlight',
    pressure: '1.0 ATM',
    temperature: '26°C - 31°C',
    summary: 'The sunlit threshold where dry dunes meet salt spray. Ghost crabs scuttle through quartz sand as gulls wheel overhead.',
    quote: '"The edge of the sea is a strange and beautiful place." — Rachel Carson'
  },
  {
    id: 'sunlight',
    name: 'Epipelagic · Sunlight Realm',
    depthRange: '0m to -200m',
    depthMin: 0,
    depthMax: 200,
    paperBg: 'bg-[#6CAE9E]',
    cardBg: 'bg-[#50857D]',
    textColor: 'text-[#1B322D]',
    subtextColor: 'text-[#365750]',
    accentColor: '#2F6D68',
    lightLevel: '90% - 1% Ambient Light',
    pressure: '1.0 to 21.0 ATM',
    temperature: '18°C - 27°C',
    summary: 'The ocean’s luminous canopy. Corals bloom in filtered emerald beams while gentle leviathans glide through schools of silver fish.',
    quote: '"Under the sea, our world is colored in sapphire and liquid sun."'
  },
  {
    id: 'twilight',
    name: 'Mesopelagic · Twilight Domain',
    depthRange: '-200m to -1,000m',
    depthMin: 200,
    depthMax: 1000,
    paperBg: 'bg-[#1D445A]',
    cardBg: 'bg-[#163244]',
    textColor: 'text-[#EDE8DF]',
    subtextColor: 'text-[#94A3B8]',
    accentColor: '#5DADE2',
    lightLevel: 'Dim Twilight (No Red Spectrum)',
    pressure: '21.0 to 101.0 ATM',
    temperature: '4°C - 10°C',
    summary: 'A ghostly realm where red wavelengths perish. Strange creatures navigate perpetual dusk with gargantuan telescopic lenses and silvery scales.',
    quote: '"In this perpetual gloaming, light ceases to nourish and begins to deceive."'
  },
  {
    id: 'midnight',
    name: 'Bathypelagic · The Midnight Realm',
    depthRange: '-1,000m to -4,000m',
    depthMin: 1000,
    depthMax: 4000,
    paperBg: 'bg-[#101E2B]',
    cardBg: 'bg-[#0C1620]',
    textColor: 'text-[#EDE8DF]',
    subtextColor: 'text-[#8EA2B3]',
    accentColor: '#EAA838',
    lightLevel: '0% Solar (Bioluminescence Only)',
    pressure: '101.0 to 401.0 ATM',
    temperature: '2°C - 4°C',
    summary: 'Eternal darkness reigns. The sun is completely extinguished. Living sparks, glowing lures, and bioluminescent photophores pierce the cold black ink.',
    quote: '"Darkness here is not the absence of light, but an ancient, sovereign presence."'
  },
  {
    id: 'abyss',
    name: 'Abyssopelagic · The Abyss',
    depthRange: '-4,000m to -6,000m',
    depthMin: 4000,
    depthMax: 6000,
    paperBg: 'bg-[#0A121A]',
    cardBg: 'bg-[#070D13]',
    textColor: 'text-[#F4ECE1]',
    subtextColor: 'text-[#64748B]',
    accentColor: '#8E44AD',
    lightLevel: 'Absolute Void',
    pressure: '401.0 to 601.0 ATM',
    temperature: '1°C - 2°C',
    summary: 'The vast oceanic desert bed. Water pressure crushes steel hulls as living fossils and tripod stilt-walkers rest quietly on cushions of silken sediment.',
    quote: '"At the bottom of silence, life forgets the sun and remembers eternity."'
  },
  {
    id: 'hadal',
    name: 'Hadalpelagic · The Trenches',
    depthRange: '-6,000m to -10,994m',
    depthMin: 6000,
    depthMax: 10994,
    paperBg: 'bg-[#04080D]',
    cardBg: 'bg-[#020508]',
    textColor: 'text-[#F9F7F1]',
    subtextColor: 'text-[#475569]',
    accentColor: '#E74C3C',
    lightLevel: 'Challenger Deep Void',
    pressure: '601.0 to 1,086.0 ATM',
    temperature: '1°C - 4°C (Geothermal Vents)',
    summary: 'The deepest tectonic scars on Earth. Translucent snailfish and armored supergiant amphipods thrive under 16,000 pounds of pressure per square inch.',
    quote: '"Here Earth folds beneath herself into the Challenger Deep."'
  }
];

export const SPECIMENS: BiotaSpecimen[] = [
  // =========================================================================
  // ZONE 0: COASTAL SHORE (+10m to 0m) — 5 SPECIES
  // =========================================================================
  {
    id: 'ghost-crab',
    plateNumber: 'PL-01',
    commonName: 'Atlantic Ghost Crab',
    binomialName: 'Ocypode quadrata',
    japaneseName: 'スナガニ (Sunagani)',
    zoneId: 'coastal',
    depthMeters: -5,
    lengthMeters: 0.08,
    weightKg: '0.05 kg',
    diet: 'Clams, turtle hatchlings, organic detritus',
    curiosityRating: 'Common',
    discoveryYear: '1787',
    observationNotes: 'Pale translucent carapace reflecting quartz sand. Dashes across dune slopes at speeds up to 20 km/h with 360-degree periscopic vision.',
    anatomicalFeatures: [
      'Clubbed compound eyes capable of 360° omnidirectional tracking',
      'Tufts of specialized gill hairs that absorb moisture from damp sand',
      'Asymmetrical cheliped claws used for territorial bioacoustic stridulation'
    ],
    hotspots: [
      { id: 'h1', title: 'Periscopic Eyes', description: 'Can rotate independently to scan skyward for seagulls while burrowing.', xPercent: 50, yPercent: 28 },
      { id: 'h2', title: 'Stridulating Ridge', description: 'Rubs ridges inside claw to produce warning rasp sound.', xPercent: 30, yPercent: 65 }
    ],
    papercraftType: 'ghost-crab',
    tagCategory: 'Crustacean'
  },
  {
    id: 'seagull',
    plateNumber: 'PL-02',
    commonName: 'Pacific Gull',
    binomialName: 'Larus pacificus',
    japaneseName: 'オオセグロカモメ (Oosegurokamome)',
    zoneId: 'coastal',
    depthMeters: -8,
    lengthMeters: 0.65,
    weightKg: '1.2 kg',
    diet: 'Shellfish, schooling sardines, sea urchins',
    curiosityRating: 'Common',
    discoveryYear: '1801',
    observationNotes: 'Broad wingspan riding coastal thermals. Drops hard-shelled mollusks onto jagged granite reefs from 15 meters above to crack their valves.',
    anatomicalFeatures: [
      'Heavy hooked amber beak equipped with a vivid scarlet gonys spot',
      'Supraorbital salt glands that extract and excrete brine through nostrils',
      'Water-repellent layered plumage coated in preen gland wax'
    ],
    hotspots: [
      { id: 'h1', title: 'Gonys Spot', description: 'Red patch on lower mandible pecked by chicks to prompt regurgitation.', xPercent: 18, yPercent: 38 },
      { id: 'h2', title: 'Salt Gland Nostrils', description: 'Excretes hyper-saline fluid allowing consumption of pure seawater.', xPercent: 26, yPercent: 32 }
    ],
    papercraftType: 'seagull',
    tagCategory: 'Fish'
  },
  {
    id: 'hermit-crab',
    plateNumber: 'PL-03',
    commonName: 'Common Hermit Crab',
    binomialName: 'Pagurus bernhardus',
    japaneseName: 'ヤドカリ (Yadokari)',
    zoneId: 'coastal',
    depthMeters: -2,
    lengthMeters: 0.12,
    weightKg: '0.08 kg',
    diet: 'Algae, decaying wrack, small worms',
    curiosityRating: 'Common',
    discoveryYear: '1758',
    observationNotes: 'Inhabits discarded whelk shells. Participates in social vacancy chains on shoreline rocks where crabs queue up in size order to swap shells.',
    anatomicalFeatures: [
      'Soft uncalcified asymmetrical abdomen curved to grip shell spiral columella',
      'Modified fourth and fifth thoracic legs that clamp firmly against internal shell wall',
      'Heavy right cheliped acting as an impenetrable armored operculum door'
    ],
    hotspots: [
      { id: 'h1', title: 'Locking Claw Door', description: 'Completely seals the shell aperture when pulled inside.', xPercent: 32, yPercent: 55 },
      { id: 'h2', title: 'Columellar Hooks', description: 'Micro-uropods at abdomen tip that anchor with tremendous leverage.', xPercent: 68, yPercent: 62 }
    ],
    papercraftType: 'hermit-crab',
    tagCategory: 'Crustacean'
  },
  {
    id: 'shore-plover',
    plateNumber: 'PL-04',
    commonName: 'Shore Plover',
    binomialName: 'Thinornis novaeseelandiae',
    japaneseName: 'チドリ (Chidori)',
    zoneId: 'coastal',
    depthMeters: -4,
    lengthMeters: 0.20,
    weightKg: '0.06 kg',
    diet: 'Sand amphipods, polychaete worms',
    curiosityRating: 'Rare',
    discoveryYear: '1789',
    observationNotes: 'Delicate shorebird foraging on wave-wet sandbars. Feigns broken wing displays to lure beach predators away from camouflaged shingle nests.',
    anatomicalFeatures: [
      'Bright coral-red bill with dark tip tuned for probing wet littoral sand',
      'High-aspect ratio wings for rapid acceleration off wave crests',
      'Patterned mottled slate-and-parchment camouflage'
    ],
    hotspots: [
      { id: 'h1', title: 'Sensory Bill Tip', description: 'Herbst corpuscles detect pressure waves made by burrowing worms.', xPercent: 20, yPercent: 42 }
    ],
    papercraftType: 'shore-plover',
    tagCategory: 'Fish'
  },
  {
    id: 'marine-iguana',
    plateNumber: 'PL-05',
    commonName: 'Marine Iguana',
    binomialName: 'Amblyrhynchus cristatus',
    japaneseName: 'ウミイグアナ (Umi-Iguana)',
    zoneId: 'coastal',
    depthMeters: -1,
    lengthMeters: 1.3,
    weightKg: '12 kg',
    diet: 'Subtidal marine red and green macroalgae',
    curiosityRating: 'Rare',
    discoveryYear: '1825',
    observationNotes: 'The only modern marine lizard. Forages among surge rocks and expels white puffs of concentrated salt brine through explosive nasal sneezes.',
    anatomicalFeatures: [
      'Laterally flattened swimming tail driving powerful sinusoidal propulsion',
      'Razor-sharp recurved claws designed to grip volcanic rock against heavy surf',
      'Thermal melanistic black dermal plates for basking in equatorial sun'
    ],
    hotspots: [
      { id: 'h1', title: 'Nasal Desalination Glands', description: 'Shoots high-pressure salt crystals from nostrils after dives.', xPercent: 18, yPercent: 35 },
      { id: 'h2', title: 'Lava Claws', description: 'Anchors against 4-meter Pacific breaker currents.', xPercent: 45, yPercent: 78 }
    ],
    papercraftType: 'marine-iguana',
    tagCategory: 'Reptile'
  },

  // =========================================================================
  // ZONE 1: EPIPELAGIC · SUNLIGHT REALM (0m to -200m) — 12 SPECIES
  // =========================================================================
  {
    id: 'clownfish-anemone',
    plateNumber: 'PL-06',
    commonName: 'Clownfish & Bubble Anemone',
    binomialName: 'Amphiprion ocellaris',
    japaneseName: 'カクレクマノミ (Kakurekumanomi)',
    zoneId: 'sunlight',
    depthMeters: 15,
    lengthMeters: 0.11,
    weightKg: '0.04 kg',
    diet: 'Zooplankton, copepods, algae',
    curiosityRating: 'Common',
    discoveryYear: '1830',
    observationNotes: 'Lives in mutualistic harmony within stinging nematocyst tentacles. Its mucous coat mimics anemone chemical signatures to prevent harpoon triggers.',
    anatomicalFeatures: [
      'Thick antigen-mimicking mucosal layer preventing stinging cnidocyte discharge',
      'Bright orange pigmentation with three crisp white enamel vertical bands',
      'Protandrous hermaphroditism permitting dominant male to transition to female'
    ],
    hotspots: [
      { id: 'h1', title: 'Mucus Shield', description: 'Sugary protein coat that tricks anemone tentacles into treating it as self.', xPercent: 44, yPercent: 46 }
    ],
    papercraftType: 'clownfish-anemone',
    tagCategory: 'Fish'
  },
  {
    id: 'green-turtle',
    plateNumber: 'PL-07',
    commonName: 'Green Sea Turtle',
    binomialName: 'Chelonia mydas',
    japaneseName: 'アオウミガメ (Aoumigame)',
    zoneId: 'sunlight',
    depthMeters: 45,
    lengthMeters: 1.5,
    weightKg: '160 kg',
    diet: 'Seagrass meadows, sponges, pelagic jellyfish',
    curiosityRating: 'Common',
    discoveryYear: '1758',
    observationNotes: 'Ancient marine navigator traversing thousands of oceanic miles using geomagnetic sense. Glides through sunlit shallows with wing-like pectoral strokes.',
    anatomicalFeatures: [
      'Hydrodynamic teardrop carapace with marbled jade and umber scutes',
      'Paddle-shaped pectoral flippers functioning as biological foil wings',
      'Internal magnetic compass magnetite crystals inside ethmoid skull region'
    ],
    hotspots: [
      { id: 'h1', title: 'Magnetic Compass', description: 'Brain tissue contains magnetite that senses Earth’s geomagnetic angle.', xPercent: 22, yPercent: 32 },
      { id: 'h2', title: 'Pectoral Foil', description: 'Flaps in continuous figure-8 stroke producing horizontal thrust.', xPercent: 55, yPercent: 68 }
    ],
    papercraftType: 'green-turtle',
    tagCategory: 'Reptile'
  },
  {
    id: 'manta-ray',
    plateNumber: 'PL-08',
    commonName: 'Reef Manta Ray',
    binomialName: 'Mobula alfredi',
    japaneseName: 'ナンヨウマンタ (Nanyoumanta)',
    zoneId: 'sunlight',
    depthMeters: 70,
    lengthMeters: 4.5,
    weightKg: '700 kg',
    diet: 'Microscopic pelagic zooplankton',
    curiosityRating: 'Rare',
    discoveryYear: '1868',
    observationNotes: 'Gentle oceanic glider performing somersault feeding loops in rich plankton corridors. Cephalic horns unfurl into wide funnel guides.',
    anatomicalFeatures: [
      'Diamond pectoral wings with high span-to-chord aerodynamic aspect ratio',
      'Pair of flexible cephalic fins channeling water into gaping filter mouth',
      'Complex gill raker filter plates retaining plankton down to 100 microns'
    ],
    hotspots: [
      { id: 'h1', title: 'Cephalic Lobes', description: 'Roll into tight horns when cruising, unroll into plankton scoops.', xPercent: 34, yPercent: 26 },
      { id: 'h2', title: 'Unique Belly Spots', description: 'Belly spot arrangement is as unique as a human fingerprint.', xPercent: 58, yPercent: 55 }
    ],
    papercraftType: 'manta-ray',
    tagCategory: 'Fish'
  },
  {
    id: 'lions-mane-jelly',
    plateNumber: 'PL-09',
    commonName: "Lion's Mane Jellyfish",
    binomialName: 'Cyanea capillata',
    japaneseName: 'キタユウレイクラゲ (Kitayuureikurage)',
    zoneId: 'sunlight',
    depthMeters: 90,
    lengthMeters: 12.0,
    weightKg: '150 kg',
    diet: 'Larval fishes, ctenophores, moon jellyfish',
    curiosityRating: 'Rare',
    discoveryYear: '1758',
    observationNotes: 'A translucent crimson bell trailing thousands of gossamer hair-like tentacles. Drifts silently through cold northern currents like a living lace cathedral.',
    anatomicalFeatures: [
      'Eight-lobed undulating bell rim containing rhopalia equilibrium sensors',
      'Over 1,200 fine stinging tentacles reaching lengths up to 30 meters',
      'Bioluminescent blue-green pulsing mantle activated when mechanically agitated'
    ],
    hotspots: [
      { id: 'h1', title: 'Rhopalia Sensors', description: 'Light-sensing ocelli and gravity-sensing statoliths around bell margin.', xPercent: 50, yPercent: 32 },
      { id: 'h2', title: 'Capillary Tentacles', description: 'Contains millions of explosive barbed micro-harpoons.', xPercent: 50, yPercent: 78 }
    ],
    papercraftType: 'lions-mane-jelly',
    tagCategory: 'Jelly'
  },
  {
    id: 'whale-shark',
    plateNumber: 'PL-10',
    commonName: 'Whale Shark',
    binomialName: 'Rhincodon typus',
    japaneseName: 'ジンベエザメ (Jinbeezame)',
    zoneId: 'sunlight',
    depthMeters: 120,
    lengthMeters: 12.5,
    weightKg: '19,000 kg',
    diet: 'Plankton, krill swarms, fish eggs',
    curiosityRating: 'Rare',
    discoveryYear: '1828',
    observationNotes: 'The largest living fish in Earth’s oceans. Decorated with thousands of ivory constellations across slate-blue skin. Feeds by passive cross-flow filtration.',
    anatomicalFeatures: [
      'Wide transverse 1.5-meter mouth positioned terminal on the snout',
      'Skin up to 10 cm thick composed of dense collagenous fibers and tooth-like dermal denticles',
      'Distinctive celestial pattern of white spots and vertical stripes'
    ],
    hotspots: [
      { id: 'h1', title: 'Filter Pads', description: 'Spongy mesh that sifts millions of liters of sea water per hour.', xPercent: 24, yPercent: 44 },
      { id: 'h2', title: 'Dermal Armor', description: 'Nearly bulletproof layer of interlocking mineralized scales.', xPercent: 62, yPercent: 40 }
    ],
    papercraftType: 'whale-shark',
    tagCategory: 'Fish'
  },
  {
    id: 'blue-whale',
    plateNumber: 'PL-11',
    commonName: 'Antarctic Blue Whale',
    binomialName: 'Balaenoptera musculus',
    japaneseName: 'シロナガスクジラ (Shironagasukujira)',
    zoneId: 'sunlight',
    depthMeters: 160,
    lengthMeters: 29.9,
    weightKg: '180,000 kg',
    diet: 'Euphausiid krill (up to 4 tons daily)',
    curiosityRating: 'Mythical',
    discoveryYear: '1758',
    observationNotes: 'The most colossal animal ever known to inhabit the cosmos. Emits low-frequency infrasonic pulses capable of reverberating across entire ocean basins.',
    anatomicalFeatures: [
      'Pleated ventral throat grooves expanding into a gargantuan engulfed water parachute',
      'Baleen rack with 300 to 400 keratin plates per side acting as a filter sieve',
      'Heart the size of a small car pumping 220 liters of blood per heartbeat'
    ],
    hotspots: [
      { id: 'h1', title: 'Infrasound Chamber', description: 'Emits 180 dB calls at 10-40 Hz that travel over 1,000 kilometers.', xPercent: 32, yPercent: 40 },
      { id: 'h2', title: 'Ventral Throat Pleats', description: 'Expands mouth cavity to hold 90 tons of seawater in a single lunge.', xPercent: 40, yPercent: 60 }
    ],
    papercraftType: 'blue-whale',
    tagCategory: 'Mammal'
  },
  {
    id: 'great-white',
    plateNumber: 'PL-12',
    commonName: 'Great White Shark',
    binomialName: 'Carcharodon carcharias',
    japaneseName: 'ホホジロザメ (Hohojirozame)',
    zoneId: 'sunlight',
    depthMeters: 80,
    lengthMeters: 5.2,
    weightKg: '1,100 kg',
    diet: 'Pinnipeds, sea lions, tuna, cetacean carcasses',
    curiosityRating: 'Rare',
    discoveryYear: '1758',
    observationNotes: 'Apex pelagic predator with countershaded white belly and slate-gray dorsal plane. Can breach completely out of water when stalking seal prey.',
    anatomicalFeatures: [
      'Ampullae of Lorenzini electro-receptors sensing microvolt muscle twitches',
      'Serrated triangular cutting teeth arranged in continuous revolving conveyor belt rows',
      'Retia mirabilia counter-current heat exchange keeping muscles 14°C above water'
    ],
    hotspots: [
      { id: 'h1', title: 'Ampullae of Lorenzini', description: 'Gel-filled pores on snout that detect electrical fields of prey hearts.', xPercent: 18, yPercent: 45 },
      { id: 'h2', title: 'Warm-Blood Core', description: 'Maintains elevated body temperature for explosive burst speed.', xPercent: 52, yPercent: 42 }
    ],
    papercraftType: 'great-white',
    tagCategory: 'Fish'
  },
  {
    id: 'flying-fish',
    plateNumber: 'PL-13',
    commonName: 'Four-Wing Flying Fish',
    binomialName: 'Cheilopogon melanurus',
    japaneseName: 'トビウオ (Tobiuo)',
    zoneId: 'sunlight',
    depthMeters: 5,
    lengthMeters: 0.32,
    weightKg: '0.4 kg',
    diet: 'Plankton, copepods, larval fish',
    curiosityRating: 'Common',
    discoveryYear: '1819',
    observationNotes: 'Leaps from breaking swells to escape tuna predators. Beats tail 70 times per second against surface film before gliding up to 400 meters across open air.',
    anatomicalFeatures: [
      'Elongated wing-like pectoral and pelvic fins acting as aerodynamic airfoils',
      'Asymmetrical hypocercal tail fin with extended lower lobe powering surface taxi',
      'Flattened corneas allowing sharp binocular vision in both air and water'
    ],
    hotspots: [
      { id: 'h1', title: 'Pectoral Wings', description: 'Unfurl like paper kites to catch marine thermal updrafts.', xPercent: 48, yPercent: 35 }
    ],
    papercraftType: 'flying-fish',
    tagCategory: 'Fish'
  },
  {
    id: 'sailfish',
    plateNumber: 'PL-14',
    commonName: 'Indo-Pacific Sailfish',
    binomialName: 'Istiophorus platypterus',
    japaneseName: 'バショウカジキ (Bashoukajiki)',
    zoneId: 'sunlight',
    depthMeters: 50,
    lengthMeters: 3.1,
    weightKg: '90 kg',
    diet: 'Squid, mackerel, flying fish swarms',
    curiosityRating: 'Rare',
    discoveryYear: '1792',
    observationNotes: 'The fastest swimmer in the sea, clocked at speeds exceeding 110 km/h. Unfurls its massive cobalt dorsal sail when herding bait balls into panic.',
    anatomicalFeatures: [
      'Giant crest-like sail fin with iridescent blue and gold micro-spotting',
      'Spear-like rostrum used as a hydrodynamic foil and high-speed slashing blade',
      'Rapid neural chromatic chromatophores flashing electric blue when hunting'
    ],
    hotspots: [
      { id: 'h1', title: 'High-Speed Sail', description: 'Folds flat into dorsal groove to reduce drag at 110 km/h.', xPercent: 48, yPercent: 22 },
      { id: 'h2', title: 'Slashing Rostrum', description: 'Whips back and forth through fish schools to stun prey.', xPercent: 12, yPercent: 48 }
    ],
    papercraftType: 'sailfish',
    tagCategory: 'Fish'
  },
  {
    id: 'sea-otter',
    plateNumber: 'PL-15',
    commonName: 'Northern Sea Otter',
    binomialName: 'Enhydra lutris',
    japaneseName: 'ラッコ (Rakko)',
    zoneId: 'sunlight',
    depthMeters: 25,
    lengthMeters: 1.4,
    weightKg: '35 kg',
    diet: 'Sea urchins, abalone, crabs, clams',
    curiosityRating: 'Common',
    discoveryYear: '1758',
    observationNotes: 'Floats on kelp bed hammocks. Uses flat river stones as anvils on chest to crack open spiny sea urchin shells—a master of marine tool use.',
    anatomicalFeatures: [
      'Densest fur coat in animal kingdom with over 150,000 hairs per square centimeter',
      'Skin pocket under armpit used to store favorite stone tools and harvested clams',
      'Webbed hind flipper paws enabling graceful backstroke floating'
    ],
    hotspots: [
      { id: 'h1', title: 'Tool Pocket', description: 'Natural pouch where it carries its favorite cracking stone.', xPercent: 42, yPercent: 55 }
    ],
    papercraftType: 'sea-otter',
    tagCategory: 'Mammal'
  },
  {
    id: 'giant-octopus',
    plateNumber: 'PL-16',
    commonName: 'Giant Pacific Octopus',
    binomialName: 'Enteroctopus dofleini',
    japaneseName: 'ミズダコ (Mizudako)',
    zoneId: 'sunlight',
    depthMeters: 180,
    lengthMeters: 4.8,
    weightKg: '50 kg',
    diet: 'Crabs, clams, small sharks',
    curiosityRating: 'Rare',
    discoveryYear: '1910',
    observationNotes: 'The supreme chameleon of the rocky Pacific slopes. Possesses three hearts, copper-based blue hemocyanin blood, and 2,000 sensitive tactile suckers.',
    anatomicalFeatures: [
      'Eight muscular tentacles each containing autonomous peripheral nervous reflex ganglia',
      'Chitinous parrot-like beak capable of cracking heavy crab carapaces',
      'Advanced chromatophore and papillae skin cells altering texture and color in 200 milliseconds'
    ],
    hotspots: [
      { id: 'h1', title: 'Decentralized Brains', description: 'Two-thirds of its neurons reside inside its eight flexible arms.', xPercent: 60, yPercent: 70 },
      { id: 'h2', title: 'Textured Papillae', description: 'Can shape skin into kelp spikes or rock grit in a quarter second.', xPercent: 38, yPercent: 32 }
    ],
    papercraftType: 'giant-octopus',
    tagCategory: 'Cephalopod'
  },
  {
    id: 'ocean-sunfish',
    plateNumber: 'PL-17',
    commonName: 'Ocean Sunfish (Mola Mola)',
    binomialName: 'Mola mola',
    japaneseName: 'マンボウ (Manbou)',
    zoneId: 'sunlight',
    depthMeters: 195,
    lengthMeters: 3.3,
    weightKg: '1,900 kg',
    diet: 'Jellyfish, salps, ctenophores',
    curiosityRating: 'Rare',
    discoveryYear: '1758',
    observationNotes: 'The heaviest known bony fish on the planet. Looks like a giant severed floating fish head. Basks horizontally on sunlit surface to warm up after deep jellyfish dives.',
    anatomicalFeatures: [
      'Clavus rudder replacing the traditional caudal fin, flapped like a giant stern oar',
      'Fused tooth beak forming an opening that never closes',
      'Thick cartilaginous rubbery skin layer providing buoyancy and thermal insulation'
    ],
    hotspots: [
      { id: 'h1', title: 'Clavus Stern Fin', description: 'Replaced tail fin with an oscillating rudder fin.', xPercent: 78, yPercent: 50 },
      { id: 'h2', title: 'Fused Beak', description: 'Eats up to 70 kg of low-calorie jellyfish every single day.', xPercent: 18, yPercent: 48 }
    ],
    papercraftType: 'ocean-sunfish',
    tagCategory: 'Fish'
  },

  // =========================================================================
  // ZONE 2: MESOPELAGIC · TWILIGHT DOMAIN (-200m to -1,000m) — 11 SPECIES
  // =========================================================================
  {
    id: 'barreleye',
    plateNumber: 'PL-18',
    commonName: 'Pacific Barreleye Fish',
    binomialName: 'Macropinna microstoma',
    japaneseName: 'デメニギス (Demenigisu)',
    zoneId: 'twilight',
    depthMeters: 650,
    lengthMeters: 0.15,
    weightKg: '0.12 kg',
    diet: 'Siphonophore zooids, trapped copepods',
    curiosityRating: 'Mythical',
    discoveryYear: '1939',
    observationNotes: 'Features an astonishing transparent fluid-filled dome skull. Its bright emerald tubular eyes can rotate within its head to track silhouettes overhead.',
    anatomicalFeatures: [
      'Completely transparent fluid-filled cranial shield made of durable tissue',
      'Bright green tubular eyes containing specialized yellow lenses that filter out sunlight',
      'Tiny mouth equipped with precise pincers for stealing food from stinging siphonophores'
    ],
    hotspots: [
      { id: 'h1', title: 'Rotatable Green Eyes', description: 'Can rotate from pointing straight up to looking forward while feeding.', xPercent: 38, yPercent: 42 },
      { id: 'h2', title: 'Fluid Cranial Shield', description: 'Protects fragile lenses from the stinging tentacles of siphonophores.', xPercent: 42, yPercent: 32 }
    ],
    papercraftType: 'barreleye',
    tagCategory: 'Fish'
  },
  {
    id: 'glass-squid',
    plateNumber: 'PL-19',
    commonName: 'Glass Squid',
    binomialName: 'Taonius borealis',
    japaneseName: 'コウモリイカ (Koumoriika)',
    zoneId: 'twilight',
    depthMeters: 750,
    lengthMeters: 0.45,
    weightKg: '0.35 kg',
    diet: 'Amphipods, small lanternfish',
    curiosityRating: 'Rare',
    discoveryYear: '1885',
    observationNotes: 'Nearly 100% transparent body with only internal digestive gland visible. Uses counter-illumination photophores beneath eyes to eliminate shadows.',
    anatomicalFeatures: [
      'Ammonium chloride-filled coelom providing effortless neutral buoyancy',
      'Light-producing photophores beneath eyes matching twilight downwelling sunlight',
      'Ability to pull head and arms inside mantle and inflate into a prickly sphere when alarmed'
    ],
    hotspots: [
      { id: 'h1', title: 'Invisibility Mantle', description: 'Refractive index nearly identical to surrounding seawater.', xPercent: 52, yPercent: 50 },
      { id: 'h2', title: 'Photophore Silencer', description: 'Emits faint blue downward beam to cancel its own silhouette.', xPercent: 35, yPercent: 42 }
    ],
    papercraftType: 'glass-squid',
    tagCategory: 'Cephalopod'
  },
  {
    id: 'giant-oarfish',
    plateNumber: 'PL-20',
    commonName: 'Giant Oarfish',
    binomialName: 'Regalecus glesne',
    japaneseName: 'リュウグウノツカイ (Ryuuguunotsukai)',
    zoneId: 'twilight',
    depthMeters: 450,
    lengthMeters: 8.2,
    weightKg: '270 kg',
    diet: 'Euphausiid krill, small squid, jellyfish',
    curiosityRating: 'Mythical',
    discoveryYear: '1772',
    observationNotes: 'The longest bony fish in existence. Swims vertically in water column with undulating crimson dorsal crest. Ancient sailors mistook it for mythical sea serpents.',
    anatomicalFeatures: [
      'Ribbon-like silver compressed body adorned with iridescent platinum streaks',
      'Brilliant crimson dorsal fin extending entire body length with 400 soft rays',
      'Pair of long oar-like pelvic fins ending in expanded sensory paddles'
    ],
    hotspots: [
      { id: 'h1', title: 'Oar Pelvic Paddles', description: 'Packed with chemoreceptors tasting currents for microscopic krill.', xPercent: 24, yPercent: 72 },
      { id: 'h2', title: 'Crimson Crest', description: 'Flickers in dark water to attract curious deep-sea organisms.', xPercent: 20, yPercent: 18 }
    ],
    papercraftType: 'giant-oarfish',
    tagCategory: 'Fish'
  },
  {
    id: 'stoplight-loosejaw',
    plateNumber: 'PL-21',
    commonName: 'Stoplight Loosejaw',
    binomialName: 'Malacosteus niger',
    japaneseName: 'オオクチホシエソ (Ookuchihoshieso)',
    zoneId: 'twilight',
    depthMeters: 850,
    lengthMeters: 0.24,
    weightKg: '0.15 kg',
    diet: 'Copepods, lanternfish',
    curiosityRating: 'Rare',
    discoveryYear: '1848',
    observationNotes: 'One of the few ocean animals that can generate and see red light. Uses secret red bioluminescent searchlights to hunt invisible red-blind deep prey.',
    anatomicalFeatures: [
      'Suborbital photophore emitting invisible deep red wavelength (705 nm)',
      'Floorless unhinged lower jaw hinged on modified neck vertebra with zero resistance',
      'Modified chlorophyll-derived retinal pigments tuned specifically to red spectrum'
    ],
    hotspots: [
      { id: 'h1', title: 'Red Flashlight', description: 'Secret sniper light unseen by 99% of other twilight organisms.', xPercent: 28, yPercent: 38 },
      { id: 'h2', title: 'Floorless Jaw', description: 'No skin on bottom of jaw to eliminate water resistance during strikes.', xPercent: 34, yPercent: 62 }
    ],
    papercraftType: 'stoplight-loosejaw',
    tagCategory: 'Bioluminescent'
  },
  {
    id: 'lanternfish',
    plateNumber: 'PL-22',
    commonName: 'Glacier Lanternfish',
    binomialName: 'Benthosema glaciale',
    japaneseName: 'ハダカイワシ (Hadakaiwashi)',
    zoneId: 'twilight',
    depthMeters: 550,
    lengthMeters: 0.10,
    weightKg: '0.02 kg',
    diet: 'Plankton, copepod swarms, amphipods',
    curiosityRating: 'Common',
    discoveryYear: '1837',
    observationNotes: 'Makes up 65% of all deep-sea fish biomass. Participates in the daily DVM (Diel Vertical Migration), rising by the trillions every single night to feed near surface.',
    anatomicalFeatures: [
      'Precisely arranged species-specific photophore lights along flanks',
      'High-fat lipid body tissue providing neutral buoyancy with no swim bladder gas',
      'Giant light-gathering dark pupils filling half of facial profile'
    ],
    hotspots: [
      { id: 'h1', title: 'Flank Photophores', description: 'Arranged in constellation lines like deep sea runway beacons.', xPercent: 55, yPercent: 55 }
    ],
    papercraftType: 'lanternfish',
    tagCategory: 'Bioluminescent'
  },
  {
    id: 'bigeye-tuna',
    plateNumber: 'PL-23',
    commonName: 'Bigeye Tuna',
    binomialName: 'Thunnus obesus',
    japaneseName: 'メバチ (Mebachi)',
    zoneId: 'twilight',
    depthMeters: 380,
    lengthMeters: 2.1,
    weightKg: '180 kg',
    diet: 'Lanternfish, squid, cutlassfish',
    curiosityRating: 'Common',
    discoveryYear: '1839',
    observationNotes: 'Deep-diving pelagic predator with gargantuan spherical eyes designed to hunt in twilight gloom. Warm-blooded vascular rete mirabile keeps brain warm.',
    anatomicalFeatures: [
      'Gigantic spherical eyes with thick retinas adapted for low-light prey silhouettes',
      'Countercurrent heat exchanger keeping eye and cerebral temperature 6°C above ambient',
      'Metallic dark bronze and electric indigo hydrodynamic torpedo fuselage'
    ],
    hotspots: [
      { id: 'h1', title: 'Thermo-Heated Eye', description: 'Warmed retinas process fast prey movements 4× faster in cold water.', xPercent: 22, yPercent: 38 }
    ],
    papercraftType: 'bigeye-tuna',
    tagCategory: 'Fish'
  },
  {
    id: 'snipe-eel',
    plateNumber: 'PL-24',
    commonName: 'Slender Snipe Eel',
    binomialName: 'Nemichthys scolopaceus',
    japaneseName: 'シギウナギ (Shigiunagi)',
    zoneId: 'twilight',
    depthMeters: 900,
    lengthMeters: 1.4,
    weightKg: '0.2 kg',
    diet: 'Sergestid shrimp, small mesopelagic crustaceans',
    curiosityRating: 'Rare',
    discoveryYear: '1848',
    observationNotes: 'An ultra-slender ribbon eel with over 750 vertebrae. Its long bird-like jaws curve outward and cannot close, lined with tiny backward hook teeth.',
    anatomicalFeatures: [
      'Outward-curving non-closing beaks acting as Velcro nets for shrimp antennae',
      'Extremely elongated vertebral column containing more vertebrae than any vertebrate',
      'Anus located absurdly forward right behind the throat region'
    ],
    hotspots: [
      { id: 'h1', title: 'Velcro Jaws', description: 'Curves outward; sweeps through water until shrimp feelers tangle.', xPercent: 15, yPercent: 44 }
    ],
    papercraftType: 'snipe-eel',
    tagCategory: 'Fish'
  },
  {
    id: 'cockatoo-squid',
    plateNumber: 'PL-25',
    commonName: 'Cockatoo Squid',
    binomialName: 'Galiteuthis phyllura',
    japaneseName: 'オウムイカ (Oumuika)',
    zoneId: 'twilight',
    depthMeters: 950,
    lengthMeters: 2.7,
    weightKg: '1.8 kg',
    diet: 'Midwater fish, mysid shrimp',
    curiosityRating: 'Rare',
    discoveryYear: '1906',
    observationNotes: 'Possesses large crest-like arm membranes resembling cockatoo feathers. Its tentacles feature swiveling sharp cat-like hooks for snagging slippery fish.',
    anatomicalFeatures: [
      'Two rows of 360-degree swiveling hooks along tentacular clubs',
      'Pair of enormous iridescent photophores encircling ventral eye margin',
      'Translucent balloon mantle holding low-density ammonium solution'
    ],
    hotspots: [
      { id: 'h1', title: 'Swivel Claws', description: 'Talons rotate to lock onto struggling prey.', xPercent: 70, yPercent: 40 }
    ],
    papercraftType: 'cockatoo-squid',
    tagCategory: 'Cephalopod'
  },
  {
    id: 'silver-hatchetfish',
    plateNumber: 'PL-26',
    commonName: 'Silver Hatchetfish',
    binomialName: 'Argyropelecus aculeatus',
    japaneseName: 'ムネエソ (Muneeso)',
    zoneId: 'twilight',
    depthMeters: 500,
    lengthMeters: 0.08,
    weightKg: '0.01 kg',
    diet: 'Ostracods, copepods',
    curiosityRating: 'Rare',
    discoveryYear: '1837',
    observationNotes: 'Ultra-thin blade-like body resembling a shiny hatchet. Ventral light tubes beam downward at exact intensity of sun, rendering it 100% invisible from below.',
    anatomicalFeatures: [
      'Razor-thin silver body less than 3 mm wide covered in guanine crystal mirrors',
      'Ventral tubular photophores with internal parabolic mirrors directing light down',
      'Permanently upturned binocular eyes hunting for food overhead'
    ],
    hotspots: [
      { id: 'h1', title: 'Counter-Shine Lamps', description: 'Directs light through biological prisms matching surface sky.', xPercent: 45, yPercent: 75 }
    ],
    papercraftType: 'silver-hatchetfish',
    tagCategory: 'Bioluminescent'
  },
  {
    id: 'spiny-dogfish',
    plateNumber: 'PL-27',
    commonName: 'Spiny Dogfish',
    binomialName: 'Squalus acanthias',
    japaneseName: 'アブラツノザメ (Aburatsunozame)',
    zoneId: 'twilight',
    depthMeters: 350,
    lengthMeters: 1.2,
    weightKg: '10 kg',
    diet: 'Herring, squid, crabs',
    curiosityRating: 'Common',
    discoveryYear: '1758',
    observationNotes: 'Small deep-traveling shark capable of living up to 100 years. Bears venomous defensive spines in front of both dorsal fins to deter toothed whales.',
    anatomicalFeatures: [
      'Pair of stout grooved spines secreting mild venom in front of dorsal fins',
      'Luminous green tapetum lucidum layer magnifying twilight photon capture',
      'Gestation period of up to 24 months, the longest of any vertebrate animal'
    ],
    hotspots: [
      { id: 'h1', title: 'Venomous Dorsal Spines', description: 'Curved horn spines that impale predator mouths.', xPercent: 52, yPercent: 28 }
    ],
    papercraftType: 'spiny-dogfish',
    tagCategory: 'Fish'
  },
  {
    id: 'red-crab',
    plateNumber: 'PL-28',
    commonName: 'Pelagic Red Crab',
    binomialName: 'Pleuroncodes planipes',
    japaneseName: 'コシオリエビ (Koshioriebi)',
    zoneId: 'twilight',
    depthMeters: 280,
    lengthMeters: 0.13,
    weightKg: '0.04 kg',
    diet: 'Diatoms, organic detritus, zooplankton',
    curiosityRating: 'Common',
    discoveryYear: '1860',
    observationNotes: 'Swims upside-down in massive midwater blooms using tail flaps. Red pigment absorbs the dominant blue light of the twilight zone, making it pitch-black to predators.',
    anatomicalFeatures: [
      'Fan-shaped swimmerets and tail fan capable of sustained open-water hovering',
      'Bright scarlet astaxanthin pigment acting as stealth cloak against blue light',
      'Feathery maxillipeds creating micro-vortices to filter diatom chains'
    ],
    hotspots: [
      { id: 'h1', title: 'Red Invisibility Cloak', description: 'Since red light cannot penetrate past 200m, red animals look jet black.', xPercent: 45, yPercent: 45 }
    ],
    papercraftType: 'red-crab',
    tagCategory: 'Crustacean'
  },

  // =========================================================================
  // ZONE 3: BATHYPELAGIC · THE MIDNIGHT REALM (-1,000m to -4,000m) — 10 SPECIES
  // =========================================================================
  {
    id: 'anglerfish',
    plateNumber: 'PL-29',
    commonName: 'Humpback Anglerfish',
    binomialName: 'Melanocetus johnsonii',
    japaneseName: 'ペリカンアンコウ (Perikan-ankou)',
    zoneId: 'midnight',
    depthMeters: 2200,
    lengthMeters: 0.20,
    weightKg: '0.8 kg',
    diet: 'Viperfish, lanternfish, glass squid',
    curiosityRating: 'Mythical',
    discoveryYear: '1864',
    observationNotes: 'Iconic predator of the midnight realm. The female angles an illuminated esca lure containing glowing symbiotic Photobacterium over her jagged needle-toothed maw.',
    anatomicalFeatures: [
      'Modified dorsal fin spine (illicium) ending in a glowing bacterially lit esca bulb',
      'Translucent needle-like teeth angled inward to prevent trapped prey escape',
      'Extreme sexual dimorphism where dwarf males fuse permanently into female tissue'
    ],
    hotspots: [
      { id: 'h1', title: 'Bioluminescent Esca', description: 'Colony of glowing bacteria pulsed by muscular blood valve.', xPercent: 32, yPercent: 18 },
      { id: 'h2', title: 'Trapdoor Teeth', description: 'Hinged teeth fold down for incoming prey, lock solid against escape.', xPercent: 22, yPercent: 48 }
    ],
    papercraftType: 'anglerfish',
    tagCategory: 'Bioluminescent'
  },
  {
    id: 'gulper-eel',
    plateNumber: 'PL-30',
    commonName: 'Gulper Eel (Pelican Eel)',
    binomialName: 'Eurypharynx pelecanoides',
    japaneseName: 'フクロウナギ (Fukurounagi)',
    zoneId: 'midnight',
    depthMeters: 2900,
    lengthMeters: 1.8,
    weightKg: '1.2 kg',
    diet: 'Crustaceans, squid, fish larger than itself',
    curiosityRating: 'Rare',
    discoveryYear: '1882',
    observationNotes: 'Possesses a gargantuan inflatable pouch jaw loosely hinged to a tiny body. At the tip of its whip-like tail sits a luminous organ glowing rosy pink.',
    anatomicalFeatures: [
      'Massive pouch-like jaw hinged far back on head, able to unhinge like a pelican scoop',
      'Long whip-like tail ending in complex caudal organ glowing bright ruby and amber',
      'Extremely reduced skeletal system with almost zero calcification to conserve energy'
    ],
    hotspots: [
      { id: 'h1', title: 'Pelican Scoop Pouch', description: 'Can swallow organisms significantly larger than its body weight.', xPercent: 30, yPercent: 46 },
      { id: 'h2', title: 'Ruby Tail Beacon', description: 'Flickers at tip of tail to lure prey directly into its gaping mouth.', xPercent: 88, yPercent: 60 }
    ],
    papercraftType: 'gulper-eel',
    tagCategory: 'Fish'
  },
  {
    id: 'viperfish',
    plateNumber: 'PL-31',
    commonName: "Sloane's Viperfish",
    binomialName: 'Chauliodus sloani',
    japaneseName: 'ホウライエソ (Houraieso)',
    zoneId: 'midnight',
    depthMeters: 1500,
    lengthMeters: 0.35,
    weightKg: '0.25 kg',
    diet: 'Lanternfish, bristlemouths, squid',
    curiosityRating: 'Rare',
    discoveryYear: '1801',
    observationNotes: 'Holds Guinness World Record for largest tooth-to-body proportion in any fish. Fang teeth are so gargantuan they curl up outside its skull toward its eyes.',
    anatomicalFeatures: [
      'Gargantuan crystalline fangs that lock into sockets outside the cranial cavity',
      'Shock-absorbing cervical vertebrae that cushion skull from high-speed ram strikes',
      'Hundreds of tiny photophore lights lining belly in longitudinal glowing racing stripes'
    ],
    hotspots: [
      { id: 'h1', title: 'External Saber Fangs', description: 'Curved needle-like fangs extend past the eyes when closed.', xPercent: 24, yPercent: 45 },
      { id: 'h2', title: 'Shock-Absorbing Neck', description: 'Atlas vertebra padded with cartilage to withstand impaling impact.', xPercent: 35, yPercent: 42 }
    ],
    papercraftType: 'viperfish',
    tagCategory: 'Fish'
  },
  {
    id: 'giant-squid',
    plateNumber: 'PL-32',
    commonName: 'Giant Squid',
    binomialName: 'Architeuthis dux',
    japaneseName: 'ダイオウイカ (Daiouika)',
    zoneId: 'midnight',
    depthMeters: 1800,
    lengthMeters: 13.0,
    weightKg: '275 kg',
    diet: 'Deep-sea fishes, orange roughy, other cephalopods',
    curiosityRating: 'Mythical',
    discoveryYear: '1857',
    observationNotes: 'The mythical Kraken of oceanic folklore. Features dinner-plate-sized eyes (the largest of any living animal) to spot the faint glowing wake of hunting sperm whales.',
    anatomicalFeatures: [
      'Two feeding tentacles extending up to 10 meters with serrated chitin-toothed suckers',
      'Spherical eyes 30 cm across containing pupils the diameter of an adult human hand',
      'Huge powerful chitinous parrot beak that easily snaps 5-inch thick steel cables'
    ],
    hotspots: [
      { id: 'h1', title: 'Plate-Sized Eye', description: '30 cm diameter eyeball captures single photons in pitch darkness.', xPercent: 32, yPercent: 40 },
      { id: 'h2', title: 'Toothed Club Suckers', description: 'Lined with razor-sharp denticulate rings that rip flesh.', xPercent: 82, yPercent: 52 }
    ],
    papercraftType: 'giant-squid',
    tagCategory: 'Cephalopod'
  },
  {
    id: 'fangtooth',
    plateNumber: 'PL-33',
    commonName: 'Common Fangtooth',
    binomialName: 'Anoplogaster cornuta',
    japaneseName: 'オニキンメ (Onikinme)',
    zoneId: 'midnight',
    depthMeters: 2600,
    lengthMeters: 0.18,
    weightKg: '0.18 kg',
    diet: 'Crustaceans, squid, small midwater fish',
    curiosityRating: 'Rare',
    discoveryYear: '1833',
    observationNotes: 'Possesses terrifying skull geometry with deep facial sensory grooves. The lower fangs are so long that the skull evolved two opposing cavities beside the brain to house them.',
    anatomicalFeatures: [
      'Deep sockets on either side of the brain to receive lower fangs when mouth closes',
      'Extensive mucus-covered lateral line system covering entire skull like honeycomb',
      'Armor-like rough scales with microscopic spiny projections'
    ],
    hotspots: [
      { id: 'h1', title: 'Brain-Bypass Sockets', description: 'Slots inside roof of mouth allowing jaw to shut without piercing brain.', xPercent: 30, yPercent: 42 }
    ],
    papercraftType: 'fangtooth',
    tagCategory: 'Fish'
  },
  {
    id: 'black-swallower',
    plateNumber: 'PL-34',
    commonName: 'Black Swallower',
    binomialName: 'Chiasmodon niger',
    japaneseName: 'クロボウズギス (Krobouzugisu)',
    zoneId: 'midnight',
    depthMeters: 3100,
    lengthMeters: 0.25,
    weightKg: '0.14 kg',
    diet: 'Deep-sea bony fishes up to 10× its own mass',
    curiosityRating: 'Rare',
    discoveryYear: '1864',
    observationNotes: 'Famous for its miraculous elastic stomach. Swallows prey twice its length and more than ten times its mass, curling the oversized victim inside its ballooning abdomen.',
    anatomicalFeatures: [
      'Gargantuan distensible stomach expanding to translucent balloon membrane',
      'Heart pushed completely forward into throat cavity during digestion',
      'Interlocking palatine teeth that walk prey backward into the gullet'
    ],
    hotspots: [
      { id: 'h1', title: 'Elastic Balloon Belly', description: 'Stretches so thin that prey fish can be seen intact from outside.', xPercent: 46, yPercent: 65 }
    ],
    papercraftType: 'black-swallower',
    tagCategory: 'Fish'
  },
  {
    id: 'vampire-squid',
    plateNumber: 'PL-35',
    commonName: 'Vampire Squid from Hell',
    binomialName: 'Vampyroteuthis infernalis',
    japaneseName: 'コウモリイカ (Koumoriika)',
    zoneId: 'midnight',
    depthMeters: 1200,
    lengthMeters: 0.30,
    weightKg: '0.45 kg',
    diet: 'Marine snow (fecal pellets, dead plankton, mucus sheets)',
    curiosityRating: 'Mythical',
    discoveryYear: '1903',
    observationNotes: 'Neither squid nor octopus. Inverts its webbed black cloak inside-out in a "pineapple defense", exposing rows of soft fleshy spines called cirri.',
    anatomicalFeatures: [
      'Deep crimson-black mantle connected by webbing like a Dracula cape',
      'Pair of long retractable sensory filaments stored in velar arm pockets',
      'Photophores at tips of arms emitting glowing clouds of bioluminescent mucus'
    ],
    hotspots: [
      { id: 'h1', title: 'Pineapple Inversion Cloak', description: 'Flips cloak over head to protect soft body with rows of soft cirri.', xPercent: 48, yPercent: 38 },
      { id: 'h2', title: 'Marine Snow Harvester', description: 'Retractable filaments that sweep water for falling organic flakes.', xPercent: 68, yPercent: 65 }
    ],
    papercraftType: 'vampire-squid',
    tagCategory: 'Cephalopod'
  },
  {
    id: 'ghost-shark',
    plateNumber: 'PL-36',
    commonName: 'Pointy-Nosed Blue Chimaera',
    binomialName: 'Hydrolagus trolli',
    japaneseName: 'ギンザメ (Ginzame)',
    zoneId: 'midnight',
    depthMeters: 2400,
    lengthMeters: 1.2,
    weightKg: '15 kg',
    diet: 'Crustaceans, mollusks, bottom worms',
    curiosityRating: 'Rare',
    discoveryYear: '2002',
    observationNotes: 'Ancient cartilaginous lineage that branched away from sharks 400 million years ago. Features ghostly stitch-line sensory canals resembling Frankenstein seams.',
    anatomicalFeatures: [
      'Open-grooved sensory canal lines etched across head and snout like stitched paper seams',
      'Mineralized tooth plates instead of replaceable teeth for grinding shells',
      'Retractable club-like cephalic clasper on male foreheads studded with hooks'
    ],
    hotspots: [
      { id: 'h1', title: 'Frankenstein Sensory Seams', description: 'Channels electric field sensors across porcelain-like skin.', xPercent: 24, yPercent: 38 },
      { id: 'h2', title: 'Grinding Plates', description: 'Continuous mineralized plates that pulverize thick mollusk shells.', xPercent: 28, yPercent: 52 }
    ],
    papercraftType: 'ghost-shark',
    tagCategory: 'Fish'
  },
  {
    id: 'dumbo-octopus',
    plateNumber: 'PL-37',
    commonName: 'Dumbo Octopus',
    binomialName: 'Grimpoteuthis',
    japaneseName: 'オオクラゲダコ (Ookuragedako)',
    zoneId: 'midnight',
    depthMeters: 3800,
    lengthMeters: 0.40,
    weightKg: '2.0 kg',
    diet: 'Isopods, amphipods, polychaete worms',
    curiosityRating: 'Mythical',
    discoveryYear: '1883',
    observationNotes: 'Flaps a pair of adorable ear-like fins above its eyes to hover gracefully above abyssal mud. Swallows prey whole without rasping radula teeth.',
    anatomicalFeatures: [
      'Ear-like muscular mantle fins acting as primary gentle swimming paddles',
      'Completely webbed bell-shaped arms with rows of sensory cirri hairs',
      'No ink sac or radula rasp, adaptations abandoned in the eternal calm deep'
    ],
    hotspots: [
      { id: 'h1', title: 'Dumbo Ear Fins', description: 'Flaps smoothly to hover motionless 2 inches above the seafloor.', xPercent: 32, yPercent: 25 },
      { id: 'h2', title: 'Parachute Umbrella', description: 'Creates vacuum bell that traps worms rising from sediment.', xPercent: 55, yPercent: 68 }
    ],
    papercraftType: 'dumbo-octopus',
    tagCategory: 'Cephalopod'
  },
  {
    id: 'dragonfish',
    plateNumber: 'PL-38',
    commonName: 'Black Dragonfish',
    binomialName: 'Idiacanthus antrostomus',
    japaneseName: 'クロアゴホシエソ (Kuroagohoshieso)',
    zoneId: 'midnight',
    depthMeters: 2000,
    lengthMeters: 0.40,
    weightKg: '0.12 kg',
    diet: 'Midwater crustaceans, lanternfish',
    curiosityRating: 'Rare',
    discoveryYear: '1899',
    observationNotes: 'Ultra-black skin that absorbs 99.5% of light through dense melanin melanosomes. Wiggles an illuminated chin barbel like an irresistible bait worm.',
    anatomicalFeatures: [
      'Super-black skin texture trapping photons through nano-scale melanin spheres',
      'Long chin barbel tipped with a luminous photophore lure',
      'Transparent fang teeth made of biological apatite that reflect zero light'
    ],
    hotspots: [
      { id: 'h1', title: 'Super-Black Melanin', description: 'Absorbs 99.5% of light so predator lights cannot reflect off it.', xPercent: 45, yPercent: 42 },
      { id: 'h2', title: 'Luminous Chin Barbel', description: 'Mimics wriggling bioluminescent worm right in front of mouth.', xPercent: 20, yPercent: 65 }
    ],
    papercraftType: 'dragonfish',
    tagCategory: 'Bioluminescent'
  },

  // =========================================================================
  // ZONE 4: ABYSSOPELAGIC · THE ABYSS (-4,000m to -6,000m) — 6 SPECIES
  // =========================================================================
  {
    id: 'coelacanth',
    plateNumber: 'PL-39',
    commonName: 'Indonesian Coelacanth',
    binomialName: 'Latimeria menadoensis',
    japaneseName: 'シーラカンス (Shiirakansu)',
    zoneId: 'abyss',
    depthMeters: 4200,
    lengthMeters: 1.8,
    weightKg: '80 kg',
    diet: 'Lanternfish, benthic eels, cuttlefish',
    curiosityRating: 'Mythical',
    discoveryYear: '1998',
    observationNotes: 'The iconic "living fossil" that was believed extinct for 66 million years until rediscovered. Possesses lobed fins that move in an alternating horse-trot sequence.',
    anatomicalFeatures: [
      'Lobed paired fins supported by internal bony limb stalks resembling tetrapod legs',
      'Rostral organ in snout equipped with gel-filled electro-receptive tubes',
      'Hollow oil-filled notochord serving as elastic backbone instead of vertebrae'
    ],
    hotspots: [
      { id: 'h1', title: 'Lobed Limb Fins', description: 'Fins have articulated bones that move like walking legs in water.', xPercent: 55, yPercent: 62 },
      { id: 'h2', title: 'Rostral Electro-Snout', description: 'Specialized gel chamber detecting prey hidden inside volcanic fissures.', xPercent: 18, yPercent: 38 }
    ],
    papercraftType: 'coelacanth',
    tagCategory: 'Fish'
  },
  {
    id: 'tripod-fish',
    plateNumber: 'PL-40',
    commonName: 'Abyssal Tripod Fish',
    binomialName: 'Bathypterois grallator',
    japaneseName: 'ナガヅエエソ (Nagadzueeso)',
    zoneId: 'abyss',
    depthMeters: 4800,
    lengthMeters: 0.38,
    weightKg: '0.35 kg',
    diet: 'Planktonic copepods, mysid shrimp',
    curiosityRating: 'Rare',
    discoveryYear: '1886',
    observationNotes: 'Stands motionless on the soft abyssal sediment using three elongated pelvic and caudal fin stilts that reach over one meter in length, facing upstream.',
    anatomicalFeatures: [
      'Three elongated, rigid stilt-fin rays elevating body 1 meter above the silt',
      'Virtually blind tiny degenerate eyes replaced by hyper-sensitive pectoral feeler rays',
      'Simultaneous hermaphroditism, producing both sperm and eggs simultaneously'
    ],
    hotspots: [
      { id: 'h1', title: 'Stilt Fin Tripod', description: 'Fluid pumps into fin rays to lock them rigid like carbon fiber legs.', xPercent: 50, yPercent: 88 },
      { id: 'h2', title: 'Pectoral Feelers', description: 'Rays point forward like antennae sensing micro-current disturbances.', xPercent: 30, yPercent: 28 }
    ],
    papercraftType: 'tripod-fish',
    tagCategory: 'Fish'
  },
  {
    id: 'sea-pig',
    plateNumber: 'PL-41',
    commonName: 'Abyssal Sea Pig',
    binomialName: 'Scotoplanes globosa',
    japaneseName: 'センジュナマコ (Senjunamako)',
    zoneId: 'abyss',
    depthMeters: 5200,
    lengthMeters: 0.15,
    weightKg: '0.08 kg',
    diet: 'Organic scum, whale fall sediment, decaying marine snow',
    curiosityRating: 'Rare',
    discoveryYear: '1882',
    observationNotes: 'A translucent pink abyssal sea cucumber crawling across mud plains on tubular hydraulic water legs. Feeds on the freshest organic fallout from above.',
    anatomicalFeatures: [
      'Five to seven pairs of enlarged hydraulic tube feet walking like pig legs',
      'Upper antenna-like papillae that sense chemical trails of whale carcasses',
      'Fragile jelly-like fluid dermis that dissolves if brought to surface pressure'
    ],
    hotspots: [
      { id: 'h1', title: 'Hydraulic Tube Feet', description: 'Inflated by internal water vascular system to stomp through deep ooze.', xPercent: 52, yPercent: 78 }
    ],
    papercraftType: 'sea-pig',
    tagCategory: 'Jelly'
  },
  {
    id: 'faceless-cusk',
    plateNumber: 'PL-42',
    commonName: 'Faceless Cusk Eel',
    binomialName: 'Typhlonus nasus',
    japaneseName: 'カオナシウナギ (Kaonashi-unagi)',
    zoneId: 'abyss',
    depthMeters: 4600,
    lengthMeters: 0.40,
    weightKg: '0.5 kg',
    diet: 'Benthic worms, mud crustaceans',
    curiosityRating: 'Mythical',
    discoveryYear: '1878',
    observationNotes: 'An eerily alien fish that appears to have no face. Its eyes are completely buried beneath thick gelatinous skin, while its mouth sits underneath its head.',
    anatomicalFeatures: [
      'Complete lack of external facial landmarks with eyes sealed beneath skull skin',
      'Retractable underslung mouth protruding downward like a robotic vacuum nozzle',
      'Translucent gelatinous bulbous snout packed with olfactory and mechanoreceptors'
    ],
    hotspots: [
      { id: 'h1', title: 'Hidden Retinal Pores', description: 'Under-skin vestigial eyes can only sense ambient bioluminescent flashes.', xPercent: 28, yPercent: 35 }
    ],
    papercraftType: 'faceless-cusk',
    tagCategory: 'Fish'
  },
  {
    id: 'giant-isopod',
    plateNumber: 'PL-43',
    commonName: 'Deep Sea Giant Isopod',
    binomialName: 'Bathynomus giganteus',
    japaneseName: 'ダイオウグソクムシ (Daiougusokumushi)',
    zoneId: 'abyss',
    depthMeters: 5500,
    lengthMeters: 0.50,
    weightKg: '1.7 kg',
    diet: 'Sunken whale carcasses, squids, crabs',
    curiosityRating: 'Rare',
    discoveryYear: '1879',
    observationNotes: 'A colossal relative of common garden pillbugs. Armored in interlocking calcium-phosphate plates. Can survive more than five years without consuming a single bite of food.',
    anatomicalFeatures: [
      'Interlocking segmented calcareous tergites capable of curling into an armored ball',
      'Fourteen articulate gripping pereopod legs equipped with razor sharp hooks',
      'Large compound eyes containing 4,000 hexagonal facets with reflective tapetum'
    ],
    hotspots: [
      { id: 'h1', title: 'Tergite Armor Plates', description: 'Heavy mineralized shell withstanding 500 atmospheres of crushing water.', xPercent: 55, yPercent: 42 },
      { id: 'h2', title: 'Compound Facets', description: '4,000 hexagonal light collectors glowing iridescent gold.', xPercent: 26, yPercent: 40 }
    ],
    papercraftType: 'giant-isopod',
    tagCategory: 'Crustacean'
  },
  {
    id: 'abyssal-ctenophore',
    plateNumber: 'PL-44',
    commonName: 'Abyssal Comb Jelly',
    binomialName: 'Beroe abyssicola',
    japaneseName: 'カブトクラゲ (Kabutokurage)',
    zoneId: 'abyss',
    depthMeters: 5900,
    lengthMeters: 0.22,
    weightKg: '0.06 kg',
    diet: 'Other ctenophores, salps, hydromedusae',
    curiosityRating: 'Rare',
    discoveryYear: '1908',
    observationNotes: 'A shimmering lantern of the deep abyss. Eight rows of microscopic cilia combs refract ambient bioluminescence into moving rainbow neon pulses.',
    anatomicalFeatures: [
      'Eight longitudinal ciliary comb rows beating in coordinated rhythmic waves',
      'Diffractive iridescent cilia that scatter light into moving rainbow cascades',
      'Massive muscular mouth opening that can swallow prey larger than itself'
    ],
    hotspots: [
      { id: 'h1', title: 'Diffraction Combs', description: 'Not bioluminescence: microscopic hair plates that diffract stray photons.', xPercent: 45, yPercent: 32 }
    ],
    papercraftType: 'abyssal-ctenophore',
    tagCategory: 'Jelly'
  },

  // =========================================================================
  // ZONE 5: HADALPELAGIC · THE TRENCHES (-6,000m to -10,994m) — 6 SPECIES
  // =========================================================================
  {
    id: 'mariana-snailfish',
    plateNumber: 'PL-45',
    commonName: 'Mariana Snailfish',
    binomialName: 'Pseudoliparis swirei',
    japaneseName: 'マリアナスネイルフィッシュ (Marianasneirufisshu)',
    zoneId: 'hadal',
    depthMeters: 8178,
    lengthMeters: 0.28,
    weightKg: '0.22 kg',
    diet: 'Hadal amphipods (Hirondellea gigas)',
    curiosityRating: 'Mythical',
    discoveryYear: '2017',
    observationNotes: 'The deepest vertebrate ever captured alive. Its paper-thin translucent pink skin reveals its beating heart. Bones are flexible cartilage that bend under 800 ATM without cracking.',
    anatomicalFeatures: [
      'Extremely high concentrations of TMAO (trimethylamine N-oxide) protecting cellular proteins from distortion',
      'Flexible, partially uncalcified cartilaginous skull and spine',
      'Complete absence of swim bladder and redundant eye pigments'
    ],
    hotspots: [
      { id: 'h1', title: 'TMAO Pressure Shield', description: 'Molecular osmolyte chemical preventing cellular enzyme crushing.', xPercent: 48, yPercent: 44 },
      { id: 'h2', title: 'Flexible Cartilage Skull', description: 'Bends under 12,000 PSI like hardened rubber.', xPercent: 25, yPercent: 40 }
    ],
    papercraftType: 'mariana-snailfish',
    tagCategory: 'Fish'
  },
  {
    id: 'hadal-amphipod',
    plateNumber: 'PL-46',
    commonName: 'Hadal Supergiant Amphipod',
    binomialName: 'Alicella gigantea',
    japaneseName: 'ダイコクソコエビ (Daikokusokoebi)',
    zoneId: 'hadal',
    depthMeters: 9200,
    lengthMeters: 0.34,
    weightKg: '0.4 kg',
    diet: 'Sunken carrion, hadal detritus',
    curiosityRating: 'Abyssal',
    discoveryYear: '1899',
    observationNotes: 'Gargantuan relative of sand fleas, growing 20 times larger than shallow species due to deep-sea gigantism. Possesses specialized gut cellulase enzymes to digest wood.',
    anatomicalFeatures: [
      'Extreme deep-sea gigantism enabled by high dissolved oxygen and cold metabolic rates',
      'Calcareous exoskeleton reinforced with bio-accumulated aluminum and zinc minerals',
      'Rapid-response chemosensory antennae detecting carrion scent from kilometers away'
    ],
    hotspots: [
      { id: 'h1', title: 'Deep-Sea Gigantism', description: 'Grows 20× larger than surface relatives due to metabolic cold physics.', xPercent: 55, yPercent: 50 },
      { id: 'h2', title: 'Aluminum Armor Coat', description: 'Exoskeleton incorporates heavy metal minerals to stop carbonate dissolution.', xPercent: 38, yPercent: 35 }
    ],
    papercraftType: 'hadal-amphipod',
    tagCategory: 'Crustacean'
  },
  {
    id: 'ethereal-snailfish',
    plateNumber: 'PL-47',
    commonName: 'Ethereal Snailfish',
    binomialName: 'Careproctus hadalis',
    japaneseName: 'ユウレイスネイルフィッシュ (Yuureisneirufisshu)',
    zoneId: 'hadal',
    depthMeters: 8400,
    lengthMeters: 0.22,
    weightKg: '0.15 kg',
    diet: 'Micro amphipods, hadal isopods',
    curiosityRating: 'Abyssal',
    discoveryYear: '2019',
    observationNotes: 'A ghostly white translucent tadpole fish that drifts effortlessly through freezing trench currents. Muscle tissue contains high water and lipid content to match ambient density.',
    anatomicalFeatures: [
      'Nearly 100% translucent gelatinous body tissue with zero pigmentation',
      'Ventral suction disc evolved from pelvic fins to anchor to trench rocks',
      'Unique piezo-tolerant metabolic proteins that function at 850 atmospheres'
    ],
    hotspots: [
      { id: 'h1', title: 'Pelvic Suction Anchor', description: 'Modified ventral disc that suctions onto trench bedrock.', xPercent: 38, yPercent: 65 }
    ],
    papercraftType: 'ethereal-snailfish',
    tagCategory: 'Fish'
  },
  {
    id: 'hadal-cucumber',
    plateNumber: 'PL-48',
    commonName: 'Hadal Sea Cucumber',
    binomialName: 'Elpidia belyaevi',
    japaneseName: 'シンカイナマコ (Shinkainamako)',
    zoneId: 'hadal',
    depthMeters: 9800,
    lengthMeters: 0.08,
    weightKg: '0.03 kg',
    diet: 'Microscopic organic sediment, bacteria mats',
    curiosityRating: 'Abyssal',
    discoveryYear: '1971',
    observationNotes: 'Crawls in vast herds across the Mariana Trench floor. Comprises up to 90% of the living biomass at the ultimate bottom of the world.',
    anatomicalFeatures: [
      'Water-filled mutable collagenous tissue that softens or hardens on neural command',
      'Ring of specialized sensory tentacles shoveling sediment into digestive tract',
      'Direct cutaneous respiration absorbing oxygen through paper-thin skin'
    ],
    hotspots: [
      { id: 'h1', title: 'Mutable Collagen', description: 'Can instantly switch skin from rigid armor to liquid jelly.', xPercent: 50, yPercent: 48 }
    ],
    papercraftType: 'hadal-cucumber',
    tagCategory: 'Jelly'
  },
  {
    id: 'xenophyophore',
    plateNumber: 'PL-49',
    commonName: 'Giant Hadal Xenophyophore',
    binomialName: 'Syringammina fragilissima',
    japaneseName: 'クサリモモ (Kusarimomo)',
    zoneId: 'hadal',
    depthMeters: 10600,
    lengthMeters: 0.20,
    weightKg: '0.10 kg',
    diet: 'Suspended organic particles, marine bacteria',
    curiosityRating: 'Abyssal',
    discoveryYear: '1883',
    observationNotes: 'One of the largest single-celled organisms in existence! A colossal giant amoeba that constructs a fragile, labyrinthine house out of glued sediment particles and sponge spicules.',
    anatomicalFeatures: [
      'A single multinucleated giant cell containing thousands of individual nuclei',
      'Agglutinated test house constructed from mineral grains glued with organic cement',
      'Concentrates high levels of radioactive lead and uranium inside excretory pellets'
    ],
    hotspots: [
      { id: 'h1', title: 'Single Giant Cell', description: '20 cm wide organism with no cellular division, holding thousands of nuclei.', xPercent: 50, yPercent: 50 }
    ],
    papercraftType: 'xenophyophore',
    tagCategory: 'Bioluminescent'
  },
  {
    id: 'hadal-tubeworm',
    plateNumber: 'PL-50',
    commonName: 'Challenger Deep Tube Worm',
    binomialName: 'Oasisia hadalis',
    japaneseName: 'シントウカイメンウジ (Shintoukamen-uji)',
    zoneId: 'hadal',
    depthMeters: 10994,
    lengthMeters: 0.45,
    weightKg: '0.12 kg',
    diet: 'Hydrogen sulfide from chemosynthetic bacteria',
    curiosityRating: 'Abyssal',
    discoveryYear: '2021',
    observationNotes: 'Thrives at the absolute geological basement of planet Earth (-10,994m Challenger Deep). Has no mouth or gut, sustained purely by chemosynthetic sulfur-oxidizing endosymbionts.',
    anatomicalFeatures: [
      'White chitinous tube housing a vascular crimson branchial plume',
      'Trophosome organ packed with billions of chemosynthetic sulfur-oxidizing bacteria',
      'Hemoglobin with extraordinary oxygen-binding affinity functioning at freezing hadal temperatures'
    ],
    hotspots: [
      { id: 'h1', title: 'Crimson Plume', description: 'Absorbs hydrogen sulfide and oxygen simultaneously without toxicity.', xPercent: 48, yPercent: 22 },
      { id: 'h2', title: 'Trophosome Reactor', description: 'Bacterial engine that turns toxic volcanic sulfur into sugar and energy.', xPercent: 50, yPercent: 60 }
    ],
    papercraftType: 'hadal-tubeworm',
    tagCategory: 'Bioluminescent'
  }
];
