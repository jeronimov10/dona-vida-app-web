"use client";

import { useParams } from "next/navigation";
import { ScreenStub } from "@/components/layout/ScreenStub";

export default function DetallePuntoPage() {
  const params = useParams<{ id: string }>();

  return (
    <ScreenStub
      number="13"
      name={`Detalle del punto (${params.id})`}
      group="C"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Detalle del punto" },
      ]}
    />
  );
}
