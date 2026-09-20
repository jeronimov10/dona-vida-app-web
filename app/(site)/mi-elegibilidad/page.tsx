"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { getEligibility } from "@/lib/eligibility";
import { calculateAge, formatDateLong, formatDateShortYear } from "@/lib/format";
import {
  IconCalendar,
  IconCheckCircle,
  IconClock,
} from "@/components/icons";

export default function MiElegibilidadPage() {
  const profile = useAppStore((s) => s.profile);
  const donations = useAppStore((s) => s.donations);
  const mostRecent = donations.find((d) => d.status === "Completada");
  const eligibility = getEligibility(profile.lastDonationDateISO);
  const age = calculateAge(profile.birthdateISO);

  const ageOk = age >= 18 && age <= 65;
  const weightOk = profile.weight > 50;

  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Mi elegibilidad" }]} />
      <PageHeader title="Mi elegibilidad" body="Cuándo puedes volver a donar, y por qué." />
      <Container className="flex flex-col gap-8 pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard
            icon={IconCheckCircle}
            label="Estado actual"
            value={eligibility.isEligible ? "Elegible" : "No elegible"}
            caption={eligibility.isEligible ? "Puedes donar hoy mismo" : `Vuelve el ${formatDateLong(eligibility.nextEligibleDateISO)}`}
          />
          <StatCard
            icon={IconCalendar}
            label="Última donación"
            value={formatDateShortYear(profile.lastDonationDateISO)}
            caption={mostRecent ? `${mostRecent.point} · ${mostRecent.volumeMl} ml` : undefined}
          />
          <StatCard
            icon={IconClock}
            label="Días transcurridos"
            value={String(eligibility.daysSince)}
            caption="El mínimo requerido es 90"
          />
        </div>

        <div>
          <p className="text-h2 mb-4">Detalle del cálculo</p>
          <Table
            columns={["Requisito", "Tu dato", "Condición", "Resultado"]}
            rows={[
              [
                "Periodo de espera",
                `${eligibility.daysSince} días`,
                "Mínimo 90 días",
                eligibility.isEligible ? "Cumple" : "No cumple",
              ],
              ["Edad", `${age} años`, "Entre 18 y 65 años", ageOk ? "Cumple" : "No cumple"],
              ["Peso", `${profile.weight} kg`, "Más de 50 kg", weightOk ? "Cumple" : "No cumple"],
            ]}
          />
        </div>

        <InfoNote>
          El periodo de espera de 90 días protege tu salud: tu cuerpo repone
          el hierro perdido.
        </InfoNote>

        <div className="flex gap-4">
          {eligibility.isEligible ? (
            <Button href="/agendar">Agendar donación</Button>
          ) : (
            <Button href="/mi-elegibilidad/proxima-fecha">Ver próxima fecha</Button>
          )}
          <Button variant="secondary" href="/mi-elegibilidad/historial">
            Ver historial
          </Button>
        </div>
      </Container>
    </>
  );
}
