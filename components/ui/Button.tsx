import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  children: ReactNode;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded h-12 px-6 text-button uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS = {
  primary: "bg-primary text-surface hover:bg-primary-dark",
  secondary:
    "border border-line bg-surface text-ink hover:bg-soft/60",
};

/**
 * Button - Primario / Button - Secundario (Filled button / Outlined button).
 * Si recibe `href` navega como enlace; de lo contrario se comporta como un
 * <button> normal (útil para acciones que solo cambian estado local).
 */
export function Button({
  variant = "primary",
  href,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
