import { cn } from "@/lib/cn";

/** Divider: línea horizontal de 1px. */
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-t border-gray-20", className)} />;
}
