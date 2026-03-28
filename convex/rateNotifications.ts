import { query } from "./_generated/server";
import { v } from "convex/values";
import type { Feature1ExchangeRates, ForecastCurrency } from "./forecaster";

/**
 * Smart threshold check for travel-wallet alerts.
 * Uses the same INR-per-unit convention as Feature 1 (`fetchExchangeRates`): how many INR equal one unit of `pair`.
 * Notify when currentRate <= threshold (user’s chosen floor, in that same unit).
 */

export type RateThresholdNotificationInput = {
  pair: ForecastCurrency;
  currentRate: number;
  threshold: number;
};

export type RateThresholdNotificationResult = {
  shouldNotify: boolean;
  message: string;
};

const PAIR_LABEL: Record<ForecastCurrency, string> = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
};

/**
 * Reusable decision logic (no side effects). Safe to call from UI, other Convex functions, or tests.
 */
export function evaluateRateNotification(
  input: RateThresholdNotificationInput,
): RateThresholdNotificationResult {
  const { pair, currentRate, threshold } = input;
  if (!Number.isFinite(currentRate) || !Number.isFinite(threshold)) {
    return {
      shouldNotify: false,
      message: "Rate or threshold isn’t valid, so we won’t trigger an alert.",
    };
  }

  const label = PAIR_LABEL[pair];
  if (currentRate <= threshold) {
    return {
      shouldNotify: true,
      message: `${label}/INR is now ${currentRate.toFixed(2)} (at or below your ${threshold.toFixed(2)} target)—worth a quick travel-wallet check.`,
    };
  }

  return {
    shouldNotify: false,
    message: `${label}/INR is ${currentRate.toFixed(2)}, above your ${threshold.toFixed(2)} target—no alert.`,
  };
}

/**
 * Same check using a Feature 1 snapshot: `rates[pair]` is the live INR-per-unit rate.
 */
export function evaluateRateNotificationFromFeature1(
  rates: Feature1ExchangeRates,
  pair: ForecastCurrency,
  threshold: number,
): RateThresholdNotificationResult {
  return evaluateRateNotification({
    pair,
    currentRate: rates[pair],
    threshold,
  });
}

/** Run the threshold check from the Convex dashboard or `useQuery`. */
export const checkRateThreshold = query({
  args: {
    pair: v.union(v.literal("USD"), v.literal("EUR"), v.literal("GBP")),
    currentRate: v.number(),
    threshold: v.number(),
  },
  handler: async (_ctx, args) => {
    return evaluateRateNotification({
      pair: args.pair,
      currentRate: args.currentRate,
      threshold: args.threshold,
    });
  },
});
