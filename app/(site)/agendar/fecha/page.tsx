"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Stepper } from "@/components/ui/Stepper";
import { Calendar } from "@/components/ui/Calendar";
import { RadioOption } from "@/components/ui/RadioOption";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { addDays, formatDateWeekdayNoYearCap, parseISODate, todayISO } from "@/lib/format";
import { getNoCapacityDateISO, SEED_POINTS } from "@/lib/seed";

const MONTH_LABELS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const MONTH_LABELS_LOWER = MONTH_LABELS.map((m) => m.toLowerCase());

export default function ElegirFechaPage() {
  const router = useRouter();
  const setBookingDraft = useAppStore((s) => s.setBookingDraft);
  const bookingDraft = useAppStore((s) => s.bookingDraft);
  const point = SEED_POINTS.find((p) => p.id === bookingDraft.pointId) ?? SEED_POINTS[0];

  const today = todayISO();
  const options = [
    { dateISO: addDays(today, 1), slots: 6 },
    { dateISO: getNoCapacityDateISO(), slots: 2 },
    { dateISO: addDays(today, 3), slots: 9 },
  ];

  const [selectedDateISO, setSelectedDateISO] = useState(bookingDraft.dateISO ?? "");
  const referenceDate = parseISODate(options[0].dateISO);
  const [year, setYear] = useState(referenceDate.getFullYear());
  const [month, setMonth] = useState(referenceDate.getMonth());

  const availableDays = options
    .map((o) => parseISODate(o.dateISO))
    .filter((d) => d.getFullYear() === year && d.getMonth() === month)
    .map((d) => d.getDate());

  const selectedDate = selectedDateISO ? parseISODate(selectedDateISO) : null;
  const selectedDay =
    selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month
      ? selectedDate.getDate()
      : undefined;

  function changeMonth(delta: number) {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  }

  function handleContinue() {
    if (!selectedDateISO) return;
    setBookingDraft({ dateISO: selectedDateISO });
    router.push("/agendar/horario");
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Fecha" },
        ]}
      />
      <PageHeader
        title="Elige el día"
        body={`Disponibilidad de ${point.name} durante ${MONTH_LABELS_LOWER[month]}.`}
      />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={4} total={4} label="Fecha y hora" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
          <Calendar
            monthLabel={`${MONTH_LABELS[month]} ${year}`}
            year={year}
            month={month}
            availableDays={availableDays}
            selectedDay={selectedDay}
            onSelectDay={(day) => {
              const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              setSelectedDateISO(iso);
            }}
            onPrevMonth={() => changeMonth(-1)}
            onNextMonth={() => changeMonth(1)}
          />

          <div className="flex flex-col gap-4">
            <p className="text-h2">Días con cupo disponible</p>
            <div className="flex flex-col gap-3">
              {options.map((option) => (
                <RadioOption
                  key={option.dateISO}
                  name="fecha"
                  value={option.dateISO}
                  label={formatDateWeekdayNoYearCap(option.dateISO)}
                  caption={`${option.slots} cupos`}
                  checked={selectedDateISO === option.dateISO}
                  onChange={() => setSelectedDateISO(option.dateISO)}
                />
              ))}
            </div>

            <InfoNote>
              Los días con borde marcado en el calendario tienen cupo
              disponible.
            </InfoNote>

            <div className="flex gap-4">
              <Button onClick={handleContinue} disabled={!selectedDateISO}>
                Continuar
              </Button>
              <Button variant="secondary" onClick={() => router.push("/agendar/resultados")}>
                Cambiar de punto
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
