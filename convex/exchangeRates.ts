import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Live FX quotes from public financial APIs (Frankfurter, ECB-backed; fallback open.er-api.com).
 * Returns how many INR equal one unit of each foreign currency (USD, EUR, GBP), i.e. street-style
 * "INR per 1 USD/EUR/GBP" for travelers, with base labeled as INR in the response payload.
 */
export const fetchExchangeRates = action({
  args: v.object({}),
  handler: async () => {
    const inrPerUnit = await fetchInrPerUnitFromFinancialApis();

    return {
      USD: inrPerUnit.USD,
      EUR: inrPerUnit.EUR,
      GBP: inrPerUnit.GBP,
      base: "INR",
      timestamp: new Date().toISOString(),
    };
  },
});

type InrPerUnit = { USD: number; EUR: number; GBP: number };

/** Amount of INR equivalent to 1 USD, 1 EUR, and 1 GBP (from INR-quoted API rates). */
function inrPerForeignFromInrBaseRates(rates: {
  USD: number;
  EUR: number;
  GBP: number;
}): InrPerUnit {
  // APIs return "foreign currency per 1 INR" (small decimals). Invert to get INR per 1 unit FX.
  return {
    USD: 1 / rates.USD,
    EUR: 1 / rates.EUR,
    GBP: 1 / rates.GBP,
  };
}

async function fetchInrPerUnitFromFinancialApis(): Promise<InrPerUnit> {
  const frankfurter = await tryFrankfurter();
  if (frankfurter) {
    return frankfurter;
  }

  const erApi = await tryOpenErApi();
  if (erApi) {
    return erApi;
  }

  throw new Error(
    "Could not load exchange rates from financial providers (Frankfurter and open.er-api.com).",
  );
}

async function tryFrankfurter(): Promise<InrPerUnit | null> {
  const url =
    "https://api.frankfurter.app/latest?from=INR&to=USD,EUR,GBP";
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  const data: unknown = await res.json();
  if (
    !isRecord(data) ||
    !isRecord(data.rates) ||
    typeof data.rates.USD !== "number" ||
    typeof data.rates.EUR !== "number" ||
    typeof data.rates.GBP !== "number"
  ) {
    return null;
  }
  const { USD, EUR, GBP } = data.rates;
  if (USD <= 0 || EUR <= 0 || GBP <= 0) {
    return null;
  }
  return inrPerForeignFromInrBaseRates({ USD, EUR, GBP });
}

async function tryOpenErApi(): Promise<InrPerUnit | null> {
  const url = "https://open.er-api.com/v6/latest/INR";
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  const data: unknown = await res.json();
  if (
    !isRecord(data) ||
    data.result !== "success" ||
    !isRecord(data.rates) ||
    typeof data.rates.USD !== "number" ||
    typeof data.rates.EUR !== "number" ||
    typeof data.rates.GBP !== "number"
  ) {
    return null;
  }
  const { USD, EUR, GBP } = data.rates;
  if (USD <= 0 || EUR <= 0 || GBP <= 0) {
    return null;
  }
  return inrPerForeignFromInrBaseRates({ USD, EUR, GBP });
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
