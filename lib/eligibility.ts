import { addDays, diffInDays, todayISO } from "./format";

export const MIN_DAYS_BETWEEN_DONATIONS = 90;

export interface EligibilityResult {
  daysSince: number;
  isEligible: boolean;
  nextEligibleDateISO: string;
  daysRemaining: number;
}

/**
 * Única fuente de verdad para la regla de 90 días entre donaciones
 * (secciones 3, 8, 15-17 y 30-31 del PDF). La consumen la tarjeta de
 * elegibilidad del panel, el cuestionario de agendamiento y las pantallas
 * de "Mi elegibilidad", para que todas muestren siempre el mismo resultado.
 */
export function getEligibility(
  lastDonationDateISO: string,
  todayIso: string = todayISO(),
): EligibilityResult {
  const daysSince = diffInDays(lastDonationDateISO, todayIso);
  const isEligible = daysSince >= MIN_DAYS_BETWEEN_DONATIONS;
  const nextEligibleDateISO = addDays(
    lastDonationDateISO,
    MIN_DAYS_BETWEEN_DONATIONS,
  );
  const daysRemaining = Math.max(0, MIN_DAYS_BETWEEN_DONATIONS - daysSince);

  return { daysSince, isEligible, nextEligibleDateISO, daysRemaining };
}
