// Product and business-model assumptions, taken from the team's Model and Management Sprint deck.
// Edit these numbers and the whole site updates.

export type SizeId = 'apt' | 'std' | 'lg';
export type FabricId = 'oat' | 'fog' | 'sage' | 'clay' | 'forest' | 'char';

export interface Size { id: SizeId; label: string; inches: string; price: number }
export interface Fabric { id: FabricId; name: string; hex: string }
export interface Tariff { rate: number; note: string }
export interface ComingItem { name: string; note: string }
export interface UnitEconomics { landed: number; revenue: number; contribution: number; breakeven: number; profit: number }

export const SIZES: Size[] = [
  { id: 'apt', label: 'Apartment', inches: '72 in', price: 1599 },
  { id: 'std', label: 'Standard', inches: '84 in', price: 1649 },
  { id: 'lg', label: 'Large', inches: '96 in', price: 1699 },
];

export const FABRICS: Fabric[] = [
  { id: 'oat', name: 'Oat linen blend', hex: '#D9CFC0' },
  { id: 'fog', name: 'Fog bouclé', hex: '#C9CCC8' },
  { id: 'sage', name: 'Sage weave', hex: '#9DB3A7' },
  { id: 'clay', name: 'Clay velvet', hex: '#C8643C' },
  { id: 'forest', name: 'Forest velvet', hex: '#2E4A40' },
  { id: 'char', name: 'Charcoal tweed', hex: '#4A4A48' },
];

export const DELIVERY_FEE = 149;
export const PROTECTION_FEE = 99;
export const LEAD_DAYS = 21;

// Unit economics (Proforma v3, recommended scenario).
// FACTORY_COST, FREIGHT and CARRIER come from the deck; OTHER_VARIABLE and FIXED_MONTHLY are
// back-solved so a Standard sofa at a 25% tariff gives $450 contribution and ~44 orders/month breakeven.
export const ECON = {
  FACTORY_COST: 600,
  FREIGHT: 158,
  CARRIER: 175,
  OTHER_VARIABLE: 265,
  FIXED_MONTHLY: 19800,
} as const;

export const TARIFFS: Tariff[] = [
  { rate: 25, note: 'today' },
  { rate: 30, note: 'from Jan 2027' },
  { rate: 35, note: 'stress test' },
];

export const TEAM: string[] = ['Morgan Honeycutt', 'Arica Brown', 'Ngawang Sherpa', 'Derrick Ward'];

export const COMING_NEXT: ComingItem[] = [
  { name: 'Wren sofa', note: 'Grow-up range' },
  { name: 'Ellis sofa', note: 'Grow-up range' },
  { name: 'Hollis chair', note: 'Accent piece' },
  { name: 'Juno chaise', note: 'Accent piece' },
  { name: 'Replacement covers', note: 'Refresh your Nelson' },
];

export function unitEconomics(sofaPrice: number, tariffRate: number, ordersPerMonth: number): UnitEconomics {
  const landed = ECON.FACTORY_COST * (1 + tariffRate / 100) + ECON.FREIGHT;
  const revenue = sofaPrice + DELIVERY_FEE;
  const contribution = revenue - landed - ECON.CARRIER - ECON.OTHER_VARIABLE;
  const breakeven = contribution > 0 ? Math.ceil(ECON.FIXED_MONTHLY / contribution) : Infinity;
  const profit = ordersPerMonth * contribution - ECON.FIXED_MONTHLY;
  return { landed, revenue, contribution, breakeven, profit };
}
