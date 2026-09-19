import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface CardProps {
  title: string;
  children: ReactNode;
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

/**
 * Card: título + cuerpo + un divisor delgado + una acción de texto al pie.
 */
export function Card({ title, children, action, className }: CardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border border-gray-20 bg-gray-white p-6",
        className,
      )}
    >
      <p className="text-h3">{title}</p>
      <p className="text-body mt-2 flex-1 text-gray-60">{children}</p>
      {action && (
        <>
          <div className="mt-4 border-t border-gray-20" />
          {action.href ? (
            <Link
              href={action.href}
              className="mt-4 text-body text-gray-black hover:text-gray-60"
            >
              {action.label}
            </Link>
          ) : action.onClick ? (
            <button
              type="button"
              onClick={action.onClick}
              className="mt-4 text-left text-body text-gray-black hover:text-gray-60"
            >
              {action.label}
            </button>
          ) : (
            <span className="mt-4 text-body text-gray-black">{action.label}</span>
          )}
        </>
      )}
    </div>
  );
}
