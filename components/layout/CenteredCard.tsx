import { ReactNode } from "react";

/**
 * Envoltorio para las pantallas centradas sin breadcrumb ni Page Header
 * (01 Iniciar sesión, 04 Registro exitoso, 06 Correo enviado,
 * 22 Confirmar turno, 37 Cerrar sesión). Centra una columna angosta de
 * contenido bajo la Cabecera.
 */
export function CenteredCard({
  children,
  width = "narrow",
}: {
  children: ReactNode;
  width?: "narrow" | "wide";
}) {
  return (
    <div className="flex justify-center px-[72px] py-16">
      <div
        className={`w-full ${width === "narrow" ? "max-w-[400px]" : "max-w-[680px]"} text-center`}
      >
        {children}
      </div>
    </div>
  );
}
