"use client";

import { useEffect } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { getEligibility } from "@/lib/eligibility";
import { formatDateLong } from "@/lib/format";

export default function RecordatorioPage() {
  const profile = useAppStore((s) => s.profile);
  const reminderActive = useAppStore((s) => s.reminderActive);
  const setReminderActive = useAppStore((s) => s.setReminderActive);
  const notificationPrefs = useAppStore((s) => s.notificationPrefs);
  const setNotificationPrefs = useAppStore((s) => s.setNotificationPrefs);

  const eligibility = getEligibility(profile.lastDonationDateISO);

  useEffect(() => {
    if (!reminderActive) setReminderActive(true);
  }, [reminderActive, setReminderActive]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
          { label: "Recordatorio" },
        ]}
      />
      <PageHeader title="Recordatorio activado" body="Te enviaremos un correo electrónico cuando puedas volver a donar." />
      <Container className="flex flex-col gap-8 pb-16">
        <Banner title="Recordatorio activado">
          Te enviaremos un correo electrónico el {formatDateLong(eligibility.nextEligibleDateISO)},
          además de los canales adicionales que actives.
        </Banner>

        <div>
          <p className="text-h2 mb-4">Cómo quieres que te avisemos</p>
          <div className="flex flex-col gap-3">
            <Checkbox label="Correo electrónico (predeterminado)" checked disabled readOnly />
            <Checkbox
              label="Notificación en la aplicación móvil (adicional)"
              checked={notificationPrefs.push}
              onChange={(e) => setNotificationPrefs({ push: e.target.checked })}
            />
            <Checkbox
              label="Mensaje de texto (adicional)"
              checked={notificationPrefs.sms}
              onChange={(e) => setNotificationPrefs({ sms: e.target.checked })}
            />
          </div>
        </div>

        <InfoNote>Puedes desactivarlo cuando quieras desde tu perfil.</InfoNote>

        <div className="flex gap-4">
          <Button href="/panel">Guardar preferencias</Button>
          <Button variant="secondary" href="/panel">
            Ir a mi panel
          </Button>
        </div>
      </Container>
    </>
  );
}
