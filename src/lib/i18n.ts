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

  // Milestones
  milestone200: string;
  milestone1000: string;
  milestone3800: string;
  milestone6000: string;
  milestone10994: string;

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

    milestone200: 'Photosphere boundary: 99% of sunlight is extinguished. Entering the Twilight Realm.',
    milestone1000: 'Complete solar blackness. Hydrostatic pressure exceeds 100 atmospheres.',
    milestone3800: 'Abyssal floor horizon: The depth where the RMS Titanic rests in eternal silence.',
    milestone6000: 'Tectonic trench threshold: Leaving continental plates for the Hadal Trenches.',
    milestone10994: 'Challenger Deep reached: Earth’s absolute geological basement.',

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

    milestone200: 'Batas fotosfer: 99% cahaya matahari padam. Memasuki Ranah Remang-Remang (Twilight).',
    milestone1000: 'Kegelapan total samudra. Tekanan air melampaui 100 atmosfer.',
    milestone3800: 'Horizon abisal: Kedalaman di mana bangkai kapal RMS Titanic beristirahat dalam sunyi.',
    milestone6000: 'Batas palung tektonik: Meninggalkan lempeng benua menuju Palung Mariana.',
    milestone10994: 'Challenger Deep tercapai: Titik terendah geologis planet Bumi.',

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

    warning1Title: 'PERINGATAN 01 // DASAR KERAK BUMI TERCAPAI',
    warning1Desc: 'Kamu telah menabrak dasar kerak Bumi di -11.050 meter. Tidak ada peta samudra resmi di bawah lantai ini. Putar balik sekarang.',
    warning2Title: 'PERINGATAN KRITIS 02 // INTEGRITAS LAMBUNG 68%',
    warning2Desc: 'Dengarkan suara logam lambung kapal yang mengerang akibat tekanan 1.150 atmosfer. Hentikan pemaksaan kapal selam ke mantel bumi!',
    warning3Title: 'PERINGATAN TERAKHIR 03 // BARRICADE JEBOL',
    warning3Desc: 'Jika kamu terus menggulir melewati batas ini, dinding realitas dasar laut akan pecah. Satu guliran lagi ke bawah dan kamu tidak bisa kembali!',
    warning4Title: 'RET родо FRACTURE IMMINENT',
    warning4Desc: 'GULIR SATU PIKSEL LAGI UNTUK MEMECAHKAN DASAR BUMI',

    starSeaTitle: 'Samudra Bintang di Bawah Bumi',
    starSeaSubtitle: 'KEDALAMAN: -12.994,0 METER // INTI DUNIA RAHASIA',
    starSeaDesc: 'Kamu tidak binasa di dasar dunia. Kamu berhasil menembus batuan kerak bumi dan menemukan kosmos bercahaya abadi yang tertidur di inti planet ini.',
    titanName: 'Pelagia Primordialis (Sang Raksasa Bintang)',
    titanTaxon: 'Leluhur Raksasa Samudra Kosmik Purba · 140,0 Meter',
    titanLore: 'Mitos maritim kuno menceritakan raksasa yang sayapnya terbuat dari cahaya bintang dan lipatan perkamen. Ia berenang di magma cair bumi, memakan arus gravitasi.',
    surfaceButton: 'KEMBALI KE PERMUKAAN (+10M)',
    stardustButton: 'PANCARKAN DEBU BINTANG KOSMIK',
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

    milestone200: '太陽光境界：太陽の光の99%が消失。黄昏の薄光層へ突入。',
    milestone1000: '完全なる漆黒。静水圧は100気圧を超越。',
    milestone3800: '深海平原：タイタニック号が静寂の中で眠る深度。',
    milestone6000: '海溝境界：大陸プレートを超え、マリアナ海溝へ。',
    milestone10994: 'チャレンジャー海淵到達：地球最深部の岩盤。',

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
  },
};
