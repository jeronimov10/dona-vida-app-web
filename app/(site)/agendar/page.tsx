import { ScreenStub } from "@/components/layout/ScreenStub";

export default function AgendarPage() {
  return (
    <ScreenStub
      number="11"
      name="Buscar punto de donación"
      group="C"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Agendar donación" }]}
    />
  );
}
