import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ProximaFechaPage() {
  return (
    <ScreenStub
      number="31"
      name="Próxima fecha disponible"
      group="F"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
        { label: "Próxima fecha" },
      ]}
    />
  );
}
