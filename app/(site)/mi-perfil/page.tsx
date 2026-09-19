import { ScreenStub } from "@/components/layout/ScreenStub";

export default function MiPerfilPage() {
  return (
    <ScreenStub
      number="34"
      name="Mi perfil"
      group="G"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Mi perfil" }]}
    />
  );
}
