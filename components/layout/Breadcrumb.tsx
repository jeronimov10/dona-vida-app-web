import Link from "next/link";
import { Container } from "./Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Breadcrumb (componente "Web/Breadcrumb"): rastro "Inicio / Módulo / Pantalla".
 * El último elemento nunca lleva enlace (es la pantalla actual).
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Container className="pt-6">
      <p className="text-caption text-gray-60">
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`}>
            {index > 0 && " / "}
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-black">
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </span>
        ))}
      </p>
    </Container>
  );
}
