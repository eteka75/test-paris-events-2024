import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
  const dateObj = new Date(date);
  const isoString = dateObj.toISOString();
  return isoString.replace("Z", "+00:00"); // fuseau
};
