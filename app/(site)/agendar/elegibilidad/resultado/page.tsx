"use client";

import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Stepper } from "@/components/ui/Stepper";
import { Banner } from "@/components/ui/Banner";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { getEligibility } from "@/lib/eligibility";
import { calculateAge, formatDateLong } from "@/lib/format";
import { getIneligibleScenario, SEED_POINTS } from "@/lib/seed";

export default function ResultadoElegibilidadPage() {
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const bookingDraft = useAppStore((s) => s.bookingDraft);
  const lastCheckPassed = useAppStore((s) => s.lastEligibilityCheckPassed);

  const eligibility = getEligibility(profile.lastDonationDateISO);
  const passed = lastCheckPassed ?? eligibility.isEligible;

  const point = SEED_POINTS.find((p) => p.id === bookingDraft.pointId) ?? SEED_POINTS[0];
  const backToPointHref = bookingDraft.pointId
    ? `/agendar/puntos/${bookingDraft.pointId}`
    : "/agendar/resultados";

  if (passed) {
    const age = calculateAge(profile.birthdateISO);
    return (
      <>
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Agendar donación", href: "/agendar" },
            { label: "Resultado" },
          ]}
        />
        <PageHeader
          title="¡Puedes donar!"
          body={`Cumples los requisitos para donar hoy en ${point.name}.`}
        />
        <Container className="flex flex-col gap-6 pb-16">
          <Stepper step={3} total={4} label="Elegibilidad" />

          <Banner title="Eres elegible">
            Cumples con la edad, el peso y el tiempo transcurrido desde tu
            última donación.
          </Banner>

          <div>
            <p className="text-h2 mb-4">Resumen de tu verificación</p>
            <Table
              columns={["Requisito", "Tu dato", "Condición", "Resultado"]}
              rows={[
                [`Edad`, `${age} años`, "Entre 18 y 65 años", "Cumple"],
                [`Peso`, `${profile.weight} kg`, "Más de 50 kg", "Cumple"],
                [
                  `Última donación`,
                  `Hace ${eligibility.daysSince} días`,
                  "Mínimo 90 días",
                  "Cumple",
                ],
              ]}
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={() => router.push("/agendar/fecha")}>Elegir fecha</Button>
            <Button variant="secondary" href={backToPointHref}>
              Volver al punto
            </Button>
          </div>
        </Container>
      </>
    );
  }

  const scenario = getIneligibleScenario();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Resultado" },
        ]}
      />
      <PageHeader title="Aún no puedes donar" body={`Te faltan ${scenario.daysRemaining} días para volver a ser elegible.`} />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={3} total={4} label="Elegibilidad" />

        <Banner title="No cumples el periodo de espera">
          Tu última donación fue hace {scenario.daysSince} días y el mínimo es
          de 90 días entre donaciones.
        </Banner>

        <div>
          <p className="text-h2 mb-4">Detalle de la verificación</p>
          <Table
            columns={["Requisito", "Tu dato", "Condición", "Resultado"]}
            rows={[
              [`Última donación`, `Hace ${scenario.daysSince} días`, "Mínimo 90 días", "No cumple"],
              [
                `Próxima fecha`,
                formatDateLong(scenario.nextEligibleDateISO),
                "—",
                `Faltan ${scenario.daysRemaining} días`,
              ],
            ]}
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={() => router.push("/mi-elegibilidad/recordatorio")}>
            Activar recordatorio
          </Button>
          <Button variant="secondary" onClick={() => router.push("/mi-elegibilidad")}>
            Ver mi elegibilidad
          </Button>
        </div>
      </Container>
    </>
  );
}
