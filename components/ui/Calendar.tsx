import { cn } from "@/lib/cn";

const WEEKDAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

export interface CalendarProps {
  /** Etiqueta ya formateada, p. ej. "Septiembre 2026". */
  monthLabel: string;
  year: number;
  /** Mes 0-indexado (0 = enero), como en `Date`. */
  month: number;
  availableDays?: number[];
  selectedDay?: number;
  onSelectDay?: (day: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  className?: string;
}

/**
 * Calendario (date picker): grilla mensual con días disponibles marcados
 * con borde y el día seleccionado relleno en negro.
 */
export function Calendar({
  monthLabel,
  year,
  month,
  availableDays = [],
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  className,
}: CalendarProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay(); // 0 = domingo
  const leadingBlanks = (firstWeekday + 6) % 7; // 0 = lunes

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className={cn("rounded-xl border border-soft bg-surface p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-h3">{monthLabel}</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={onPrevMonth}
            className="h-7 w-7 rounded-md border border-line text-body text-ink"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={onNextMonth}
            className="h-7 w-7 rounded-md border border-line text-body text-ink"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_LABELS.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="text-caption uppercase text-ink-muted"
          >
            {label}
          </span>
        ))}

        {cells.map((day, index) => {
          if (day === null) return <span key={`blank-${index}`} />;

          const isAvailable = availableDays.includes(day);
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              type="button"
              disabled={!onSelectDay || !isAvailable}
              onClick={() => onSelectDay?.(day)}
              className={cn(
                "aspect-square rounded-md text-body",
                isSelected
                  ? "bg-primary text-surface"
                  : isAvailable
                    ? "border border-line text-ink hover:bg-soft/60"
                    : "text-ink-muted",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
