import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconInfo } from "@/components/icons";

/**
 * Nota informativa (componente "Web/Nota informativa"): texto de apoyo sobre
 * un fondo rosado muy claro, con una barra vinotinto de 4px en el borde
 * izquierdo. Se usa al final de casi todos los formularios y pantallas de
 * resultado.
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
        "flex min-h-[56px] items-center gap-3 rounded-[10px] border-l-4 border-primary bg-wash py-4 pl-5 pr-6 text-body text-ink-muted",
        className,
      )}
    >
      <IconInfo className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <span>{children}</span>
    </p>
  );
}
