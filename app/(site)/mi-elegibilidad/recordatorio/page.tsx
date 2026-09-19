import { ScreenStub } from "@/components/layout/ScreenStub";

export default function RecordatorioPage() {
  return (
    <ScreenStub
      number="33"
      name="Recordatorio activado"
      group="F"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
        { label: "Recordatorio" },
      ]}
    />
  );
}
