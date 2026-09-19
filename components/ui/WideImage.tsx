import { cn } from "@/lib/cn";

/** Anillos y gota se miden como % de la altura para que la pieza funcione
 *  igual en el bloque ancho del hero (636×300) que como icono de 64px. */
const RINGS = ["89%", "67%", "47%"];

const DOTS = [
  { top: "20%", left: "17.4%" },
  { top: "27.3%", left: "79.6%" },
  { top: "76.4%", left: "75.8%" },
  { top: "78.2%", left: "22.7%" },
];

/**
 * Imagen ancha (componente "Web/Imagen ancha"): el bloque gráfico de marca
 * que el diseño usa en lugar de fotografías. Reproduce el degradado rosado,
 * los tres anillos concéntricos, la gota de marca y los cuatro puntos
 * decorativos con CSS, sin depender de recursos externos.
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
        "relative w-full overflow-hidden rounded-xl",
        "bg-[linear-gradient(151deg,#faf2f4_0%,#f4dce1_71%)]",
        className,
      )}
    >
      {RINGS.map((size) => (
        <span
          key={size}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
          style={{ height: size }}
        />
      ))}

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square h-[27%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full rounded-tl-none bg-[linear-gradient(135deg,#a8264b_0%,#7a1734_100%)]"
      />

      {DOTS.map((pos) => (
        <span
          key={`${pos.top}-${pos.left}`}
          aria-hidden="true"
          className="absolute h-[2.7%] aspect-square rounded-full bg-primary/20"
          style={pos}
        />
      ))}
    </div>
  );
}
