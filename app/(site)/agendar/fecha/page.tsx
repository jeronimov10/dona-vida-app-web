import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ElegirFechaPage() {
  return (
    <ScreenStub
      number="18"
      name="Elegir fecha"
      group="D"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Fecha" },
      ]}
    />
  );
}
