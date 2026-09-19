import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ResultadosPage() {
  return (
    <ScreenStub
      number="12"
      name="Resultados de puntos"
      group="C"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Resultados" },
      ]}
    />
  );
}
