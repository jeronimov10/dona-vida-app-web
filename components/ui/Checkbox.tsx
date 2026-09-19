import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  label: string;
  containerClassName?: string;
}

/** Checkbox: casilla + etiqueta a la derecha. */
export function Checkbox({
  label,
  id,
  containerClassName,
  ...rest
}: CheckboxProps) {
  const inputId = id ?? rest.name;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-center gap-3 text-body text-gray-black",
        containerClassName,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="h-4 w-4 shrink-0 accent-gray-80"
        {...rest}
      />
      {label}
    </label>
  );
}
