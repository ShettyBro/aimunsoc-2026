import {
  INDIVIDUAL_BASE_FEE,
  ACCOMMODATION_2_NIGHTS,
  ACCOMMODATION_3_NIGHTS,
  DELEGATION_TIERS,
} from '../data/pricing';

export function calcIndividualTotal(
  accommodationRequired: boolean,
  accommodationScheme: '2nights' | '3nights' | ''
): { base: number; accommodation: number; total: number } {
  const base = INDIVIDUAL_BASE_FEE;
  let accommodation = 0;

  if (accommodationRequired && accommodationScheme) {
    accommodation =
      accommodationScheme === '2nights' ? ACCOMMODATION_2_NIGHTS : ACCOMMODATION_3_NIGHTS;
  }

  return { base, accommodation, total: base + accommodation };
}

export function calcDelegationTotal(
  numberOfDelegates: string,
  accommodationRequired: boolean,
  accommodationDelegates: string,
  accommodationScheme: '2nights' | '3nights' | ''
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
  if (accommodationRequired && accommodationScheme && accDelegates > 0) {
    const perHeadAcc =
      accommodationScheme === '2nights' ? ACCOMMODATION_2_NIGHTS : ACCOMMODATION_3_NIGHTS;
    accommodationTotal = perHeadAcc * accDelegates;
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
