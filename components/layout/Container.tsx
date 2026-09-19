import { ReactNode } from "react";

/**
 * Contenedor de ancho de contenido del golden grid (sección 5.3 del PDF):
 * 1296px de contenido (1440px de lienzo menos márgenes laterales de 72px),
 * tal como está trazado en los mockups de Figma.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-[72px] ${className}`}>
      {children}
    </div>
  );
}
