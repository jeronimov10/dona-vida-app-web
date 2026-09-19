"use client";

import { ReactNode, useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** true solo después de montar en el navegador; false en el servidor. */
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Evita errores de hidratación: el contenido de cada pantalla depende del
 * store (fechas relativas a "hoy", turno, perfil) que solo es correcto una
 * vez montado en el navegador. Renderizar ese contenido durante el paso de
 * servidor casi nunca coincide byte a byte con el primer render del
 * cliente (la fecha de compilación no es la fecha real de cada visita), lo
 * que React reporta como error de hidratación al navegar. Montamos el
 * contenido solo del lado del cliente para eliminar esa clase de error por
 * completo; la Cabecera y el Pie de página, que no dependen de fechas,
 * siguen renderizándose de inmediato.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const mounted = useMounted();

  if (!mounted) return null;

  return <>{children}</>;
}
