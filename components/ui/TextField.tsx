import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  helperText?: string;
  containerClassName?: string;
}

/**
 * Text Field (outlined text field): etiqueta arriba + campo con borde,
 * con un texto de ayuda opcional debajo.
 */
export function TextField({
  label,
  helperText,
  id,
  containerClassName,
  ...rest
}: TextFieldProps) {
  const inputId = id ?? rest.name;

  return (
    <div className={containerClassName}>
      <label htmlFor={inputId} className="text-label block text-gray-black">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "mt-2 w-full rounded-md border border-gray-40 bg-gray-white px-3 py-2 text-body text-gray-black",
          "placeholder:text-gray-60 focus:outline-none focus:ring-2 focus:ring-gray-80",
        )}
        {...rest}
      />
      {helperText && (
        <p className="text-caption mt-1 text-gray-60">{helperText}</p>
      )}
    </div>
  );
}
