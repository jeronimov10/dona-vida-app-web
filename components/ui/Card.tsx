import { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { IconChevronRight, IconProps } from "@/components/icons";

export interface CardProps {
  title: string;
  children: ReactNode;
  action?: { label: string; href?: string; onClick?: () => void };
  /** Icono de la insignia superior derecha (componente del set de Figma). */
  icon?: ComponentType<IconProps>;
  className?: string;
}

/**
 * Card: título + insignia opcional + cuerpo + un divisor delgado + una
 * acción de texto al pie acompañada de un chevron, tal como está definida
 * en el componente "Web/Card" de Figma.
 */
export function Card({ title, children, action, icon: Icon, className }: CardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border border-soft bg-surface p-6 shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-h3">{title}</p>
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-soft">
            <Icon className="h-5 w-5 text-primary" />
          </span>
        )}
      </div>
      <p className="text-body mt-2 flex-1 text-ink-muted">{children}</p>
      {action && (
        <>
          <div className="mt-4 border-t border-soft" />
          {action.href ? (
            <Link
              href={action.href}
              className="text-caption mt-4 flex items-center justify-between gap-2 text-primary hover:text-primary-dark"
            >
              {action.label}
              <IconChevronRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : action.onClick ? (
            <button
              type="button"
              onClick={action.onClick}
              className="text-caption mt-4 flex items-center justify-between gap-2 text-left text-primary hover:text-primary-dark"
            >
              {action.label}
              <IconChevronRight className="h-4 w-4 shrink-0" />
            </button>
          ) : (
            <span className="text-caption mt-4 text-primary">{action.label}</span>
          )}
        </>
      )}
    </div>
  );
}
