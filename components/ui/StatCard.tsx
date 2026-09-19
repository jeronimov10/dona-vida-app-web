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
    <div className={cn("rounded-xl border border-soft bg-surface p-6 shadow-card", className)}>
      <p className="text-label uppercase text-ink-muted">{label}</p>
      <p className="text-h1 mt-2">{value}</p>
      {caption && <p className="text-caption mt-1 text-ink-muted">{caption}</p>}
    </div>
  );
}
