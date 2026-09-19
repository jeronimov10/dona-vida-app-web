import { ReactNode } from "react";
import { WideImage } from "./WideImage";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Estado vacío: icono placeholder + título + cuerpo, centrados. Se usa
 * cuando una lista no tiene elementos (p. ej. sin turnos programados).
 */
export function EmptyState({ title, children, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center py-10 text-center", className)}>
      <WideImage className="h-16 w-16" label="Sin resultados" />
      <p className="text-h3 mt-4">{title}</p>
      <p className="text-body mt-1 text-ink-muted">{children}</p>
    </div>
  );
}
