import { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Envoltorio para las pantallas centradas sin breadcrumb ni Page Header
 * (01 Iniciar sesión, 05 Recuperar contraseña, 06 Correo enviado,
 * 22 Confirmar turno, 37 Cerrar sesión). Centra una columna angosta de
 * contenido bajo la Cabecera; cada elemento dentro decide su propia
 * alineación (título centrado, formulario en una tarjeta con borde, etc.).
 */
export function CenteredCard({
  children,
  width = "narrow",
  className,
}: {
  children: ReactNode;
  width?: "narrow" | "wide";
  className?: string;
}) {
  return (
    <div className="flex justify-center px-[72px] py-16">
      <div
        className={cn(
          "w-full",
          width === "narrow" ? "max-w-[400px]" : "max-w-[520px]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
