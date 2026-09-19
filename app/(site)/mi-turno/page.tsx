"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { diffInDays, formatDateLong, formatDateWithWeekday, todayISO } from "@/lib/format";

export default function MiTurnoPage() {
  const turno = useAppStore((s) => s.turno);
  const donations = useAppStore((s) => s.donations);
  const bloodType = useAppStore((s) => s.profile.bloodType);

  if (turno) {
    const daysUntil = Math.max(0, diffInDays(todayISO(), turno.dateISO));
    return (
      <>
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Mi turno" }]} />
        <PageHeader title="Mi turno" body={`${formatDateWithWeekday(turno.dateISO)} · ${turno.time}`} />
        <Container className="flex flex-col gap-6 pb-16">
          <Banner title="Turno confirmado">
            Faltan {daysUntil} días para tu donación en {turno.pointName}.
          </Banner>

          <div>
            <p className="text-h2 mb-4">Detalle del turno</p>
            <Table
              columns={["Dato", "Valor", "Dato", "Valor"]}
              rows={[
                ["Punto de donación", turno.pointName, "Dirección", turno.address],
                ["Fecha", formatDateLong(turno.dateISO), "Hora", turno.time],
                ["Código del turno", turno.code, "Tipo de sangre", bloodType],
              ]}
            />
          </div>

          <InfoNote>
            Puedes cancelar o reprogramar tu turno hasta 4 horas antes de la
            cita.
          </InfoNote>

          <div className="flex gap-4">
            <Button href="/mi-turno/reprogramar">Reprogramar</Button>
            <Button variant="secondary" href="/mi-turno/cancelar">
              Cancelar turno
            </Button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Mi turno" }]} />
      <PageHeader title="No tienes turnos programados" body="Cuando agendes una donación, aparecerá aquí con todos sus detalles." />
      <Container className="flex flex-col gap-10 pb-16">
        <EmptyState title="No tienes turnos programados">
          Agenda tu próxima donación y te recordaremos la fecha con
          anticipación.
        </EmptyState>

        <Button href="/agendar" className="w-fit">
          Agendar donación
        </Button>

        <div>
          <SectionHeader
            title="Tu historial de donaciones"
            action={{ label: "Ver todo", href: "/mi-elegibilidad/historial" }}
          />
          <Table
            columns={["Fecha", "Punto de donación", "Volumen", "Estado"]}
            rows={donations.slice(0, 2).map((d) => [
              formatDateLong(d.dateISO),
              d.point,
              d.volumeMl ? `${d.volumeMl} ml` : "—",
              d.status,
            ])}
          />
        </div>

        <InfoNote>Donar toma menos de una hora y puedes hacerlo cada 90 días.</InfoNote>
      </Container>
    </>
  );
}
