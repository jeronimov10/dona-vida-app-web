"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Banner } from "@/components/ui/Banner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";

export default function RegistroExitoPage() {
  const profile = useAppStore((s) => s.profile);
  const firstName = profile.name.split(" ")[0];

  return (
    <>
      <div className="mx-auto max-w-[520px] px-[72px] pt-12 text-center">
        <h1 className="text-h1">¡Bienvenida, {firstName}!</h1>
        <p className="text-body mt-2 text-gray-60">
          Tu cuenta y tu perfil de donante quedaron creados.
        </p>
        <Banner title="Cuenta creada" className="mt-6 text-left">
          Enviamos un correo de confirmación a {profile.email}
        </Banner>
      </div>

      <Container className="pb-16 pt-12">
        <SectionHeader title="¿Qué sigue?" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card
            title="Verifica tu elegibilidad"
            action={{ label: "Empezar", href: "/agendar/elegibilidad" }}
          >
            Un cuestionario de seis preguntas, toma menos de un minuto.
          </Card>
          <Card
            title="Busca un punto cercano"
            action={{ label: "Buscar puntos", href: "/agendar" }}
          >
            Filtra por distancia y horario de atención.
          </Card>
          <Card
            title="Agenda tu primer turno"
            action={{ label: "Agendar", href: "/agendar" }}
          >
            Elige la fecha y la hora que te queden bien.
          </Card>
        </div>

        <Button href="/panel" className="mt-8">
          Ir a mi panel
        </Button>
      </Container>
    </>
  );
}
