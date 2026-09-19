import { cn } from "@/lib/cn";

export interface StatCardProps {
  label: string;
  value: string;
  caption?: string;
  className?: string;
}

/**
 * Stat Card: etiqueta en mayúsculas + valor grande + leyenda opcional.
 */
export function StatCard({ label, value, caption, className }: StatCardProps) {
  return (
    <div className={cn("border border-gray-20 bg-gray-white p-6", className)}>
      <p className="text-label uppercase text-gray-60">{label}</p>
      <p className="text-h1 mt-2">{value}</p>
      {caption && <p className="text-caption mt-1 text-gray-60">{caption}</p>}
    </div>
  );
}
