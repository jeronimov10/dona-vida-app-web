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
    "inline-flex items-center rounded-full border px-4 py-1 text-label",
    active
      ? "border-gray-80 bg-gray-80 text-gray-white"
      : "border-gray-40 bg-gray-white text-gray-black",
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
