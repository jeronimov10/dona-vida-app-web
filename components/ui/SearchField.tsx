import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  containerClassName?: string;
}

/**
 * Search Field (search bar): campo tipo píldora con un icono placeholder
 * a la izquierda.
 */
export function SearchField({
  containerClassName,
  ...rest
}: SearchFieldProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-gray-40 bg-gray-white px-4 py-2",
        containerClassName,
      )}
    >
      <span className="h-4 w-4 shrink-0 bg-gray-40" aria-hidden="true" />
      <input
        type="search"
        className="w-full bg-transparent text-body text-gray-black placeholder:text-gray-60 focus:outline-none"
        {...rest}
      />
    </div>
  );
}
