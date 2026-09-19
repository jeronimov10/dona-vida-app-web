import { cn } from "@/lib/cn";

export interface StepperProps {
  step: number;
  total: number;
  label: string;
  className?: string;
}

/**
 * Stepper - Progreso: leyenda "PASO X DE N · ETIQUETA" sobre una barra
 * segmentada (un segmento por paso), usada en el asistente de agendamiento.
 */
export function Stepper({ step, total, label, className }: StepperProps) {
  return (
    <div className={className}>
      <p className="text-label uppercase text-ink-muted">
        Paso {step} de {total} · {label}
      </p>
      <div className="mt-2 flex gap-2">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              index < step ? "bg-primary" : "bg-soft",
            )}
          />
        ))}
      </div>
    </div>
  );
}
