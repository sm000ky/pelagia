export type Language = 'en' | 'id' | 'ja';

export interface Translations {
  // App header & brand
  brandTitle: string;
  brandSubtitle: string;
  expedition: string;
  zone: string;
  soundOn: string;
  soundOff: string;
  logbook: string;
  depthGauge: string;
  meters: string;
  pressure: string;
  temperature: string;
  scrollDownToDive: string;
  diveSubtitle: string;
  shorelineTag: string;

  // Radar Proximity
  sonarRadar: string;
  nextSpecimenIn: string;
  metersAway: string;

  // Zone headers & summaries
  zone0Title: string;
  zone0Summary: string;
  zone1Title: string;
  zone1Summary: string;
  zone2Title: string;
  zone2Summary: string;
  zone3Title: string;
  zone3Summary: string;
  zone4Title: string;
  zone4Summary: string;
  zone5Title: string;
  zone5Summary: string;

  // Specimen item
  inspectSpecimen: string;
  openJournal: string;
  size: string;
  logged: string;
  examinePills: string;

  // Modal
  modalArchive: string;
  fieldNotes: string;
  scaleExplorer: string;
  oceanPhysics: string;
  close: string;
  stampLog: string;
  stampExamined: string;
  diet: string;
  weight: string;
  discoveredYear: string;
  hydrostaticPressure: string;
  solarPenetration: string;
  survivalAdaptations: string;
  keyAdaptations: string;
  observationLog: string;
  scale: string;
  diverScale: string;
  submersibleScale: string;
  maskScale: string;
  featureNote: string;
  toggleXRay: string;
  toggleExterior: string;

  // Warnings
  warning1Title: string;
  warning1Desc: string;
  warning2Title: string;
  warning2Desc: string;
  warning3Title: string;
  warning3Desc: string;
  warning4Title: string;
  warning4Desc: string;

  // Climax
  starSeaTitle: string;
  starSeaSubtitle: string;
  starSeaDesc: string;
  titanName: string;
  titanTaxon: string;
  titanLore: string;
  surfaceButton: string;
  stardustButton: string;

  // Finale & Certificate
  expeditionComplete: string;
  challengerReflection: string;
  surveyors: string;
  surfaceLocation: string;
  returnToShore: string;
  viewDiploma: string;

  // Logbook
  rosterTitle: string;
  speciesStamped: string;
  searchPlaceholder: string;

  // Cockpit POV
  povActive: string;
  halogenSpotlight: string;
  spotlightAim: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    brandTitle: 'PELAGIA',
    brandSubtitle: 'PACIFIC BATHYMETRIC DESCENT',
    expedition: 'EXPEDITION',
    zone: 'ZONE',
    soundOn: 'OCEAN SOUND',
    soundOff: 'SOUND OFF',
    logbook: 'LOGBOOK',
    depthGauge: 'DEPTH GAUGE',
    meters: 'METERS',
    pressure: 'PRESSURE',
    temperature: 'TEMP',
    scrollDownToDive: 'SCROLL TO DIVE',
    diveSubtitle: 'From the sunlit shore, descend eleven vertical kilometers into Earth’s ocean.',
    shorelineTag: 'THE PACIFIC SHORELINE (+10M)',

    sonarRadar: 'SONAR PROXIMITY',
    nextSpecimenIn: 'Approaching in',
    metersAway: 'm',

    zone0Title: 'Coastal Shore & Dunes',
    zone0Summary: 'The sunlit threshold where dry dunes meet salt spray. Ghost crabs scuttle through quartz sand as gulls wheel overhead.',
    zone1Title: 'The Sunlight Realm',
    zone1Summary: 'The ocean’s luminous canopy. Corals bloom in filtered emerald beams while gentle leviathans glide through schools of silver fish.',
    zone2Title: 'The Twilight Domain',
    zone2Summary: 'A ghostly realm where red wavelengths perish. Strange creatures navigate perpetual dusk with gargantuan telescopic lenses and silvery scales.',
    zone3Title: 'The Midnight Realm',
    zone3Summary: 'Eternal darkness reigns. The sun is completely extinguished. Living sparks, glowing lures, and bioluminescent photophores pierce the cold black ink.',
    zone4Title: 'The Abyssal Plains',
    zone4Summary: 'The vast oceanic desert bed. Water pressure crushes steel hulls as living fossils and tripod stilt-walkers rest quietly on cushions of silken sediment.',
    zone5Title: 'The Hadal Trenches',
    zone5Summary: 'The deepest tectonic scars on Earth. Translucent snailfish and armored supergiant amphipods thrive under 16,000 pounds of pressure per square inch.',

