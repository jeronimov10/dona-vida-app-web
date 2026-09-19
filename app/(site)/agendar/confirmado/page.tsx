import { ScreenStub } from "@/components/layout/ScreenStub";

export default function TurnoAgendadoPage() {
  return (
    <ScreenStub
      number="23"
      name="Turno agendado"
      group="D"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Confirmado" },
      ]}
    />
  );
}
