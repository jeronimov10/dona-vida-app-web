"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { TextField } from "@/components/ui/TextField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { BLOOD_TYPE_OPTIONS } from "@/lib/seed";

export default function EditarPerfilPage() {
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const updateProfile = useAppStore((s) => s.updateProfile);

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [city, setCity] = useState(profile.city);
  const [weight, setWeight] = useState(String(profile.weight));
  const [bloodType, setBloodType] = useState(profile.bloodType);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    updateProfile({
      name,
      phone,
      city,
      weight: Number(weight) || profile.weight,
      bloodType,
    });
    router.push("/mi-perfil/guardado");
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi perfil", href: "/mi-perfil" },
          { label: "Editar" },
        ]}
      />
      <PageHeader title="Editar perfil" body="Actualiza tus datos de contacto y de donante." />
      <Container className="pb-16">
        <form onSubmit={handleSubmit} className="flex max-w-[900px] flex-col gap-6">
          <p className="text-h2">Datos personales</p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <TextField label="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <TextField
              label="Peso aproximado (kg)"
              inputMode="numeric"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Select
              label="Tipo de sangre"
              options={BLOOD_TYPE_OPTIONS.map((b) => ({ value: b, label: b }))}
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            />
          </div>

          <InfoNote>
            El correo no se puede editar aquí: escríbenos si necesitas
            cambiarlo.
          </InfoNote>

          <div className="flex gap-4">
            <Button type="submit">Guardar cambios</Button>
            <Button type="button" variant="secondary" href="/mi-perfil">
              Descartar
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
