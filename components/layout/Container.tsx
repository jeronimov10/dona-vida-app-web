import { ReactNode } from "react";

/**
 * Contenedor de ancho de contenido del golden grid (sección 5.3 del PDF):
 * 1296px de ancho máximo, márgenes laterales de 72px.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1296px] px-[72px] ${className}`}>
      {children}
    </div>
  );
}
