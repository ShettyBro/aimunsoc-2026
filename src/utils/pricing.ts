import {
  INDIVIDUAL_BASE_FEE,
  ACCOMMODATION_FEE,
  DELEGATION_TIERS,
} from '../data/pricing';

export function calcIndividualTotal(
  accommodationRequired: boolean
): { base: number; accommodation: number; total: number } {
  const base = INDIVIDUAL_BASE_FEE;
  const accommodation = accommodationRequired ? ACCOMMODATION_FEE : 0;

  return { base, accommodation, total: base + accommodation };
}

export function calcDelegationTotal(
  numberOfDelegates: string,
  accommodationRequired: boolean,
  accommodationDelegates: string
): {
  perHead: number;
  registrationTotal: number;
  accommodationTotal: number;
  total: number;
  tierLabel: string;
} {
  const count = parseInt(numberOfDelegates) || 0;

  const tier = DELEGATION_TIERS.find((t) => count >= t.min && count <= t.max);
  const perHead = tier?.perHead || 0;
  const registrationTotal = perHead * count;

  let accommodationTotal = 0;
  const accDelegates = parseInt(accommodationDelegates) || 0;
  if (accommodationRequired && accDelegates > 0) {
    accommodationTotal = ACCOMMODATION_FEE * accDelegates;
  }

  const tierLabel = tier
    ? `Bulk rate (${tier.min}${tier.max === Infinity ? '+' : `–${tier.max}`} delegates)`
    : '';

  return {
    perHead,
    registrationTotal,
    accommodationTotal,
    total: registrationTotal + accommodationTotal,
    tierLabel,
  };
}
