"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { getEligibility } from "@/lib/eligibility";
import { formatDateLong } from "@/lib/format";

export default function ProximaFechaPage() {
  const profile = useAppStore((s) => s.profile);
  const eligibility = getEligibility(profile.lastDonationDateISO);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
          { label: "Próxima fecha" },
        ]}
      />
      <PageHeader
        title="Tu próxima fecha"
        body={
          eligibility.isEligible
            ? "Ya puedes donar hoy mismo."
            : `Podrás donar de nuevo a partir del ${formatDateLong(eligibility.nextEligibleDateISO)}.`
        }
      />
      <Container className="flex flex-col gap-8 pb-16">
        <Banner variant="error" title={eligibility.isEligible ? "Ya eres elegible" : "Aún no eres elegible"}>
          {eligibility.isEligible
            ? "Ya cumpliste el periodo mínimo de 90 días entre donaciones."
            : `Te faltan ${eligibility.daysRemaining} días para cumplir el periodo mínimo de 90 días entre donaciones.`}
        </Banner>

        <div>
          <SectionHeader title="Mientras tanto" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card
              title="Activa un recordatorio"
              action={{ label: "Activar recordatorio", href: "/mi-elegibilidad/recordatorio" }}
            >
              Te avisamos por correo el mismo día en que puedas volver a
              donar.
            </Card>
            <Card title="Revisa los requisitos" action={{ label: "Ver requisitos", href: "/requisitos" }}>
              Llega preparado a tu próxima cita y evita sorpresas.
            </Card>
          </div>
        </div>

        <InfoNote>
          El periodo de espera protege tu salud: tu cuerpo necesita reponer
          el hierro perdido.
        </InfoNote>

        <div className="flex gap-4">
          <Button href="/mi-elegibilidad/recordatorio">Activar recordatorio</Button>
          <Button variant="secondary" href="/mi-elegibilidad">
            Volver
          </Button>
        </div>
      </Container>
    </>
  );
}
