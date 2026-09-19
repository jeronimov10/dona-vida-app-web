import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { IconSearch } from "@/components/icons";

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
        "flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2",
        containerClassName,
      )}
    >
      <IconSearch className="h-5 w-5 shrink-0 text-ink-muted" />
      <input
        type="search"
        className="w-full bg-transparent text-body text-ink placeholder:text-ink-muted focus:outline-none"
        {...rest}
      />
    </div>
  );
}
