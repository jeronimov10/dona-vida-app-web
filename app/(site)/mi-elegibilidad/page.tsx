import { ScreenStub } from "@/components/layout/ScreenStub";

export default function MiElegibilidadPage() {
  return (
    <ScreenStub
      number="30"
      name="Mi elegibilidad"
      group="F"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Mi elegibilidad" }]}
    />
  );
}
