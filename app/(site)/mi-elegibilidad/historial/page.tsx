"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";
import { formatDateLong, formatThousands } from "@/lib/format";
import {
  IconGotaOutline,
} from "@/components/icons";

const TABS = ["Donaciones", "Todos los turnos"];

export default function HistorialPage() {
  const donations = useAppStore((s) => s.donations);
  const turno = useAppStore((s) => s.turno);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [page, setPage] = useState(1);

  const completed = donations.filter((d) => d.status === "Completada");
  const totalMl = completed.reduce((sum, d) => sum + (d.volumeMl ?? 0), 0);

  const rows =
    activeTab === "Donaciones"
      ? donations.map((d) => [
          formatDateLong(d.dateISO),
          d.point,
          d.volumeMl ? `${d.volumeMl} ml` : "—",
          d.status,
        ])
      : [
          ...(turno
            ? [[formatDateLong(turno.dateISO), turno.pointName, "—", "Programada"]]
            : []),
          ...donations.map((d) => [
            formatDateLong(d.dateISO),
            d.point,
            d.volumeMl ? `${d.volumeMl} ml` : "—",
            d.status,
          ]),
        ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
          { label: "Historial" },
        ]}
      />
      <PageHeader title="Historial de donaciones" body="Todas tus donaciones y turnos registrados." />
      <Container className="flex flex-col gap-6 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
            <p className="text-h2 my-4">
              {activeTab === "Donaciones" ? "Tus donaciones registradas" : "Todos tus turnos"}
            </p>
            <Table columns={["Fecha", "Punto de donación", "Volumen", "Estado"]} rows={rows} />
          </div>
          <StatCard
            icon={IconGotaOutline}
            label="Total donado"
            value={`${formatThousands(totalMl)} ml`}
            caption={`En ${completed.length} donaciones completadas`}
          />
        </div>

        <Pagination
          currentPage={page}
          totalPages={3}
          onPageChange={setPage}
          rangeLabel={`1–${rows.length} de 24`}
        />

        <InfoNote>
          Cada donación de 450 ml puede ayudar hasta a tres personas
          distintas.
        </InfoNote>
      </Container>
    </>
  );
}
