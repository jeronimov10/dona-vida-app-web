import Link from "next/link";

/**
 * Section Header (componente "Web/Section Header"): H2 de una sección dentro
 * de la pantalla, con un enlace opcional "Ver todo" alineado a la derecha.
 */
export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="text-h2">{title}</h2>
      {action && (
        <Link href={action.href} className="text-body text-gray-black hover:text-gray-60">
          {action.label}
        </Link>
      )}
    </div>
  );
}