    inspectSpecimen: 'Inspect Specimen',
    openJournal: 'OPEN JOURNAL →',
    size: 'SIZE',
    logged: 'LOGGED',
    examinePills: 'SELECT ANATOMICAL ADAPTATION TO EXAMINE:',

    modalArchive: 'EXPEDITION ARCHIVE',
    fieldNotes: 'Field Notes',
    scaleExplorer: 'Scale Explorer',
    oceanPhysics: 'Deep Ocean Physics',
    close: 'Close',
    stampLog: 'STAMP LOG',
    stampExamined: '★ EXAMINED // VERIFIED',
    diet: 'DIET',
    weight: 'WEIGHT',
    discoveredYear: 'DISCOVERED',
    hydrostaticPressure: 'HYDROSTATIC PRESSURE',
    solarPenetration: 'SOLAR PENETRATION',
    survivalAdaptations: 'Deep Bathymetric Survival Adaptations',
    keyAdaptations: 'KEY ANATOMICAL ADAPTATIONS',
    observationLog: 'NATURALIST OBSERVATION LOG',
    scale: 'SCALE //',
    diverScale: 'Diver (1.8m)',
    submersibleScale: 'Submersible (8m)',
    maskScale: 'Mask (0.2m)',
    featureNote: 'FEATURE NOTE',
    toggleXRay: '🔬 X-RAY: RADIOGRAM',
    toggleExterior: '🏷️ PAPERCRAFT: EXTERIOR',

    warning1Title: 'WARNING 01 // CRUSTAL BEDROCK REACHED',
    warning1Desc: 'You have struck the literal bedrock of Earth’s crust at -11,050 meters. There is no official ocean chart past this floor. Turn back immediately.',
    warning2Title: 'CRITICAL WARNING 02 // HULL INTEGRITY 68%',
    warning2Desc: 'Hear the hull metal groaning under 1,150 atmospheres of pressure. Stop forcing the submersible deeper into the planetary mantle!',
    warning3Title: 'FINAL WARNING 03 // BARRICADE BREACHED',
    warning3Desc: 'If you scroll past this point, the reality barrier of the ocean floor will shatter. One more pull downward and there is no returning!',
    warning4Title: 'FRACTURE IMMINENT',
    warning4Desc: 'SCROLL ONE MORE PIXEL TO BREAK THE SEABED',

    starSeaTitle: 'The Subterranean Star Sea',
    starSeaSubtitle: 'DEPTH: -12,994.0 METERS // THE INNER WORLD',
    starSeaDesc: 'You did not perish at the bottom of the world. You broke through the tectonic bedrock and discovered the secret luminous cosmos sleeping beneath planet Earth.',
    titanName: 'Pelagia Primordialis (The Star-Crested Leviathan)',
    titanTaxon: 'Prehistoric Celestial Leviathan Ancestor · 140.0 Meters',
    titanLore: 'Ancient nautical myths spoke of a beast whose wings were folded from starlight and cosmic parchment. It glides through the molten core, feeding on geothermal currents.',
    surfaceButton: 'SURFACE TO PACIFIC DUNES (+10M)',
    stardustButton: 'RELEASE CELESTIAL STARDUST',

    expeditionComplete: 'EXPEDITION PROTOCOL COMPLETED',
    challengerReflection: 'You have descended past the limits of human perception, through eleven vertical kilometers of the Pacific Ocean. Where Mount Everest would sit submerged beneath two kilometers of water, the living earth is still breathing.',
    surveyors: 'SURVEYORS & ARCHITECTS',
    surfaceLocation: 'SURFACE LOCATION',
    returnToShore: 'RETURN TO THE SUNLIT SHORE',
    viewDiploma: 'VIEW EXPEDITION DIPLOMA',

    rosterTitle: 'Pacific Bathymetric Roster',
    speciesStamped: 'Species Stamped',
    searchPlaceholder: 'Search 50 species by name, plate, or trait...',

