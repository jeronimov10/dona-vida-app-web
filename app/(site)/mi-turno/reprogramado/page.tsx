"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatDateWeekdayNoYear, formatDateWeekdayNoYearCap } from "@/lib/format";

export default function TurnoReprogramadoPage() {
  const router = useRouter();
  const turno = useAppStore((s) => s.turno);
  const lastReprogram = useAppStore((s) => s.lastReprogram);

  useEffect(() => {
    if (!turno) router.replace("/mi-turno");
  }, [turno, router]);

  if (!turno || !lastReprogram) return null;

  const dateChanged = lastReprogram.beforeDateISO !== lastReprogram.afterDateISO;
  const timeChanged = lastReprogram.beforeTime !== lastReprogram.afterTime;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi turno", href: "/mi-turno" },
          { label: "Reprogramado" },
        ]}
      />
      <PageHeader title="Turno reprogramado" body="Tu nuevo turno quedó confirmado." />
      <Container className="flex flex-col gap-6 pb-16">
        <Banner title="Cambio confirmado">
          Tu nuevo turno es el {formatDateWeekdayNoYear(lastReprogram.afterDateISO)} a
          las {lastReprogram.afterTime} en {turno.pointName}.
        </Banner>

        <div>
          <p className="text-h2 mb-4">Qué cambió</p>
          <Table
            columns={["Dato", "Antes", "Ahora", "Estado"]}
            rows={[
              [
                "Fecha",
                formatDateWeekdayNoYearCap(lastReprogram.beforeDateISO),
                formatDateWeekdayNoYearCap(lastReprogram.afterDateISO),
                dateChanged ? "Actualizado" : "Sin cambio",
              ],
              [
                "Hora",
                lastReprogram.beforeTime,
                lastReprogram.afterTime,
                timeChanged ? "Actualizado" : "Sin cambio",
              ],
            ]}
          />
        </div>

        <InfoNote>
          Actualizamos tu recordatorio automáticamente y te lo confirmamos por
          correo electrónico.
        </InfoNote>

        <div className="flex gap-4">
          <Button href="/mi-turno">Ir a mi turno</Button>
          <Button variant="secondary" href="/panel">
            Ir a mi panel
          </Button>
        </div>
      </Container>
    </>
  );
}
