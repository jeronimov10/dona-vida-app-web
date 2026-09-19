"use client";

import Link from "next/link";
import { Container } from "./Container";
import { useAppStore } from "@/lib/store";
import { IconGota, IconUser } from "@/components/icons";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Requisitos", href: "/requisitos" },
  { label: "Puntos de donación", href: "/agendar" },
  { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
];

/**
 * Cabecera (componente "Web/Cabecera"): logo + navegación + botón de cuenta.
 * Altura 80px, ancho completo, sobre fondo blanco con una sombra teñida de
 * vinotinto y, debajo, la barra de identidad en degradado.
 */
export function Header() {
  const isLoggedIn = useAppStore((s) => s.session.isLoggedIn);
  const accountHref = isLoggedIn ? "/mi-perfil" : "/login";

  return (
    <>
      <header className="w-full border-b border-soft bg-surface shadow-header">
        <Container className="flex h-[80px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-soft">
              <IconGota className="h-5 w-5 text-primary" />
            </span>
            <span className="text-h3">Dona Vida</span>
          </Link>

          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body text-ink-muted hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={accountHref}
            className="text-button inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 uppercase text-surface hover:bg-primary-dark"
          >
            <IconUser className="h-4 w-4" />
            Mi cuenta
          </Link>
        </Container>
      </header>
      <div className="identity-bar w-full" aria-hidden="true" />
    </>
  );
}
