"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { TextField } from "@/components/ui/TextField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { BLOOD_TYPE_OPTIONS } from "@/lib/seed";

const HAS_DONATED_OPTIONS = [
  { value: "yes", label: "Sí, dos veces" },
  { value: "no", label: "No, es mi primera vez" },
];

export default function RegistroPerfilPage() {
  const router = useRouter();
  const updateProfile = useAppStore((s) => s.updateProfile);
  const profile = useAppStore((s) => s.profile);

  const [bloodType, setBloodType] = useState(profile.bloodType);
  const [city, setCity] = useState(profile.city);
  const [weight, setWeight] = useState(String(profile.weight));
  const [birthdate, setBirthdate] = useState("");
  const [hasDonatedBefore, setHasDonatedBefore] = useState("yes");
  const [lastDonation, setLastDonation] = useState("");

  function save(event: FormEvent) {
    event.preventDefault();
    updateProfile({
      bloodType,
      city,
      weight: Number(weight) || profile.weight,
      hasDonatedBefore: hasDonatedBefore === "yes",
    });
    router.push("/registro/exito");
  }

  function skip() {
    router.push("/registro/exito");
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Crear cuenta", href: "/registro" },
          { label: "Perfil de donante" },
        ]}
      />
      <PageHeader
        title="Completa tu perfil"
        body="Paso 2 de 2 · Con estos datos calculamos si puedes donar hoy."
      />
      <Container className="pb-16">
        <form onSubmit={save} className="flex max-w-[900px] flex-col gap-6">
          <SectionHeader title="Datos del donante" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Select
              label="Tipo de sangre"
              options={BLOOD_TYPE_OPTIONS.map((b) => ({ value: b, label: b }))}
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            />
            <TextField
              label="Fecha de nacimiento"
              placeholder="DD/MM/AAAA"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <TextField
              label="Ciudad"
              placeholder="Bogotá"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <TextField
              label="Peso aproximado (kg)"
              inputMode="numeric"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Select
              label="¿Has donado antes?"
              options={HAS_DONATED_OPTIONS}
              value={hasDonatedBefore}
              onChange={(e) => setHasDonatedBefore(e.target.value)}
            />
            <TextField
              label="Fecha de tu última donación"
              placeholder="15/06/2024"
              value={lastDonation}
              onChange={(e) => setLastDonation(e.target.value)}
            />
          </div>

          <InfoNote>
            El peso mínimo para donar es 50 kg. Verificaremos este dato en el
            punto de donación.
          </InfoNote>

          <div className="flex gap-4">
            <Button type="submit">Guardar y continuar</Button>
            <Button type="button" variant="secondary" onClick={skip}>
              Omitir por ahora
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
