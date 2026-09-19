import { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Nota informativa: texto de apoyo con un borde izquierdo delgado, usada al
 * final de casi todos los formularios y pantallas de resultado.
 */
export function InfoNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "border-l-2 border-gray-40 pl-4 text-body text-gray-black",
        className,
      )}
    >
      {children}
    </p>
  );
}
