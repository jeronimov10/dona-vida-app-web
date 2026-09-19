"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredCard } from "@/components/layout/CenteredCard";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";

export default function RecuperarContrasenaPage() {
  const router = useRouter();
  const sessionEmail = useAppStore((s) => s.session.email);
  const [email, setEmail] = useState(sessionEmail ?? "laura.gomez@email.com");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push("/recuperar-contrasena/enviado");
  }

  return (
    <CenteredCard>
      <div className="border border-gray-40 p-8">
        <p className="text-h3">Restablece tu contraseña</p>
        <p className="text-body mt-1 text-gray-60">
          Ingresa el correo de tu cuenta y te enviaremos un enlace para crear
          una nueva.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <TextField
            label="Correo electrónico"
            type="email"
            placeholder="laura.gomez@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Enviar enlace
          </Button>
          <p className="text-caption text-gray-60">
            El enlace de recuperación vence a los 30 minutos.
          </p>
        </form>
      </div>

      <div className="mt-6 flex justify-center">
        <Button href="/login" variant="secondary">
          Volver a iniciar sesión
        </Button>
      </div>

      <InfoNote className="mt-6">
        Si no reconoces esta solicitud, ignora el correo: tu cuenta sigue
        protegida.
      </InfoNote>
    </CenteredCard>
  );
}
