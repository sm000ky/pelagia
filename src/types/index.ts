export type ZoneId = 'coastal' | 'sunlight' | 'twilight' | 'midnight' | 'abyss' | 'hadal';

export interface ZoneData {
  id: ZoneId;
  name: string;
  depthRange: string;
  depthMin: number;
  depthMax: number;
  paperBg: string;
  cardBg: string;
  textColor: string;
  subtextColor: string;
  accentColor: string;
  lightLevel: string;
  pressure: string;
  temperature: string;
  summary: string;
  quote: string;
}

export interface AnatomyHotspot {
  id: string;
  title: string;
  description: string;
  xPercent: number; // 0 to 100 for pin positioning
  yPercent: number;
}

export interface BiotaSpecimen {
  id: string;
  plateNumber: string;
  commonName: string;
  binomialName: string;
  japaneseName: string;
  zoneId: ZoneId;
  depthMeters: number;
  lengthMeters: number; // For scale comparison with 1.8m human
  weightKg?: string;
  diet: string;
  curiosityRating: 'Common' | 'Rare' | 'Mythical' | 'Abyssal';
  discoveryYear: string;
  observationNotes: string;
  anatomicalFeatures: string[];
  hotspots?: AnatomyHotspot[];
  papercraftType: string;
  tagCategory?: 'Fish' | 'Cephalopod' | 'Mammal' | 'Crustacean' | 'Reptile' | 'Jelly' | 'Bioluminescent';
}
