import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1) + "T";
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }
  return num.toFixed(num % 1 === 0 ? 0 : 1);
}

export function formatCPS(cps: number): string {
  if (cps >= 1_000_000) {
    return (cps / 1_000_000).toFixed(2) + "M";
  }
  if (cps >= 1_000) {
    return (cps / 1_000).toFixed(2) + "K";
  }
  return cps.toFixed(1);
}
