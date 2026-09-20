"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatDateWeekdayNoYear } from "@/lib/format";
import {
  IconCalendar,
  IconClock,
} from "@/components/icons";

export default function TurnoCanceladoPage() {
  const lastCancelledTurno = useAppStore((s) => s.lastCancelledTurno);

  const dateLabel = lastCancelledTurno
    ? formatDateWeekdayNoYear(lastCancelledTurno.dateISO)
    : "tu turno anterior";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi turno", href: "/mi-turno" },
          { label: "Cancelado" },
        ]}
      />
      <PageHeader title="Turno cancelado" body="El cupo quedó libre para otro donante." />
      <Container className="flex flex-col gap-8 pb-16">
        <Banner title="Cancelación exitosa">
          Tu turno del {dateLabel} fue cancelado correctamente.
        </Banner>

        <div>
          <SectionHeader title="¿Qué sigue?" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card icon={IconCalendar} title="Agenda otro turno" action={{ label: "Agendar donación", href: "/agendar" }}>
              Sigues siendo elegible: puedes reservar cuando quieras.
            </Card>
            <Card icon={IconClock}
              title="Activa un recordatorio"
              action={{ label: "Activar aviso", href: "/mi-elegibilidad/recordatorio" }}
            >
              Te avisamos cuando haya cupos en tu punto preferido.
            </Card>
          </div>
        </div>

        <InfoNote>
          Cancelar con anticipación permite que otra persona use ese cupo.
          Gracias por avisar.
        </InfoNote>

        <div className="flex gap-4">
          <Button href="/agendar">Agendar otro turno</Button>
          <Button variant="secondary" href="/panel">
            Ir a mi panel
          </Button>
        </div>
      </Container>
    </>
  );
}
