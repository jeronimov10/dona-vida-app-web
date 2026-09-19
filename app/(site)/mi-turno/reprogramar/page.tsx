import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ReprogramarTurnoPage() {
  return (
    <ScreenStub
      number="26"
      name="Reprogramar turno"
      group="E"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi turno", href: "/mi-turno" },
        { label: "Reprogramar" },
      ]}
    />
  );
}
