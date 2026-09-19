"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { TextField } from "@/components/ui/TextField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";

export default function RegistroPage() {
  const router = useRouter();
  const registerAccount = useAppStore((s) => s.registerAccount);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!acceptedTerms) return;
    registerAccount({
      name: name || "Laura Gómez",
      email: email || "laura.gomez@email.com",
      phone: phone || "300 000 0000",
    });
    router.push("/registro/perfil");
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Crear cuenta" }]} />
      <PageHeader
        title="Crea tu cuenta"
        body="Paso 1 de 2 · Datos de acceso. Toma menos de un minuto."
      />
      <Container className="pb-16">
        <form onSubmit={handleSubmit} className="flex max-w-[900px] flex-col gap-6">
          <SectionHeader title="Datos de acceso" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <TextField
              label="Nombre completo"
              placeholder="Laura Gómez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="laura.gomez@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Teléfono"
              placeholder="300 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-caption self-end pb-2 text-ink-muted">
              Debe incluir al menos una mayúscula y un número.
            </p>
          </div>

          <Checkbox
            label="Acepto los Términos y la Política de Privacidad"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />

          <InfoNote>
            Debes tener entre 18 y 65 años para registrarte como donante.
          </InfoNote>

          <div className="flex gap-4">
            <Button type="submit" disabled={!acceptedTerms}>
              Continuar
            </Button>
            <Button href="/login" variant="secondary">
              Ya tengo cuenta
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
