import Link from "next/link";

/**
 * Section Header (componente "Web/Section Header"): título de una sección
 * dentro de la pantalla, precedido por la marca vertical vinotinto del
 * diseño, con una acción opcional alineada a la derecha (enlace de
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
    <div className="mb-4 flex h-[30px] items-center justify-between">
      <div className="flex items-center gap-4">
        <span
          className="block h-5 w-1 shrink-0 rounded-sm bg-primary"
          aria-hidden="true"
        />
        <h2 className="text-h3">{title}</h2>
      </div>
      {action &&
        (action.href ? (
          <Link
            href={action.href}
            className="text-caption text-primary hover:text-primary-dark"
          >
            {action.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className="text-caption text-primary hover:text-primary-dark"
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}
