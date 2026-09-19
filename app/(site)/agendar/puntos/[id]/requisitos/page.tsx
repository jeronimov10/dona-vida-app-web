"use client";

import { useParams } from "next/navigation";
import { ScreenStub } from "@/components/layout/ScreenStub";

export default function RequisitosPuntoPage() {
  const params = useParams<{ id: string }>();

  return (
    <ScreenStub
      number="14"
      name={`Requisitos del punto (${params.id})`}
      group="C"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Agendar donación", href: "/agendar" },
        { label: "Requisitos" },
      ]}
    />
  );
}
