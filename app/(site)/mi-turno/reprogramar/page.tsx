"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Calendar } from "@/components/ui/Calendar";
import { RadioOption } from "@/components/ui/RadioOption";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { addDays, formatDateWeekdayNoYear, formatDateWeekdayNoYearCap, parseISODate, todayISO } from "@/lib/format";

const MONTH_LABELS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const HOUR_OPTIONS = ["8:00 a. m.", "10:00 a. m.", "2:00 p. m."];

export default function ReprogramarTurnoPage() {
  const router = useRouter();
  const turno = useAppStore((s) => s.turno);
  const reprogramTurno = useAppStore((s) => s.reprogramTurno);

  useEffect(() => {
    if (!turno) router.replace("/mi-turno");
  }, [turno, router]);

  const today = todayISO();
  const options = [
    { dateISO: addDays(today, 3), slots: 5 },
    { dateISO: addDays(today, 4), slots: 2 },
    { dateISO: addDays(today, 5), slots: 8 },
  ];

  const [selectedDateISO, setSelectedDateISO] = useState("");
  const [time, setTime] = useState("");
  const referenceDate = parseISODate(options[0].dateISO);
  const [year, setYear] = useState(referenceDate.getFullYear());
  const [month, setMonth] = useState(referenceDate.getMonth());

  if (!turno) return null;

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

  function handleConfirm() {
    if (!selectedDateISO || !time) return;
    reprogramTurno(selectedDateISO, time);
    router.push("/mi-turno/reprogramado");
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi turno", href: "/mi-turno" },
          { label: "Reprogramar" },
        ]}
      />
      <PageHeader
        title="Reprogramar turno"
        body={`Turno actual: ${formatDateWeekdayNoYear(turno.dateISO)}, ${turno.time} en ${turno.pointName}.`}
      />
      <Container className="flex flex-col gap-6 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
          <div>
            <p className="text-h3 mb-3">Nueva fecha</p>
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
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-h3 mb-3">Días con cupo</p>
              <div className="flex flex-col gap-3">
                {options.map((option) => (
                  <RadioOption
                    key={option.dateISO}
                    name="nueva-fecha"
                    value={option.dateISO}
                    label={formatDateWeekdayNoYearCap(option.dateISO)}
                    caption={`${option.slots} cupos`}
                    checked={selectedDateISO === option.dateISO}
                    onChange={() => setSelectedDateISO(option.dateISO)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-h3 mb-3">Nueva hora</p>
              <div className="flex flex-col gap-3">
                {HOUR_OPTIONS.map((hour) => (
                  <RadioOption
                    key={hour}
                    name="nueva-hora"
                    value={hour}
                    label={hour}
                    checked={time === hour}
                    onChange={() => setTime(hour)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <InfoNote>Solo puedes reprogramar dos veces el mismo turno.</InfoNote>

        <div className="flex gap-4">
          <Button onClick={handleConfirm} disabled={!selectedDateISO || !time}>
            Confirmar nueva fecha
          </Button>
          <Button variant="secondary" href="/mi-turno">
            Volver
          </Button>
        </div>
      </Container>
    </>
  );
}
