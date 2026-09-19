import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ResultadoElegibilidadPage() {
  return (
    <ScreenStub
      number="16/17"
      name="Eres elegible / Aún no puedes donar"
      group="D"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Resultado" },
      ]}
    />
  );
}
