import Link from "next/link";
import { Container } from "./Container";
import {
  IconGotaOutline,
  IconHeart,
  IconMail,
  IconPhone,
} from "@/components/icons";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Donar",
    links: [
      { label: "Requisitos para donar", href: "/requisitos" },
      { label: "Puntos de donación", href: "/agendar" },
    ],
  },
  {
    title: "Mi cuenta",
    links: [
      { label: "Mi turno", href: "/mi-turno" },
      { label: "Historial de donaciones", href: "/mi-elegibilidad/historial" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Contacto", href: "/preguntas-frecuentes" },
    ],
  },
];

/**
 * Pie de página (componente "Web/Pie de página"): marca + tres columnas de
 * enlaces + copyright. Ancho completo, ~140px de alto.
 */
export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-soft bg-gradient-to-b from-surface to-[#faf0f2]">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:justify-between">
        <div>
          <p className="text-h3 flex items-center gap-2">
            <IconGotaOutline className="h-6 w-6 text-primary" />
            Dona Vida
          </p>
          <p className="text-caption text-ink-muted">
            Red Nacional de Bancos de Sangre
          </p>
          <p className="text-caption mt-6 text-ink-muted">
            © 2026 Dona Vida · Proyecto académico UX/UI
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-label uppercase text-primary">
                {column.title}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-ink hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <Container className="flex justify-end gap-4 pb-8 text-primary">
        <IconHeart className="h-5 w-5" />
        <IconMail className="h-5 w-5" />
        <IconPhone className="h-5 w-5" />
      </Container>
    </footer>
  );
}
