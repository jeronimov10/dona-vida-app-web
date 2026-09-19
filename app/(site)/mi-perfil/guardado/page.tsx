"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatDateTimeLong } from "@/lib/format";

export default function CambiosGuardadosPage() {
  const changedAt = useAppStore((s) => s.lastProfileChangeAt);
  const changes = useAppStore((s) => s.lastProfileChangeFields);

  const timestampLabel = changedAt ? formatDateTimeLong(new Date(changedAt)) : formatDateTimeLong(new Date());

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi perfil", href: "/mi-perfil" },
          { label: "Guardado" },
        ]}
      />
      <PageHeader title="Perfil actualizado" body="Tus datos quedaron guardados correctamente." />
      <Container className="flex flex-col gap-6 pb-16">
        <Banner title="Cambios guardados">
          Actualizamos tu perfil el {timestampLabel}.
        </Banner>

        {changes.length > 0 ? (
          <div>
            <p className="text-h2 mb-4">Cambios aplicados</p>
            <Table
              columns={["Dato", "Antes", "Ahora", "Estado"]}
              rows={changes.map((c) => [c.field, c.before, c.after, "Actualizado"])}
            />
          </div>
        ) : (
          <InfoNote>No se detectaron cambios en esta edición.</InfoNote>
        )}

        <InfoNote>
          Los cambios de ciudad actualizan los puntos de donación que te
          mostramos.
        </InfoNote>

        <Button href="/mi-perfil">Volver a mi perfil</Button>
      </Container>
    </>
  );
}
