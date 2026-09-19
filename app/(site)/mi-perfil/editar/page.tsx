import { ScreenStub } from "@/components/layout/ScreenStub";

export default function EditarPerfilPage() {
  return (
    <ScreenStub
      number="35"
      name="Editar perfil"
      group="G"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi perfil", href: "/mi-perfil" },
        { label: "Editar" },
      ]}
    />
  );
}
