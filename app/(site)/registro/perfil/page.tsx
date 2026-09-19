import { ScreenStub } from "@/components/layout/ScreenStub";

export default function RegistroPerfilPage() {
  return (
    <ScreenStub
      number="03"
      name="Completar perfil de donante"
      group="A"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Crear cuenta", href: "/registro" },
        { label: "Perfil de donante" },
      ]}
    />
  );
}
