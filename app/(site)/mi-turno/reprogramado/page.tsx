import { ScreenStub } from "@/components/layout/ScreenStub";

export default function TurnoReprogramadoPage() {
  return (
    <ScreenStub
      number="27"
      name="Turno reprogramado"
      group="E"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi turno", href: "/mi-turno" },
        { label: "Reprogramado" },
      ]}
    />
  );
}
