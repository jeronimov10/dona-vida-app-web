"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Stepper } from "@/components/ui/Stepper";
import { RadioOption } from "@/components/ui/RadioOption";
import { Card } from "@/components/ui/Card";
import { Banner } from "@/components/ui/Banner";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { addDays, formatDateWeekdayNoYear, formatDateWeekdayNoYearCap, todayISO } from "@/lib/format";
import { getNoCapacityDateISO, SEED_POINTS } from "@/lib/seed";
import {
  IconCheckCircle,
} from "@/components/icons";

const MORNING = [
  { time: "8:00 a. m.", slots: 4 },
  { time: "9:30 a. m.", slots: 1 },
  { time: "10:00 a. m.", slots: 6 },
];

const AFTERNOON = [
  { time: "2:00 p. m.", slots: 3 },
  { time: "4:00 p. m.", slots: 0 },
];

export default function ElegirHorarioPage() {
  const router = useRouter();
  const bookingDraft = useAppStore((s) => s.bookingDraft);
  const setBookingDraft = useAppStore((s) => s.setBookingDraft);
  const [time, setTime] = useState(bookingDraft.time ?? "");

  const point = SEED_POINTS.find((p) => p.id === bookingDraft.pointId) ?? SEED_POINTS[0];
  const dateISO = bookingDraft.dateISO ?? todayISO();
  const isNoCapacity = dateISO === getNoCapacityDateISO();

  useEffect(() => {
    if (!bookingDraft.dateISO) {
      router.replace("/agendar/fecha");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isNoCapacity) {
    const otherPoints = SEED_POINTS.filter((p) => p.id !== point.id);
    return (
      <>
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Agendar donación", href: "/agendar" },
            { label: "Horario" },
          ]}
        />
        <PageHeader
          title="No quedan cupos ese día"
          body={`Para el ${formatDateWeekdayNoYear(dateISO)} no hay horarios en ${point.name}.`}
        />
        <Container className="flex flex-col gap-6 pb-16">
          <Banner variant="error" title="No hay horarios disponibles">
            Puedes elegir otra fecha en el mismo punto o buscar un punto
            cercano con cupo.
          </Banner>

          <div>
            <p className="text-h2 mb-4">Alternativas</p>
            <Table
              columns={["Opción", "Punto de donación", "Fecha", "Cupos libres"]}
              rows={[
                ["Otra fecha", point.name, formatDateWeekdayNoYearCap(addDays(dateISO, 1)), "9"],
                ["Otro punto", otherPoints[0].name, formatDateWeekdayNoYearCap(dateISO), "5"],
                ["Otro punto", otherPoints[1].name, formatDateWeekdayNoYearCap(dateISO), "3"],
              ]}
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={() => router.push("/agendar/fecha")}>Elegir otra fecha</Button>
            <Button variant="secondary" onClick={() => router.push("/agendar/resultados")}>
              Ver otros puntos
            </Button>
          </div>

          <InfoNote>
            También puedes activar un aviso y te escribimos si se libera un
            cupo.
          </InfoNote>
        </Container>
      </>
    );
  }

  function handleContinue() {
    if (!time) return;
    setBookingDraft({ time });
    router.push("/agendar/resumen");
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Horario" },
        ]}
      />
      <PageHeader title="Elige la hora" body={`${formatDateWeekdayNoYearCap(dateISO)} · ${point.name}`} />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={4} total={4} label="Fecha y hora" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-h3 mb-3">Mañana</p>
              <div className="flex flex-col gap-3">
                {MORNING.map((slot) => (
                  <RadioOption
                    key={slot.time}
                    name="hora"
                    value={slot.time}
                    label={slot.time}
                    caption={`${slot.slots} cupos`}
                    checked={time === slot.time}
                    onChange={() => setTime(slot.time)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-h3 mb-3">Tarde</p>
              <div className="flex flex-col gap-3">
                {AFTERNOON.map((slot) => (
                  <RadioOption
                    key={slot.time}
                    name="hora"
                    value={slot.time}
                    label={slot.time}
                    caption={slot.slots === 0 ? "Sin cupo" : `${slot.slots} cupos`}
                    disabled={slot.slots === 0}
                    checked={time === slot.time}
                    onChange={() => setTime(slot.time)}
                  />
                ))}
              </div>
            </div>
          </div>

          <Card icon={IconCheckCircle}
            title="Tu selección"
            action={{ label: "Cupo reservado mientras eliges" }}
          >
            {time
              ? `${point.name} · ${formatDateWeekdayNoYearCap(dateISO)} a las ${time}.`
              : `${point.name} · ${formatDateWeekdayNoYearCap(dateISO)}. Falta elegir la hora del turno.`}
          </Card>
        </div>

        <InfoNote>Llega 10 minutos antes de la hora de tu turno para el registro.</InfoNote>

        <div className="flex gap-4">
          <Button onClick={handleContinue} disabled={!time}>
            Continuar
          </Button>
          <Button variant="secondary" onClick={() => router.push("/agendar/fecha")}>
            Cambiar de fecha
          </Button>
        </div>
      </Container>
    </>
  );
}
