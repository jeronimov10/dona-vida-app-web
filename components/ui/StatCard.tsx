import { ComponentType } from "react";
import { cn } from "@/lib/cn";
import { IconProps } from "@/components/icons";

export interface StatCardProps {
  label: string;
  value: string;
  caption?: string;
  /** Icono de la insignia superior derecha (componente del set de Figma). */
  icon?: ComponentType<IconProps>;
  className?: string;
}

/**
 * Stat Card: etiqueta en mayúsculas + valor grande + leyenda opcional.
 */
export function StatCard({ label, value, caption, icon: Icon, className }: StatCardProps) {
  return (
    <div className={cn("min-h-[132px] rounded-xl border border-soft bg-surface p-6 shadow-card", className)}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-label uppercase text-ink-muted">{label}</p>
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-soft">
            <Icon className="h-5 w-5 text-primary" />
          </span>
        )}
      </div>
      <p className="text-h1 mt-2">{value}</p>
      {caption && <p className="text-caption mt-1 text-ink-muted">{caption}</p>}
    </div>
  );
}
