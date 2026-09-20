import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  active?: boolean;
  className?: string;
}

/**
 * Chip (assist chip): etiqueta en forma de píldora, usada como filtro o
 * como insignia informativa (p. ej. "Abierto ahora", "Necesita O−").
 * Si no recibe `onClick` se renderiza como contenido inerte (insignia).
 */
export function Chip({ children, active, className, onClick, ...rest }: ChipProps) {
  const classes = cn(
    "inline-flex h-[30px] min-w-[128px] items-center justify-center rounded-full border px-4 text-label",
    active
      ? "border-primary bg-primary text-surface"
      : "border-line bg-surface text-ink",
    className,
  );

  if (!onClick) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
