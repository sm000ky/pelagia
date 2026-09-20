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
  papercraftType: 
    | 'ghost-crab'
    | 'seagull'
    | 'clownfish-anemone'
    | 'green-turtle'
    | 'manta-ray'
    | 'lions-mane-jelly'
    | 'whale-shark'
    | 'blue-whale'
    | 'giant-octopus'
    | 'giant-oarfish'
    | 'barreleye'
    | 'glass-squid'
    | 'viperfish'
    | 'anglerfish'
    | 'gulper-eel'
    | 'giant-squid'
    | 'vampire-squid'
    | 'coelacanth'
    | 'dumbo-octopus'
    | 'tripod-fish'
    | 'mariana-snailfish'
    | 'hadal-amphipod';
}
