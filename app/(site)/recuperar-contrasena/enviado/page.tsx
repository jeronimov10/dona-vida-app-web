"use client";

import { useEffect, useState } from "react";
import { CenteredCard } from "@/components/layout/CenteredCard";
import { Banner } from "@/components/ui/Banner";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";

const RESEND_SECONDS = 45;

export default function CorreoEnviadoPage() {
  const sessionEmail = useAppStore((s) => s.session.email);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const countdownLabel = `00:${String(secondsLeft).padStart(2, "0")}`;

  return (
    <CenteredCard>
      <div className="text-center">
        <h1 className="text-h1">Revisa tu correo</h1>
        <p className="text-body mt-2 text-ink-muted">
          Enviamos un enlace a {sessionEmail ?? "laura.gomez@email.com"}
        </p>
      </div>

      <Banner title="Instrucciones enviadas" className="mt-6">
        Sigue el enlace del correo para crear una contraseña nueva. Revisa
        también la carpeta de spam.
      </Banner>

      <p className="text-caption mt-6 text-center text-ink-muted">
        {secondsLeft > 0
          ? `¿No te llegó? Podrás reenviarlo en ${countdownLabel}`
          : "¿No te llegó?"}
      </p>

      <div className="mt-3 flex flex-col items-center gap-3">
        <Button
          variant="secondary"
          disabled={secondsLeft > 0}
          onClick={() => setSecondsLeft(RESEND_SECONDS)}
          className="w-full"
        >
          Reenviar correo
        </Button>
        <Button href="/login" className="w-full">
          Volver a iniciar sesión
        </Button>
      </div>

      <InfoNote className="mt-6">
        Por seguridad, el enlace solo puede usarse una vez.
      </InfoNote>
    </CenteredCard>
  );
}
