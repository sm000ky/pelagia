import React from 'react';
import { BiotaSpecimen } from '../../types';
import {
  GhostCrabSVG,
  SeagullSVG,
  ClownfishAnemoneSVG,
  GreenTurtleSVG,
  MantaRaySVG,
  WhaleSharkSVG,
  GiantOarfishSVG,
  BarreleyeSVG,
  GlassSquidSVG,
  AnglerfishSVG,
  GulperEelSVG,
  VampireSquidSVG,
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
    case 'manta-ray':
      return <MantaRaySVG className={className} />;
    case 'whale-shark':
      return <WhaleSharkSVG className={className} />;
    case 'giant-oarfish':
      return <GiantOarfishSVG className={className} />;
    case 'barreleye':
      return <BarreleyeSVG className={className} />;
    case 'glass-squid':
      return <GlassSquidSVG className={className} />;
    case 'anglerfish':
      return <AnglerfishSVG className={className} />;
    case 'gulper-eel':
      return <GulperEelSVG className={className} />;
    case 'vampire-squid':
      return <VampireSquidSVG className={className} />;
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
