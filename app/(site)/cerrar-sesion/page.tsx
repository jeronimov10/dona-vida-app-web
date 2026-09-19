"use client";

import { useRouter } from "next/navigation";
import { CenteredCard } from "@/components/layout/CenteredCard";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";

export default function CerrarSesionPage() {
  const router = useRouter();
  const session = useAppStore((s) => s.session);
  const logout = useAppStore((s) => s.logout);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <CenteredCard>
      <div className="text-center">
        <h1 className="text-h1">¿Cerrar sesión?</h1>
        <p className="text-body mt-2 text-gray-60">
          Tendrás que ingresar tu correo y contraseña la próxima vez que
          entres.
        </p>
      </div>

      <InfoNote className="mt-6">
        Tu turno agendado no se cancela al cerrar sesión.
      </InfoNote>

      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={handleLogout}>Sí, cerrar sesión</Button>
        <Button variant="secondary" href="/mi-perfil">
          Cancelar
        </Button>
      </div>

      <p className="text-caption mt-4 text-center text-gray-60">
        Sesión iniciada como {session.email}
      </p>
    </CenteredCard>
  );
}
