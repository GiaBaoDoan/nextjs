import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleApiError = (error: any) => {
  toast({
    title: "SOS",
    description: `❌ ${error?.payload?.message || "Lỗi không xác định"}`,
  });
};
