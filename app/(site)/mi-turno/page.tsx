import { ScreenStub } from "@/components/layout/ScreenStub";

export default function MiTurnoPage() {
  return (
    <ScreenStub
      number="24/25"
      name="Mi turno / Sin turnos programados"
      group="E"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Mi turno" }]}
    />
  );
}
