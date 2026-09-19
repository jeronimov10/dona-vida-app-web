import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ElegibilidadPage() {
  return (
    <ScreenStub
      number="15"
      name="Verificar elegibilidad"
      group="D"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Elegibilidad" },
      ]}
    />
  );
}
