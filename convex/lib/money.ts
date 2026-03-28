import Decimal from "decimal.js";

Decimal.set({ rounding: Decimal.ROUND_HALF_UP });

const int = (d: Decimal) => d.toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();

/** Convert loaded INR (paisa) into USD cents using INR rupees per 1 USD. */
export function inrPaisaToUsdCents(
  amountINRPaisa: number,
  inrPerUsd: number,
): number {
  if (amountINRPaisa < 0 || inrPerUsd <= 0) {
    throw new Error("Invalid amount or rate");
  }
  const usdMajor = new Decimal(amountINRPaisa).div(100).div(inrPerUsd);
  return int(usdMajor.mul(100));
}

/** Convert loaded INR (paisa) into EUR cents using INR rupees per 1 EUR. */
export function inrPaisaToEurCents(
  amountINRPaisa: number,
  inrPerEur: number,
): number {
  if (amountINRPaisa < 0 || inrPerEur <= 0) {
    throw new Error("Invalid amount or rate");
  }
  const eurMajor = new Decimal(amountINRPaisa).div(100).div(inrPerEur);
  return int(eurMajor.mul(100));
}

/**
 * INR paisa required to cover USD shortfall (cents) at emergency rate:
 * effective INR per USD = inrPerUsd * (1 + feeFraction).
 */
export function usdShortfallToInrPaisaEmergency(
  usdShortfallCents: number,
  inrPerUsd: number,
  emergencyFeeFraction: number,
): number {
  if (usdShortfallCents <= 0 || inrPerUsd <= 0) {
    throw new Error("Invalid shortfall or rate");
  }
  const usdMajor = new Decimal(usdShortfallCents).div(100);
  const inrRupees = usdMajor.mul(inrPerUsd).mul(new Decimal(1).plus(emergencyFeeFraction));
  return int(inrRupees.mul(100).ceil());
}
