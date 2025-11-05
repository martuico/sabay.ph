import { type ClassValue, clsx } from "clsx";
import { isValidElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isReactNode(value: any): value is ReactNode {
  if (value === null || value === undefined) {
    return true; // null or undefined are valid ReactNodes
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return true; // Primitives are valid ReactNodes
  }
  if (isValidElement(value)) {
    return true; // React elements are valid ReactNodes
  }
  if (Array.isArray(value)) {
    return value.every((item) => isReactNode(item)); // Recursively check array elements
  }
  return false;
}
