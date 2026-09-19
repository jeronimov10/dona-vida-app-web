"use client";

import Link from "next/link";
import { Container } from "./Container";
import { useAppStore } from "@/lib/store";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Requisitos", href: "/requisitos" },
  { label: "Puntos de donación", href: "/agendar" },
  { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
];

/**
 * Cabecera (componente "Web/Cabecera"): logo + navegación + botón de cuenta.
 * Altura 80px, ancho completo (sangre completa), con un divisor inferior de 1px.
 */
export function Header() {
  const isLoggedIn = useAppStore((s) => s.session.isLoggedIn);
  const accountHref = isLoggedIn ? "/mi-perfil" : "/login";

  return (
    <header className="w-full border-b border-gray-20">
      <Container className="flex h-[80px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-6 w-6 shrink-0 bg-gray-40" aria-hidden="true" />
          <span className="text-h3">Dona Vida</span>
        </Link>

        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body text-gray-black hover:text-gray-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={accountHref}
          className="text-button rounded-md border border-gray-40 px-4 py-2 uppercase text-gray-black hover:bg-gray-20/40"
        >
          Mi cuenta
        </Link>
      </Container>
    </header>
  );
}
