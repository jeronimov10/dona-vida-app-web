import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label: string;
  options: SelectOption[];
  containerClassName?: string;
}

/**
 * Select (exposed dropdown menu): etiqueta arriba + select nativo con borde,
 * estilizado para verse igual que un Text Field.
 */
export function Select({
  label,
  options,
  id,
  containerClassName,
  ...rest
}: SelectProps) {
  const selectId = id ?? rest.name;

  return (
    <div className={containerClassName}>
      <label htmlFor={selectId} className="text-label block text-primary">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={selectId}
          className={cn(
            "w-full appearance-none rounded-md border border-line bg-surface px-3 py-2 pr-8 text-body text-ink",
            "focus:outline-none focus:ring-2 focus:ring-primary",
          )}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
        >
          ▾
        </span>
      </div>
    </div>
  );
}
