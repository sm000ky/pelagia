import React from 'react';
import { BiotaSpecimen } from '../../types';
import {
  GhostCrabSVG,
  SeagullSVG,
  HermitCrabSVG,
  ShorePloverSVG,
  MarineIguanaSVG,
  ClownfishAnemoneSVG,
  GreenTurtleSVG,
  LionsManeJellySVG,
  MantaRaySVG,
  BlueWhaleSVG,
  WhaleSharkSVG,
  GreatWhiteSVG,
  FlyingFishSVG,
  SailfishSVG,
  SeaOtterSVG,
  GiantOctopusSVG,
  OceanSunfishSVG,
  GiantOarfishSVG,
  BarreleyeSVG,
  GlassSquidSVG,
  StoplightLoosejawSVG,
  LanternfishSVG,
  BigeyeTunaSVG,
  SnipeEelSVG,
  CockatooSquidSVG,
  SilverHatchetfishSVG,
  SpinyDogfishSVG,
  RedCrabSVG,
  ViperfishSVG,
  AnglerfishSVG,
  GulperEelSVG,
  GiantSquidSVG,
  FangtoothSVG,
  BlackSwallowerSVG,
  VampireSquidSVG,
  GhostSharkSVG,
  DumboOctopusSVG,
  DragonfishSVG,
  CoelacanthSVG,
  TripodFishSVG,
  SeaPigSVG,
  FacelessCuskSVG,
  GiantIsopodSVG,
  AbyssalCtenophoreSVG,
  MarianaSnailfishSVG,
  HadalAmphipodSVG,
  EtherealSnailfishSVG,
  HadalCucumberSVG,
  XenophyophoreSVG,
  HadalTubewormSVG,
} from './SpecimenSVGs';

interface SpecimenRendererProps {
  type: BiotaSpecimen['papercraftType'];
  className?: string;
}

export const SpecimenRenderer: React.FC<SpecimenRendererProps> = ({ type, className }) => {
  switch (type) {
    // Zone 0: Coastal
    case 'ghost-crab':
      return <GhostCrabSVG className={className} />;
    case 'seagull':
      return <SeagullSVG className={className} />;
    case 'hermit-crab':
      return <HermitCrabSVG className={className} />;
    case 'shore-plover':
      return <ShorePloverSVG className={className} />;
    case 'marine-iguana':
      return <MarineIguanaSVG className={className} />;

    // Zone 1: Sunlight
    case 'clownfish-anemone':
      return <ClownfishAnemoneSVG className={className} />;
    case 'green-turtle':
      return <GreenTurtleSVG className={className} />;
    case 'lions-mane-jelly':
      return <LionsManeJellySVG className={className} />;
    case 'manta-ray':
      return <MantaRaySVG className={className} />;
    case 'blue-whale':
      return <BlueWhaleSVG className={className} />;
    case 'whale-shark':
      return <WhaleSharkSVG className={className} />;
    case 'great-white':
      return <GreatWhiteSVG className={className} />;
    case 'flying-fish':
      return <FlyingFishSVG className={className} />;
    case 'sailfish':
      return <SailfishSVG className={className} />;
    case 'sea-otter':
      return <SeaOtterSVG className={className} />;
    case 'giant-octopus':
      return <GiantOctopusSVG className={className} />;
    case 'ocean-sunfish':
      return <OceanSunfishSVG className={className} />;

    // Zone 2: Twilight
    case 'barreleye':
      return <BarreleyeSVG className={className} />;
    case 'glass-squid':
      return <GlassSquidSVG className={className} />;
    case 'giant-oarfish':
      return <GiantOarfishSVG className={className} />;
    case 'stoplight-loosejaw':
      return <StoplightLoosejawSVG className={className} />;
    case 'lanternfish':
      return <LanternfishSVG className={className} />;
    case 'bigeye-tuna':
      return <BigeyeTunaSVG className={className} />;
    case 'snipe-eel':
      return <SnipeEelSVG className={className} />;
    case 'cockatoo-squid':
      return <CockatooSquidSVG className={className} />;
    case 'silver-hatchetfish':
      return <SilverHatchetfishSVG className={className} />;
    case 'spiny-dogfish':
      return <SpinyDogfishSVG className={className} />;
    case 'red-crab':
      return <RedCrabSVG className={className} />;

    // Zone 3: Midnight
    case 'anglerfish':
      return <AnglerfishSVG className={className} />;
    case 'gulper-eel':
      return <GulperEelSVG className={className} />;
    case 'viperfish':
      return <ViperfishSVG className={className} />;
    case 'giant-squid':
      return <GiantSquidSVG className={className} />;
    case 'fangtooth':
      return <FangtoothSVG className={className} />;
    case 'black-swallower':
      return <BlackSwallowerSVG className={className} />;
    case 'vampire-squid':
      return <VampireSquidSVG className={className} />;
    case 'ghost-shark':
      return <GhostSharkSVG className={className} />;
    case 'dumbo-octopus':
      return <DumboOctopusSVG className={className} />;
    case 'dragonfish':
      return <DragonfishSVG className={className} />;

    // Zone 4: Abyss
    case 'coelacanth':
      return <CoelacanthSVG className={className} />;
    case 'tripod-fish':
      return <TripodFishSVG className={className} />;
    case 'sea-pig':
      return <SeaPigSVG className={className} />;
    case 'faceless-cusk':
      return <FacelessCuskSVG className={className} />;
    case 'giant-isopod':
      return <GiantIsopodSVG className={className} />;
    case 'abyssal-ctenophore':
      return <AbyssalCtenophoreSVG className={className} />;

    // Zone 5: Hadal
    case 'mariana-snailfish':
      return <MarianaSnailfishSVG className={className} />;
    case 'hadal-amphipod':
      return <HadalAmphipodSVG className={className} />;
    case 'ethereal-snailfish':
      return <EtherealSnailfishSVG className={className} />;
    case 'hadal-cucumber':
      return <HadalCucumberSVG className={className} />;
    case 'xenophyophore':
      return <XenophyophoreSVG className={className} />;
    case 'hadal-tubeworm':
      return <HadalTubewormSVG className={className} />;

    default:
      return <BarreleyeSVG className={className} />;
  }
};
