import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface RadioOptionProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  label: string;
  caption?: string;
  containerClassName?: string;
}

/**
 * Radio Option: botón de radio + etiqueta, con una leyenda opcional a la
 * derecha (por ejemplo "6 cupos" o "Sin cupo").
 */
export function RadioOption({
  label,
  caption,
  id,
  containerClassName,
  disabled,
  ...rest
}: RadioOptionProps) {
  const inputId = id ?? `${rest.name}-${rest.value}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 text-body",
        disabled ? "cursor-not-allowed text-ink-muted" : "text-ink",
        containerClassName,
      )}
    >
      <span className="flex items-center gap-3">
        <input
          id={inputId}
          type="radio"
          disabled={disabled}
          className="h-4 w-4 shrink-0 accent-primary"
          {...rest}
        />
        {label}
      </span>
      {caption && <span className="text-caption text-ink-muted">{caption}</span>}
    </label>
  );
}
