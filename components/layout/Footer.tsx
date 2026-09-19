import Link from "next/link";
import { Container } from "./Container";

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
    <footer className="mt-auto w-full border-t border-gray-20">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:justify-between">
        <div>
          <p className="text-h3">Dona Vida</p>
          <p className="text-caption text-gray-60">
            Red Nacional de Bancos de Sangre
          </p>
          <p className="text-caption mt-6 text-gray-60">
            © 2026 Dona Vida · Proyecto académico UX/UI
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-label uppercase text-gray-60">
                {column.title}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-gray-black hover:text-gray-60"
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
    </footer>
  );
}
