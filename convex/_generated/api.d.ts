/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as exchangeRates from "../exchangeRates.js";
import type * as forecaster from "../forecaster.js";
import type * as ledger from "../ledger.js";
import type * as lib_authUser from "../lib/authUser.js";
import type * as lib_money from "../lib/money.js";
import type * as merchantParser from "../merchantParser.js";
import type * as rateNotifications from "../rateNotifications.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  exchangeRates: typeof exchangeRates;
  forecaster: typeof forecaster;
  ledger: typeof ledger;
  "lib/authUser": typeof lib_authUser;
  "lib/money": typeof lib_money;
  merchantParser: typeof merchantParser;
  rateNotifications: typeof rateNotifications;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
