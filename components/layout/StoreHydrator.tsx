"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Dispara la rehidratación del store desde localStorage después del primer
 * render. El estado inicial en memoria ya coincide con los datos semilla,
 * así que el primer render de servidor y de cliente son siempre iguales;
 * esto solo aplica los cambios que el usuario haya hecho en una visita
 * anterior (sesión, turno, perfil editado, etc.).
 */
export function StoreHydrator() {
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  return null;
}
