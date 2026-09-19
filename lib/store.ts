import { create } from "zustand";

/**
 * Store "backend" dummy de la aplicación. En el Paso 1 solo se define el
 * estado de sesión (lo mínimo que necesita la Cabecera para decidir hacia
 * dónde apunta el botón "MI CUENTA"). El modelo completo (perfil, turno,
 * historial, elegibilidad, etc.) se agrega en el Paso 3 junto con la
 * persistencia en localStorage.
 */
interface AppState {
  session: {
    isLoggedIn: boolean;
    email: string | null;
  };
}

export const useAppStore = create<AppState>(() => ({
  session: {
    isLoggedIn: true,
    email: "laura.gomez@email.com",
  },
}));
