"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CenteredCard } from "@/components/layout/CenteredCard";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);
  const [email, setEmail] = useState("laura.gomez@email.com");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // Demo sin backend: cualquier correo/contraseña inicia sesión.
    login(email || "laura.gomez@email.com");
    router.push("/panel");
  }

  return (
    <CenteredCard>
      <div className="rounded-xl border border-soft bg-surface p-8 shadow-card">
        <p className="text-h3">Inicia sesión</p>
        <p className="text-body mt-1 text-ink-muted">
          Ingresa con el correo con el que te registraste.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <TextField
            label="Correo electrónico"
            type="email"
            placeholder="laura.gomez@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            href="/recuperar-contrasena"
            className="text-caption -mt-2 text-ink-muted hover:text-primary"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>

        <Divider className="my-6" />

        <p className="text-body text-center text-ink-muted">¿No tienes cuenta?</p>
        <Button href="/registro" variant="secondary" className="mt-3 w-full">
          Crear cuenta
        </Button>
      </div>

      <InfoNote className="mt-6">
        Crear una cuenta te permite guardar tu historial y recibir avisos de
        elegibilidad.
      </InfoNote>
    </CenteredCard>
  );
}
