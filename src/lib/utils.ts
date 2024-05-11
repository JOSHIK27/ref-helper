import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysFromToday(dateString: string) {
  if (!dateString) return 0;
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

export const countries = [
  "United Kingdom",
  "United States Of America",
  "Canada",
  "Germany",
  "Australia",
];
export const roles = [
  "Fresher",
  "More than 1yr",
  "More than 2yrs",
  "More than 3yrs",
  "More than 4yrs",
];
export const fields = [
  "Software Development",
  "Data Science",
  "AI",
  "Finance",
  "Civil",
];
export const ed = ["Bachelors", "Masters"];

export function getUniquePropertyValues(array: any, property: any) {
  const uniqueValues: any[] = [];
  const uniqueSet = new Set(); // Using Set to ensure uniqueness

  array?.forEach((obj: any) => {
    const value = obj[property];
    if (!uniqueSet.has(value)) {
      uniqueSet.add(value);
      uniqueValues.push(value);
    }
  });

  return uniqueValues;
}
