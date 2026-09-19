"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Container } from "@/components/layout/Container";
import { SearchField } from "@/components/ui/SearchField";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { Table } from "@/components/ui/Table";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";

export default function AgendarPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const recentSearches = useAppStore((s) => s.recentSearches);
  const clearRecentSearches = useAppStore((s) => s.clearRecentSearches);
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);

  function goToResults(location: string) {
    addRecentSearch({
      location,
      pointsNear: 4,
      lastSearched: "Justo ahora",
      avgDistanceKm: 2.4,
    });
    router.push("/agendar/resultados");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    goToResults(query || "Bogotá · Chapinero");
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Agendar donación" }]} />
      <PageHeader title="Buscar punto de donación" body="Encuentra el punto habilitado más cercano a ti." />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={1} total={4} label="Ubicación" />

        <form onSubmit={handleSubmit} className="flex max-w-[600px] gap-3">
          <SearchField
            placeholder="Buscar ciudad, barrio o dirección"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            containerClassName="flex-1"
          />
          <Button type="submit">Buscar</Button>
        </form>

        <div>
          <SectionHeader
            title="Búsquedas recientes"
            action={{ label: "Borrar historial", onClick: clearRecentSearches }}
          />
          <Table
            columns={["Ubicación", "Puntos cerca", "Última búsqueda", "Distancia media"]}
            rows={recentSearches.map((s) => [
              s.location,
              String(s.pointsNear),
              s.lastSearched,
              `${s.avgDistanceKm} km`,
            ])}
          />
        </div>

        <Button variant="secondary" onClick={() => goToResults("Tu ubicación actual")} className="w-fit">
          Usar mi ubicación actual
        </Button>

        <InfoNote>
          Solo mostramos puntos habilitados por la Red Nacional de Bancos de
          Sangre.
        </InfoNote>
      </Container>
    </>
  );
}
