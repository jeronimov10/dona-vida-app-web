export interface ProgressBarProps {
  label: string;
  percent: number;
  className?: string;
}

/**
 * Barra de progreso (linear progress indicator): etiqueta + porcentaje
 * arriba, barra rellena debajo.
 */
export function ProgressBar({ label, percent, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <span className="text-label uppercase text-gray-60">{label}</span>
        <span className="text-label text-gray-60">{clamped}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-20">
        <div
          className="h-full rounded-full bg-gray-80"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