    povActive: 'BATHYSCAPHE COCKPIT // POV ACTIVE',
    halogenSpotlight: 'SPOTLIGHT: HALOGEN 24,000 LUMENS',
    spotlightAim: 'AIM WITH CURSOR / TOUCH TO ILLUMINATE BIOTA',
  },

  id: {
    brandTitle: 'PELAGIA',
    brandSubtitle: 'EKSPEDISI PENYELAMAN SAMUDRA PASIFIK',
    expedition: 'EKSPEDISI',
    zone: 'ZONA',
    soundOn: 'SUARA LAUT',
    soundOff: 'SUARA MATI',
    logbook: 'BUKU LOG',
    depthGauge: 'METERAN KEDALAMAN',
    meters: 'METER',
    pressure: 'TEKANAN',
    temperature: 'SUHU',
    scrollDownToDive: 'GULIR KE BAWAH UNTUK MENYELAM',
    diveSubtitle: 'Dari bukit pasir hangat, selami sebelas kilometer vertikal menembus samudra bumi.',
    shorelineTag: 'GARIS PANTAI PASIFIK (+10M)',

    sonarRadar: 'RADAR SONAR',
    nextSpecimenIn: 'Mendekati spesies berikut dalam',
    metersAway: 'm',

    zone0Title: 'Garis Pantai & Gumuk Pasir',
    zone0Summary: 'Batas hangat tempat bukit pasir bertemu deburan ombak garam. Kepiting hantu melesat di pasir kuarsa sementara burung camar melayang di langit biru.',
    zone1Title: 'Ranah Cahaya Mentari (Epipelagik)',
    zone1Summary: 'Kanopi bercahaya samudra. Terumbu karang mekar bermandikan berkas sinar zamrud, sementara monster jinak meluncur anggun di antara gerombolan ikan perak.',
    zone2Title: 'Ranah Remang-Remang (Mesopelagik)',
    zone2Summary: 'Dunia misterius tempat spektrum cahaya merah musnah. Makhluk-makhluk ajaib mengarungi senja abadi dengan mata teleskopik raksasa dan sisik keperakan.',
    zone3Title: 'Ranah Tengah Malam (Batipelagik)',
    zone3Summary: 'Kegelapan mutlak menguasai segalanya. Mentari padam total. Percikan lentera hidup dan lampu fotofor bioluminesen menembus pekatnya tinta hitam dingin.',
    zone4Title: 'Dataran Abisal (Abisopelagik)',
    zone4Summary: 'Gurun samudra raksasa di dasar dunia. Tekanan air sanggup meremukkan lambung baja kapal, saat fosil hidup dan ikan tripod bertengger tenang di hamparan lumpur sutra.',
    zone5Title: 'Palung Hadal (Hadalpelagik)',
    zone5Summary: 'Luka patahan tektonik terdalam di bumi. Ikan siput tembus pandang dan kutu laut raksasa berlapis zirah bertahan hidup di bawah tekanan 1.000 atmosfer.',

    inspectSpecimen: 'Periksa Biota',
    openJournal: 'BUKA JURNAL →',
    size: 'UKURAN',
    logged: 'DICATAT',
    examinePills: 'PILIH ADAPTASI ANATOMI UNTUK DIPERIKSA:',

    modalArchive: 'ARSIP EKSPEDISI',
    fieldNotes: 'Catatan Lapangan',
    scaleExplorer: 'Komparasi Ukuran',
    oceanPhysics: 'Fisika Kedalaman',
    close: 'Tutup',
    stampLog: 'STEMPEL LOG',
    stampExamined: '★ TELAH DIPERIKSA // RESMI',
    diet: 'MAKANAN',
    weight: 'BOBOT',
    discoveredYear: 'DITEMUKAN',
    hydrostaticPressure: 'TEKANAN HIDROSTATIS',
    solarPenetration: 'PENETRASI SURYA',
    survivalAdaptations: 'Adaptasi Bertahan Hidup di Palung Dalam',
    keyAdaptations: 'KARAKTERISTIK ADAPTASI UTAMA',
    observationLog: 'CATATAN PENGAMATAN NATURALIS',
    scale: 'SKALA UKURAN //',
    diverScale: 'Penyelam (1.8m)',
    submersibleScale: 'Kapal Selam (8m)',
    maskScale: 'Masker (0.2m)',
    featureNote: 'CATATAN FITUR',
    toggleXRay: '🔬 RONTGEN: RADIOGRAM',
    toggleExterior: '🏷️ SENI KERTAS: FISIK',

    warning1Title: 'PERINGATAN 01 // DASAR KERAK BUMI TERCAPAI',
    warning1Desc: 'Kamu telah menabrak dasar kerak Bumi di -11.050 meter. Tidak ada peta samudra resmi di bawah lantai ini. Putar balik sekarang.',
    warning2Title: 'PERINGATAN KRITIS 02 // INTEGRITAS LAMBUNG 68%',
    warning2Desc: 'Dengarkan suara logam lambung kapal yang mengerang akibat tekanan 1.150 atmosfer. Hentikan pemaksaan kapal selam ke mantel bumi!',
    warning3Title: 'PERINGATAN TERAKHIR 03 // BARRICADE JEBOL',
    warning3Desc: 'Jika kamu terus menggulir melewati batas ini, dinding realitas dasar laut akan pecah. Satu guliran lagi ke bawah dan kamu tidak bisa kembali!',
    warning4Title: 'FRACTURE IMMINENT',
    warning4Desc: 'GULIR SATU PIKSEL LAGI UNTUK MEMECAHKAN DASAR BUMI',

    starSeaTitle: 'Samudra Bintang di Bawah Bumi',
    starSeaSubtitle: 'KEDALAMAN: -12.994,0 METER // INTI DUNIA RAHASIA',
    starSeaDesc: 'Kamu tidak binasa di dasar dunia. Kamu berhasil menembus batuan kerak bumi dan menemukan kosmos bercahaya abadi yang tertidur di inti planet ini.',
    titanName: 'Pelagia Primordialis (Sang Raksasa Bintang)',
    titanTaxon: 'Leluhur Raksasa Samudra Kosmik Purba · 140,0 Meter',
    titanLore: 'Mitos maritim kuno menceritakan raksasa yang sayapnya terbuat dari cahaya bintang dan lipatan perkamen. Ia berenang di magma cair bumi, memakan arus gravitasi.',
    surfaceButton: 'KEMBALI KE PERMUKAAN (+10M)',
    stardustButton: 'PANCARKAN DEBU BINTANG KOSMIK',

    expeditionComplete: 'PROTOKOL EKSPEDISI SELESAI',
    challengerReflection: 'Kamu telah menyelam melampaui batas persepsi manusia, menembus sebelas kilometer vertikal Samudra Pasifik. Di mana Gunung Everest akan tenggelam di bawah dua kilometer air, bumi yang hidup masih bernapas.',
    surveyors: 'PENELITI & ARSITEK',
    surfaceLocation: 'LOKASI PERMUKAAN',
    returnToShore: 'KEMBALI KE PANTAI PERMUKAAN',
    viewDiploma: 'LIHAT DIPLOMA EKSPEDISI',

    rosterTitle: 'Katalog Spesies Kedalaman Pasifik',
    speciesStamped: 'Spesies Tercatat',
    searchPlaceholder: 'Cari 50 spesies berdasarkan nama, pelat, atau ciri...',

    povActive: 'KOKPIT KAPAL SELAM // POV AKTIF',
    halogenSpotlight: 'LAMPU SOROT: HALOGEN 24.000 LUMENS',
    spotlightAim: 'ARAHKAN KURSOR / SENTUH UNTUK MENYINARI BIOTA',
  },

  ja: {
    brandTitle: 'ペラギア (PELAGIA)',
    brandSubtitle: '太平洋深海潜水海洋図鑑',
    expedition: '探検隊',
    zone: '深度帯',
    soundOn: '海洋音響 ON',
    soundOff: '消音',
    logbook: '航海日誌',
    depthGauge: '深度計',
    meters: 'メートル',
    pressure: '水圧',
    temperature: '水温',
    scrollDownToDive: 'スクロールして深海へ潜水',
    diveSubtitle: '陽光降り注ぐ砂浜から、地球深海11,000メートルの極限へ。',
    shorelineTag: '太平洋沿岸・砂丘 (+10M)',

    sonarRadar: 'ソナー探査',
    nextSpecimenIn: '次の深海生物まであと',
    metersAway: 'm',

    zone0Title: '沿岸砂浜・砂丘帯',
    zone0Summary: '砂丘と白波が出会う陽光の境界。スナガニが石英の砂を疾走し、上空をカモメが旋回します。',
    zone1Title: '表層・陽光帯 (エピペラジック)',
    zone1Summary: '海の光あふれる天蓋。透き通るエメラルドの光の中でサンゴが咲き誇り、巨獣たちが銀の魚群を率いて泳ぎます。',
    zone2Title: '中深層・薄光帯 (メソペラジック)',
    zone2Summary: '赤い光が死滅する黄昏の幽冥界。巨大な望遠鏡のような眼と銀の鱗を持つ異形の生物たちが永遠の薄暮を泳ぎます。',
    zone3Title: '漸深層・無光帯 (バシペラジック)',
    zone3Summary: '永遠の静寂と漆黒の支配。太陽は完全に消滅し、青く明滅する発光器と怪魚たちの光が冷たい黒煙を切り裂きます。',
    zone4Title: '深海層・深海平原 (アビソペラジック)',
    zone4Summary: '地球最大の海洋砂漠。鉄の船体を押し潰す水圧の中、生きた化石や三脚魚が絹のような沈殿物の上に静かに佇みます。',
    zone5Title: '超深海層・海溝帯 (ハダルペラジック)',
    zone5Summary: '地球最深の裂け目。半透明のスネイルフィッシュや巨大端脚類が、平方インチあたり16,000ポンドの破壊的圧力の下で繁栄します。',

    inspectSpecimen: '生物を観察',
    openJournal: '日誌を開く →',
    size: '体長',
    logged: '記録済',
    examinePills: '観察する解剖学的特徴を選択：',

    modalArchive: '海洋生物アーカイブ',
    fieldNotes: '観察記録',
    scaleExplorer: 'サイズ比較',
    oceanPhysics: '深海物理環境',
    close: '閉じる',
    stampLog: '記録印を押す',
    stampExamined: '★ 鑑定済 // 正式採集',
    diet: '食性',
    weight: '体重',
    discoveredYear: '発見年',
    hydrostaticPressure: '静水圧',
    solarPenetration: '太陽光到達率',
    survivalAdaptations: '超深海極限環境への適応',
    keyAdaptations: '主要な解剖学的適応特徴',
    observationLog: 'ナチュラリスト観察日誌',
    scale: '縮尺比較 //',
    diverScale: 'ダイバー (1.8m)',
    submersibleScale: '潜水艇 (8m)',
    maskScale: '水中メガネ (0.2m)',
    featureNote: '適応ノート',
    toggleXRay: '🔬 X線：放射線写真',
    toggleExterior: '🏷️ ペーパークラフト：外観',

    warning1Title: '警告 01 // 地殻最深底到達',
    warning1Desc: '-11,050メートル。地球の地殻岩盤に激突しました。これより先の海洋海図は存在しません。直ちに浮上してください。',
    warning2Title: '重大警告 02 // 船体強度 68%',
    warning2Desc: '1,150気圧の超高圧でチタン外殻が軋んでいます。これ以上潜水艇をマントル層へ押し込むのは危険です！',
    warning3Title: '最終警告 03 // 限界深度突破',
    warning3Desc: 'ここをスクロールすれば、海底の現実の壁が崩壊します。あと一度の潜水で、二度と戻れなくなります！',
    warning4Title: '時空破断寸前',
    warning4Desc: 'あと1ピクセルスクロールで、海底の限界を突破します',

    starSeaTitle: '地底の星海 (Subterranean Star Sea)',
    starSeaSubtitle: '深度: -12,994.0メートル // 地球の内部宇宙',
    starSeaDesc: 'あなたは世界の底で沈んだのではありません。地球の地殻を突き破り、惑星の内側に眠る秘密の星辰の海を発見したのです。',
    titanName: 'ペラギア・プリモルディアリス (星冠の古巨獣)',
    titanTaxon: '先史星辰リヴァイアサン · 全長 140.0メートル',
    titanLore: '古代の伝承は、星の光と折り紙の翼を持つ巨獣を語っていました。それは地球の核を優雅に泳ぎ、地熱の歌を糧としています。',
    surfaceButton: '地上・太平洋の砂浜へ浮上 (+10M)',
    stardustButton: '星屑の光波を放出',

    expeditionComplete: '探検プロトコル完了',
    challengerReflection: 'あなたは人間の知覚の限界を超え、太平洋の11垂直キロメートルを潜り抜けました。エベレスト山が2キロの海水の下に沈む場所で、生きた地球はまだ息づいています。',
    surveyors: '調査員・設計者',
    surfaceLocation: '洋上座標',
    returnToShore: '陽光の砂浜へ帰還',
    viewDiploma: '探検修了証書を表示',

    rosterTitle: '太平洋深度別生物目録',
    speciesStamped: '種採集完了',
    searchPlaceholder: '50種の生物を名前、図版、特徴で検索...',

    povActive: '潜水艇コックピット // 主観視点起動',
    halogenSpotlight: '探照灯：ハロゲン 24,000ルーメン',
    spotlightAim: 'カーソルやタッチで生物を照らす',
  },
};
