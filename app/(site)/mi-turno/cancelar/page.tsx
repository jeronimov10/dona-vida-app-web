"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { RadioOption } from "@/components/ui/RadioOption";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatDateWeekdayNoYear } from "@/lib/format";

const REASONS = [
  "Ya no puedo asistir ese día",
  "Encontré un punto más cercano",
  "Motivos de salud",
  "Otro motivo",
];

export default function CancelarTurnoPage() {
  const router = useRouter();
  const turno = useAppStore((s) => s.turno);
  const cancelTurno = useAppStore((s) => s.cancelTurno);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!turno) router.replace("/mi-turno");
  }, [turno, router]);

  if (!turno) return null;

  function handleCancel() {
    cancelTurno();
    router.push("/mi-turno/cancelado");
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi turno", href: "/mi-turno" },
          { label: "Cancelar" },
        ]}
      />
      <PageHeader
        title="Cancelar turno"
        body={`Perderás el cupo del ${formatDateWeekdayNoYear(turno.dateISO)} a las ${turno.time}.`}
      />
      <Container className="flex flex-col gap-6 pb-16">
        <div>
          <p className="text-h2 mb-4">Cuéntanos por qué cancelas</p>
          <div className="flex flex-col gap-3">
            {REASONS.map((option) => (
              <RadioOption
                key={option}
                name="motivo"
                value={option}
                label={option}
                checked={reason === option}
                onChange={() => setReason(option)}
              />
            ))}
          </div>
        </div>

        <TextField
          label="Comentario (opcional)"
          placeholder="Escribe aquí tu comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          containerClassName="max-w-[500px]"
        />

        <InfoNote>
          Cancelar no afecta tu historial ni tu elegibilidad como donante.
        </InfoNote>

        <div className="flex gap-4">
          <Button onClick={handleCancel}>Sí, cancelar</Button>
          <Button variant="secondary" href="/mi-turno">
            No, volver
          </Button>
        </div>
      </Container>
    </>
  );
}
