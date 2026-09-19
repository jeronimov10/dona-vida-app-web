"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { getEligibility } from "@/lib/eligibility";
import { diffInDays, formatDateShort, formatDateWithWeekday, formatDateLong, todayISO } from "@/lib/format";

export default function PanelPage() {
  const profile = useAppStore((s) => s.profile);
  const turno = useAppStore((s) => s.turno);
  const donations = useAppStore((s) => s.donations);

  const firstName = profile.name.split(" ")[0];
  const eligibility = getEligibility(profile.lastDonationDateISO);
  const completedDonations = donations.filter((d) => d.status === "Completada");
  const mostRecent = completedDonations[0];

  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Mi panel" }]} />
      <PageHeader title={`Hola, ${firstName}`} body="Este es el resumen de tu actividad como donante." />
      <Container className="flex flex-col gap-10 pb-16">
        <div>
          <SectionHeader title="Tu próximo turno" action={{ label: "Ver detalle", href: "/mi-turno" }} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {turno ? (
              <Card
                title={turno.pointName}
                action={{
                  label: `Faltan ${Math.max(0, diffInDays(todayISO(), turno.dateISO))} días para tu donación`,
                }}
              >
                {formatDateWithWeekday(turno.dateISO)} · {turno.time} · {turno.address}
              </Card>
            ) : (
              <Card title="Aún no tienes un turno" action={{ label: "Agendar donación", href: "/agendar" }}>
                Agenda tu próxima donación para verla aquí.
              </Card>
            )}
            <Card title="Recuerda" action={{ label: "Ver todas las recomendaciones", href: "/mi-turno" }}>
              Desayuna e hidrátate bien antes de tu donación. Lleva tu documento.
            </Card>
          </div>
        </div>

        <div>
          <SectionHeader title="Tu estado como donante" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatCard
              label="Donaciones"
              value={String(completedDonations.length)}
              caption={mostRecent ? `Última: ${formatDateLong(mostRecent.dateISO)}` : undefined}
            />
            <StatCard
              label="Elegibilidad"
              value={eligibility.isEligible ? "Elegible" : "No elegible"}
              caption={eligibility.isEligible ? "Ya puedes donar de nuevo" : `Vuelve el ${formatDateLong(eligibility.nextEligibleDateISO)}`}
            />
            <StatCard
              label="Próximo turno"
              value={turno ? formatDateShort(turno.dateISO) : "Sin agendar"}
              caption={turno ? `${turno.pointName} · ${turno.time}` : "Agenda tu turno"}
            />
          </div>
        </div>

        <InfoNote>
          {profile.bloodType === "O−"
            ? `Tu tipo de sangre ${profile.bloodType} es donante universal: tu donación puede usarse en cualquier paciente.`
            : `Tu tipo de sangre es ${profile.bloodType}. Los puntos de donación te avisan cuando tu tipo tiene alta demanda.`}
        </InfoNote>
      </Container>
    </>
  );
}
