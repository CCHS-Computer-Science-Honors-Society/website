import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function captilize(item: string): string {
  return item.charAt(0).toUpperCase() + item.slice(1);
}
