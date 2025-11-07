"use client";

import { useEffect, useState } from "react";
import { toast as sonnerToast } from "sonner";

export type ToastActionElement = {
  label: string;
  onClick: () => void;
};

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info" | "destructive";
  action?: ToastActionElement;
}

export function toast({ title, description, variant = "default", action }: ToastProps) {
  // Map your old API to Sonner calls
  switch (variant) {
    case "success":
      sonnerToast.success(title || "Success", {
        description,
        action,
      });
      break;
    case "destructive":
      sonnerToast.error(title || "Error", {
        description,
        action,
      });
      break;
    case "error":
      sonnerToast.error(title || "Error", {
        description,
        action,
      });
      break;
    case "warning":
      sonnerToast.warning(title || "Warning", {
        description,
        action,
      });
      break;
    case "info":
      sonnerToast.info(title || "Info", {
        description,
        action,
      });
      break;
    default:
      sonnerToast(title || "", {
        description,
        action,
      });
      break;
  }
}

// Optionally keep a `useToast` hook for compatibility
export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  // Sonner manages state internally, but we expose a fake `toasts` array
  // just for backward compatibility
  useEffect(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    toast,
    dismiss: sonnerToast.dismiss,
  };
}
