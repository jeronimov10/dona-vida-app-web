import { cn } from "@/lib/cn";

/**
 * Imagen ancha: caja placeholder con una X diagonal, usada en todo el sitio
 * en lugar de fotografías/mapas reales (fieles al wireframe del PDF).
 */
export function WideImage({
  className,
  label = "Imagen",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative w-full overflow-hidden border border-gray-40 bg-gray-white",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full text-gray-40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
    </div>
  );
}
