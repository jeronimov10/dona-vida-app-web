import { ScreenStub } from "@/components/layout/ScreenStub";

export default function CambiosGuardadosPage() {
  return (
    <ScreenStub
      number="36"
      name="Cambios guardados"
      group="G"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi perfil", href: "/mi-perfil" },
        { label: "Guardado" },
      ]}
    />
  );
}
