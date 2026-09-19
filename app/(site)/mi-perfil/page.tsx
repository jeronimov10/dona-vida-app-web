"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Table } from "@/components/ui/Table";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatMonthYear } from "@/lib/format";

export default function MiPerfilPage() {
  const profile = useAppStore((s) => s.profile);
  const reminderActive = useAppStore((s) => s.reminderActive);
  const setReminderActive = useAppStore((s) => s.setReminderActive);
  const urgentCampaignsOptIn = useAppStore((s) => s.urgentCampaignsOptIn);
  const setUrgentCampaignsOptIn = useAppStore((s) => s.setUrgentCampaignsOptIn);

  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Mi perfil" }]} />
      <PageHeader
        title="Mi perfil"
        body={`${profile.name} · Donante desde ${formatMonthYear(profile.donorSinceISO)} · Tipo ${profile.bloodType}`}
      />
      <Container className="flex flex-col gap-8 pb-16">
        <div>
          <SectionHeader title="Datos personales" action={{ label: "Editar", href: "/mi-perfil/editar" }} />
          <Table
            columns={["Dato", "Valor", "Dato", "Valor"]}
            rows={[
              ["Nombre", profile.name, "Correo", profile.email],
              ["Teléfono", profile.phone, "Ciudad", profile.city],
              ["Tipo de sangre", profile.bloodType, "Peso", `${profile.weight} kg`],
            ]}
          />
        </div>

        <div>
          <p className="text-h2 mb-4">Preferencias de aviso</p>
          <div className="flex flex-col gap-3">
            <Checkbox
              label="Recibir avisos por correo electrónico cuando vuelva a ser elegible"
              checked={reminderActive}
              onChange={(e) => setReminderActive(e.target.checked)}
            />
            <Checkbox
              label="Recibir campañas de donación urgente de mi tipo"
              checked={urgentCampaignsOptIn}
              onChange={(e) => setUrgentCampaignsOptIn(e.target.checked)}
            />
          </div>
        </div>

        <InfoNote>
          Tus datos solo se usan para gestionar tus donaciones y verificar tu
          elegibilidad.
        </InfoNote>

        <div className="flex gap-4">
          <Button href="/mi-perfil/editar">Editar perfil</Button>
          <Button variant="secondary" href="/cerrar-sesion">
            Cerrar sesión
          </Button>
        </div>
      </Container>
    </>
  );
}
