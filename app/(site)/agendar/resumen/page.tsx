"use client";

import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Stepper } from "@/components/ui/Stepper";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatDateWithWeekday, todayISO } from "@/lib/format";
import { SEED_POINTS } from "@/lib/seed";

export default function ResumenTurnoPage() {
  const router = useRouter();
  const bookingDraft = useAppStore((s) => s.bookingDraft);
  const profile = useAppStore((s) => s.profile);

  const point = SEED_POINTS.find((p) => p.id === bookingDraft.pointId) ?? SEED_POINTS[0];
  const dateISO = bookingDraft.dateISO ?? todayISO();
  const time = bookingDraft.time ?? "10:00 a. m.";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Resumen" },
        ]}
      />
      <PageHeader title="Revisa tu turno" body="Verifica los datos antes de confirmar la reserva." />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={4} total={4} label="Fecha y hora" />

        <Table
          columns={["Dato", "Valor", "Dato", "Valor"]}
          rows={[
            ["Punto de donación", point.name, "Dirección", point.address],
            ["Fecha", formatDateWithWeekday(dateISO), "Hora", time],
            ["Donante", profile.name, "Tipo de sangre", profile.bloodType],
          ]}
        />

        <div>
          <p className="text-h2 mb-2">Antes de tu cita</p>
          <p className="text-body text-gray-60">
            Duerme bien, desayuna e hidrátate. Lleva tu documento de
            identidad.
          </p>
        </div>

        <InfoNote>
          Puedes cancelar o reprogramar tu turno hasta 4 horas antes.
        </InfoNote>

        <div className="flex gap-4">
          <Button onClick={() => router.push("/agendar/confirmar")}>Confirmar turno</Button>
          <Button variant="secondary" onClick={() => router.push("/agendar/fecha")}>
            Editar
          </Button>
        </div>
      </Container>
    </>
  );
}
