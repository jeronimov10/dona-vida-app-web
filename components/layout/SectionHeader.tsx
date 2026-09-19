import Link from "next/link";

/**
 * Section Header (componente "Web/Section Header"): H2 de una sección dentro
 * de la pantalla, con una acción opcional alineada a la derecha (enlace de
 * navegación con `href`, o un cambio de estado local con `onClick`, como
 * "Borrar historial" u "Ordenar por distancia").
 */
export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href?: string; onClick?: () => void };
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="text-h2">{title}</h2>
      {action &&
        (action.href ? (
          <Link href={action.href} className="text-body text-gray-black hover:text-gray-60">
            {action.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className="text-body text-gray-black hover:text-gray-60"
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}
