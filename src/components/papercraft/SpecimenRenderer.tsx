import React from 'react';
import { BiotaSpecimen } from '../../types';
import {
  GhostCrabSVG,
  SeagullSVG,
  ClownfishAnemoneSVG,
  GreenTurtleSVG,
  LionsManeJellySVG,
  MantaRaySVG,
  WhaleSharkSVG,
  BlueWhaleSVG,
  GiantOctopusSVG,
  GiantOarfishSVG,
  BarreleyeSVG,
  GlassSquidSVG,
  ViperfishSVG,
  AnglerfishSVG,
  GulperEelSVG,
  GiantSquidSVG,
  VampireSquidSVG,
  CoelacanthSVG,
  DumboOctopusSVG,
  TripodFishSVG,
  MarianaSnailfishSVG,
  HadalAmphipodSVG,
} from './SpecimenSVGs';

interface SpecimenRendererProps {
  type: BiotaSpecimen['papercraftType'];
  className?: string;
}

export const SpecimenRenderer: React.FC<SpecimenRendererProps> = ({ type, className }) => {
  switch (type) {
    case 'ghost-crab':
      return <GhostCrabSVG className={className} />;
    case 'seagull':
      return <SeagullSVG className={className} />;
    case 'clownfish-anemone':
      return <ClownfishAnemoneSVG className={className} />;
    case 'green-turtle':
      return <GreenTurtleSVG className={className} />;
    case 'lions-mane-jelly':
      return <LionsManeJellySVG className={className} />;
    case 'manta-ray':
      return <MantaRaySVG className={className} />;
    case 'whale-shark':
      return <WhaleSharkSVG className={className} />;
    case 'blue-whale':
      return <BlueWhaleSVG className={className} />;
    case 'giant-octopus':
      return <GiantOctopusSVG className={className} />;
    case 'giant-oarfish':
      return <GiantOarfishSVG className={className} />;
    case 'barreleye':
      return <BarreleyeSVG className={className} />;
    case 'glass-squid':
      return <GlassSquidSVG className={className} />;
    case 'viperfish':
      return <ViperfishSVG className={className} />;
    case 'anglerfish':
      return <AnglerfishSVG className={className} />;
    case 'gulper-eel':
      return <GulperEelSVG className={className} />;
    case 'giant-squid':
      return <GiantSquidSVG className={className} />;
    case 'vampire-squid':
      return <VampireSquidSVG className={className} />;
    case 'coelacanth':
      return <CoelacanthSVG className={className} />;
    case 'dumbo-octopus':
      return <DumboOctopusSVG className={className} />;
    case 'tripod-fish':
      return <TripodFishSVG className={className} />;
    case 'mariana-snailfish':
      return <MarianaSnailfishSVG className={className} />;
    case 'hadal-amphipod':
      return <HadalAmphipodSVG className={className} />;
    default:
      return null;
  }
};
