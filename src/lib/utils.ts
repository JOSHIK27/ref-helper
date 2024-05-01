import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysFromToday(dateString: string) {
  // Parse the input date string
  var parts = dateString.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1; // months are zero-indexed
  var day = parseInt(parts[2], 10);

  // Create date objects for today and the target date
  var today = new Date();
  var targetDate = new Date(year, month, day);

  // Calculate the difference in milliseconds
  var differenceMs = targetDate.getTime() - today.getTime();

  // Convert the difference to days
  var differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return differenceDays;
}
