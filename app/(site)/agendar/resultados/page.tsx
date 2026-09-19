"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Stepper } from "@/components/ui/Stepper";
import { Chip } from "@/components/ui/Chip";
import { Table } from "@/components/ui/Table";
import { WideImage } from "@/components/ui/WideImage";
import { InfoNote } from "@/components/ui/InfoNote";
import { SEED_POINTS } from "@/lib/seed";

const FILTERS = ["Más cercano", "Abierto ahora", "Sin fila"];

export default function ResultadosPage() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortDesc, setSortDesc] = useState(false);

  function toggleFilter(filter: string) {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((f) => f !== filter) : [...current, filter],
    );
  }

  const points = useMemo(() => {
    const sorted = [...SEED_POINTS].sort((a, b) =>
      sortDesc ? b.distanceKm - a.distanceKm : a.distanceKm - b.distanceKm,
    );
    return sorted;
  }, [sortDesc]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Resultados" },
        ]}
      />
      <PageHeader title="4 puntos cerca de Chapinero" body="Ordenados por distancia desde tu ubicación." />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={1} total={4} label="Ubicación" />

        <div className="flex flex-wrap gap-3">
          {FILTERS.map((filter) => (
            <Chip key={filter} active={activeFilters.includes(filter)} onClick={() => toggleFilter(filter)}>
              {filter}
            </Chip>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeader
              title="Resultados de la búsqueda"
              action={{ label: "Ordenar por distancia", onClick: () => setSortDesc((v) => !v) }}
            />
            <Table
              columns={["Punto", "Dirección", "Distancia", "Horario"]}
              rows={points.map((p) => [
                p.name,
                p.address,
                `${p.distanceKm} km`,
                p.hoursStatus.split(" · ")[1] ?? p.hoursStatus,
              ])}
              onRowClick={(index) => router.push(`/agendar/puntos/${points[index].id}`)}
            />
          </div>
          <WideImage className="h-[280px]" label="Mapa de puntos de donación" />
        </div>

        <InfoNote>
          Los tiempos de espera son aproximados y se actualizan cada hora.
        </InfoNote>
      </Container>
    </>
  );
}
