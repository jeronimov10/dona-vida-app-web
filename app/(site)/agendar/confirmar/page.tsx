"use client";

import { useRouter } from "next/navigation";
import { CenteredCard } from "@/components/layout/CenteredCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatDateWeekdayNoYearCap, formatDateWithWeekday, todayISO } from "@/lib/format";
import { SEED_POINTS } from "@/lib/seed";

export default function ConfirmarTurnoPage() {
  const router = useRouter();
  const bookingDraft = useAppStore((s) => s.bookingDraft);
  const confirmTurno = useAppStore((s) => s.confirmTurno);

  const point = SEED_POINTS.find((p) => p.id === bookingDraft.pointId) ?? SEED_POINTS[0];
  const dateISO = bookingDraft.dateISO ?? todayISO();
  const time = bookingDraft.time ?? "10:00 a. m.";

  function handleConfirm() {
    confirmTurno({
      pointId: point.id,
      pointName: point.name,
      address: point.address,
      dateISO,
      time,
    });
    router.push("/agendar/confirmado");
  }

  return (
    <CenteredCard width="wide">
      <div className="text-center">
        <h1 className="text-h1">¿Confirmas tu turno?</h1>
        <p className="text-body mt-2 text-gray-60">
          {point.name} · {formatDateWeekdayNoYearCap(dateISO)}, {time}
        </p>
      </div>

      <Card title="Resumen de la reserva" action={{ label: "El cupo queda reservado por 10 minutos" }} className="mt-6">
        {point.name} · {formatDateWithWeekday(dateISO)} · {time}
      </Card>

      <InfoNote className="mt-6">
        Se enviará un recordatorio por correo electrónico 24 horas antes de tu
        cita.
      </InfoNote>

      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={handleConfirm}>Sí, confirmar</Button>
        <Button variant="secondary" onClick={() => router.push("/agendar/resumen")}>
          Cancelar
        </Button>
      </div>

      <p className="text-caption mt-4 text-center text-gray-60">
        Al confirmar aceptas las políticas del banco de sangre.
      </p>
    </CenteredCard>
  );
}
