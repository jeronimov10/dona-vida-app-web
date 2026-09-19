import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  IconCalendar,
  IconCheckCircle,
  IconClock,
} from "@/components/icons";
import { InfoNote } from "@/components/ui/InfoNote";
import { WideImage } from "@/components/ui/WideImage";

export default function InicioPage() {
  return (
    <Container className="py-12">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h1 className="text-display">Dona sangre, salva vidas</h1>
          <p className="text-body mt-4 max-w-[480px] text-ink-muted">
            Encuentra un punto de donación cerca de ti, revisa si puedes donar
            hoy y agenda tu turno en menos de dos minutos.
          </p>
          <div className="mt-6 flex gap-4">
            <Button href="/agendar">Agendar mi donación</Button>
            <Button href="/requisitos" variant="secondary">
              Ver requisitos
            </Button>
          </div>
        </div>
        <WideImage className="h-[220px] flex-1" label="Persona donando sangre" />
      </div>

      <div className="mt-16">
        <SectionHeader title="Cómo funciona" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card
            title="1 · Revisa si puedes donar"
            icon={IconCheckCircle}
            action={{ label: "Verificar elegibilidad", href: "/agendar/elegibilidad" }}
          >
            Un cuestionario de seis preguntas te dice si eres elegible hoy.
          </Card>
          <Card
            title="2 · Elige dónde y cuándo"
            icon={IconClock}
            action={{ label: "Buscar puntos", href: "/agendar" }}
          >
            Filtra los puntos por distancia y horario, y escoge tu cupo.
          </Card>
          <Card
            title="3 · Agenda la próxima"
            icon={IconCalendar}
            action={{ label: "Ver mi elegibilidad", href: "/mi-elegibilidad" }}
          >
            Te avisamos cuando vuelvas a ser elegible, a los 90 días.
          </Card>
        </div>
      </div>

      <InfoNote className="mt-10">
        Cada donación puede salvar hasta tres vidas. Donar es voluntario,
        gratuito y toma menos de una hora.
      </InfoNote>
    </Container>
  );
}
