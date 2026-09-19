import { ScreenStub } from "@/components/layout/ScreenStub";

export default function CancelarTurnoPage() {
  return (
    <ScreenStub
      number="28"
      name="Cancelar turno"
      group="E"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi turno", href: "/mi-turno" },
        { label: "Cancelar" },
      ]}
    />
  );
}
