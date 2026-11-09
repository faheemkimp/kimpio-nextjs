import "server-only";

import { wpGetFile } from "./client";

/** One country's monthly designer cost, in local currency (as published in WordPress /json/). */
export interface CountrySalary {
  currency: string;
  symbol: string;
  moderate: number;
  senior: number;
}

export type SalaryTable = Record<string, CountrySalary>;

export interface SalaryData {
  freelance: SalaryTable;
  inHouse: SalaryTable;
  /** Units of each currency per 1 USD. */
  rates: Record<string, number>;
}

interface SalaryFile {
  cdata: { country: SalaryTable[] }[];
}

const TAGS = ["salary-data"];

/**
 * The data behind /salary-cost-calculator/, read from the same JSON files the
 * live calculator loads (https://www.kimp.io/json/...), so edits made there
 * show up here without a deploy.
 */
export async function getSalaryData(): Promise<SalaryData> {
  const [freelance, inHouse, rates] = await Promise.all([
    wpGetFile<SalaryFile>("/json/freelance.json", TAGS),
    wpGetFile<SalaryFile>("/json/in-house.json", TAGS),
    wpGetFile<{ rates: Record<string, number> }>("/json/exchangeRates.json", TAGS),
  ]);
  return {
    freelance: freelance.cdata[0]?.country[0] ?? {},
    inHouse: inHouse.cdata[0]?.country[0] ?? {},
    rates: rates.rates,
  };
}
