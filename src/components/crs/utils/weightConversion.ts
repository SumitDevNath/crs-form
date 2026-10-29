import type { BirthWeightUnit } from "../types/crs.types";

export function convertWeightToPounds(
  weight: string,
  unit: BirthWeightUnit,
): number | null {
  const numericWeight = Number(weight);

  if (!Number.isFinite(numericWeight) || numericWeight <= 0) {
    return null;
  }

  if (unit === "lb") {
    return Number(numericWeight.toFixed(2));
  }

  const pounds = numericWeight * 2.2046226218;

  return Number(pounds.toFixed(2));
}
