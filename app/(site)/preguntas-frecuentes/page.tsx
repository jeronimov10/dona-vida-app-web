import { ScreenStub } from "@/components/layout/ScreenStub";

export default function PreguntasFrecuentesPage() {
  return (
    <ScreenStub
      number="09"
      name="Preguntas frecuentes"
      group="B"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Preguntas frecuentes" },
      ]}
    />
  );
}
