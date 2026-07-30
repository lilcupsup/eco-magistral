import {
  Accessibility,
  Construction,
  Leaf,
  Map,
  ParkingSquare,
  Route,
  ShieldCheck,
  Tractor,
  Trees,
  Users,
} from "lucide-react";

export const services = [
  {
    image: "/images/hero/eco-magistral-hero.avif",
    icon: Route,
  },
  {
    image: "/images/projects/landscaping.avif",
    icon: Trees,
  },
  {
    image: "/images/projects/football-field.avif",
    icon: Users,
  },
  {
    image: "/images/projects/parking.avif",
    icon: ParkingSquare,
  },
  {
    image: "/images/projects/public-space.avif",
    icon: Map,
  },
];

export const principles = [
  {
    icon: Construction,
  },
  {
    icon: ShieldCheck,
  },
  {
    icon: Leaf,
  },
  {
    icon: Accessibility,
  },
];

export const equipmentGroups = [
  { icon: Tractor },
  { icon: Route },
  { icon: Construction },
  { icon: ShieldCheck },
  { icon: Leaf },
];
