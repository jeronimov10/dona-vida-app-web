/**
 * Capas decorativas de fondo del diseño (frames "Capa decorativa", "Capa de
 * resplandor" y "Capa de textura" en Figma). Se montan una sola vez en el
 * layout, detrás del contenido, y son inertes para lectores de pantalla y
 * para el puntero.
 */
export function Decor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span className="decor-halo absolute -top-[180px] right-[-100px] h-[520px] w-[520px] rounded-full" />
      <span className="decor-glow absolute bottom-[-120px] left-[-260px] h-[680px] w-[680px] rounded-full" />
      <span className="decor-texture absolute bottom-[120px] left-[72px] h-[110px] w-[230px] opacity-60" />
    </div>
  );
}
