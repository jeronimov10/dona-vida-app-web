import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BannerProps {
  variant?: "confirmacion" | "error";
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Banner - Confirmación / Banner - Error: caja con borde y un acento negro
 * a la izquierda, título en negrita y cuerpo. El sistema es enteramente en
 * escala de grises (sección 5.1 del PDF), por lo que ambas variantes
 * comparten la misma apariencia; `variant` queda como marcador semántico.
 */
export function Banner({ variant = "confirmacion", title, children, className }: BannerProps) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "border border-gray-40 border-l-4 border-l-gray-black bg-gray-white p-6",
        className,
      )}
    >
      <p className="text-h3">{title}</p>
      <p className="text-body mt-1 text-gray-60">{children}</p>
    </div>
  );
}
