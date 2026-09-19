import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ElegirHorarioPage() {
  return (
    <ScreenStub
      number="19/20"
      name="Elegir horario / Sin horarios disponibles"
      group="D"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Horario" },
      ]}
    />
  );
}
