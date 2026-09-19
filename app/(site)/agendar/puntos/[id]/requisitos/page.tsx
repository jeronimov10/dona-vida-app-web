"use client";

import { useParams, useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Stepper } from "@/components/ui/Stepper";
import { Banner } from "@/components/ui/Banner";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { SEED_POINTS } from "@/lib/seed";

export default function RequisitosPuntoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const point = SEED_POINTS.find((p) => p.id === params.id) ?? SEED_POINTS[0];
  const bloodType = useAppStore((s) => s.profile.bloodType);

  const matches = point.bloodNeeds.some((need) => need.bloodType === bloodType);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Requisitos" },
        ]}
      />
      <PageHeader title={`Requisitos de ${point.name}`} body="Confirma que cumples antes de seguir con la fecha." />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={2} total={4} label="Requisitos" />

        <Banner title={matches ? "Tu tipo de sangre coincide" : "Revisa la necesidad del punto"}>
          {matches
            ? `Este punto necesita donantes ${bloodType} y ese es tu tipo registrado. Puedes continuar.`
            : "Este punto no reporta necesidad urgente de tu tipo, pero igual puedes donar."}
        </Banner>

        <div>
          <p className="text-h2 mb-4">Necesidad actual del punto</p>
          <Table
            columns={["Tipo de sangre", "Necesidad", "Reserva actual", "¿Es tu tipo?"]}
            rows={point.bloodNeeds.map((need) => [
              need.bloodType,
              need.need,
              need.reserve,
              need.bloodType === bloodType ? "Sí" : "No",
            ])}
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={() => router.push("/agendar/elegibilidad")}>Continuar</Button>
          <Button variant="secondary" onClick={() => router.push("/agendar/resultados")}>
            Ver otros puntos
          </Button>
        </div>
      </Container>
    </>
  );
}
