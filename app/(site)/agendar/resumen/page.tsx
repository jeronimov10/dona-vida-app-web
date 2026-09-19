import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ResumenTurnoPage() {
  return (
    <ScreenStub
      number="21"
      name="Resumen del turno"
      group="D"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Resumen" },
      ]}
    />
  );
}
