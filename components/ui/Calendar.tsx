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
    <div className={cn("border border-gray-20 p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-h3">{monthLabel}</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={onPrevMonth}
            className="h-7 w-7 rounded-md border border-gray-40 text-body text-gray-black"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={onNextMonth}
            className="h-7 w-7 rounded-md border border-gray-40 text-body text-gray-black"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_LABELS.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="text-caption uppercase text-gray-60"
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
                  ? "bg-gray-black text-gray-white"
                  : isAvailable
                    ? "border border-gray-40 text-gray-black hover:bg-gray-20/40"
                    : "text-gray-60",
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
