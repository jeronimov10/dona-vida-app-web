"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { formatDateWeekdayNoYear } from "@/lib/format";
import {
  IconCheckCircle,
  IconHeart,
  IconInfo,
} from "@/components/icons";

export default function TurnoAgendadoPage() {
  const router = useRouter();
  const turno = useAppStore((s) => s.turno);

  useEffect(() => {
    if (!turno) router.replace("/panel");
  }, [turno, router]);

  if (!turno) return null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Confirmado" },
        ]}
      />
      <PageHeader
        title="¡Turno agendado!"
        body={`Te esperamos el ${formatDateWeekdayNoYear(turno.dateISO)} a las ${turno.time}.`}
      />
      <Container className="flex flex-col gap-8 pb-16">
        <Banner title="Turno confirmado">
          Tu código de turno es {turno.code}. Lo enviamos también a tu correo.
        </Banner>

        <div>
          <SectionHeader title="Recuerda para ese día" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card icon={IconCheckCircle} title="Lleva tu documento" action={{ label: "Requisito del punto" }}>
              Cédula o documento de identidad vigente y en físico.
            </Card>
            <Card icon={IconHeart} title="Desayuna antes" action={{ label: "Recomendación" }}>
              No vayas en ayunas: come algo ligero un par de horas antes.
            </Card>
            <Card icon={IconInfo} title="Hidrátate bien" action={{ label: "Recomendación" }}>
              Toma agua el día anterior y también el mismo día.
            </Card>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => router.push("/mi-turno")}>Ir a mi turno</Button>
          <Button variant="secondary">Agregar al calendario</Button>
        </div>

        <Card icon={IconInfo} title="Pedir transporte al punto" action={{ label: "Pedir transporte" }}>
          Enviamos la dirección de {turno.pointName} directo a tu app de
          transporte; no necesitas escribirla.
        </Card>
      </Container>
    </>
  );
}
