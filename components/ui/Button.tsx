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
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-button uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS = {
  primary: "bg-gray-80 text-gray-white hover:bg-gray-black",
  secondary:
    "border border-gray-40 bg-gray-white text-gray-black hover:bg-gray-20/40",
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
