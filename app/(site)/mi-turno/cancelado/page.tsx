import { ScreenStub } from "@/components/layout/ScreenStub";

export default function TurnoCanceladoPage() {
  return (
    <ScreenStub
      number="29"
      name="Turno cancelado"
      group="E"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi turno", href: "/mi-turno" },
        { label: "Cancelado" },
      ]}
    />
  );
}
