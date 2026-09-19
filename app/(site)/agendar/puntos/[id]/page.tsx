"use client";

import { useParams, useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Chip } from "@/components/ui/Chip";
import { Table } from "@/components/ui/Table";
import { WideImage } from "@/components/ui/WideImage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { SEED_POINTS } from "@/lib/seed";

export default function DetallePuntoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const point = SEED_POINTS.find((p) => p.id === params.id) ?? SEED_POINTS[0];
  const setBookingDraft = useAppStore((s) => s.setBookingDraft);

  function handleAgendar() {
    setBookingDraft({ pointId: point.id });
    router.push(`/agendar/puntos/${point.id}/requisitos`);
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: point.name },
        ]}
      />
      <PageHeader
        title={point.name}
        body={`${point.address} · ${point.city} · a ${point.distanceKm} km de ti`}
      />
      <Container className="flex flex-col gap-10 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <WideImage className="h-[280px]" label={point.name} />

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              <Chip>{`${point.distanceKm} km`}</Chip>
              <Chip>{point.hoursStatus.split(" · ")[0]}</Chip>
              {point.urgentBloodType && <Chip>{`Necesita ${point.urgentBloodType}`}</Chip>}
            </div>

            <div>
              <p className="text-h3">Horario de atención</p>
              <p className="text-body mt-1 text-ink-muted">{point.weekdayHours}</p>
              <p className="text-body text-ink-muted">{point.saturdayHours}</p>
            </div>

            <div>
              <p className="text-h3">Qué llevar</p>
              <p className="text-body mt-1 text-ink-muted">{point.whatToBring}</p>
            </div>

            {point.urgentBloodType && (
              <InfoNote>
                Hoy este punto necesita con urgencia donantes de tipo {point.urgentBloodType}.
              </InfoNote>
            )}

            <div className="flex gap-4">
              <Button onClick={handleAgendar}>Agendar aquí</Button>
              <Button variant="secondary">Cómo llegar</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeader title="Cupos de esta semana" />
            <Table
              columns={["Día", "Horario", "Estado", "Cupos"]}
              rows={point.weeklySlots.map((slot) => [
                slot.day,
                slot.time,
                slot.status,
                String(slot.slots),
              ])}
            />
          </div>

          <Card title="Pedir transporte" action={{ label: "Pedir transporte" }}>
            Enviamos la dirección de este punto directo a tu app de
            transporte; no necesitas escribirla.
          </Card>
        </div>
      </Container>
    </>
  );
}
