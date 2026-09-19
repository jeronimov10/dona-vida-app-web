"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Stepper } from "@/components/ui/Stepper";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { useAppStore } from "@/lib/store";

const QUESTIONS = [
  "Tengo entre 18 y 65 años",
  "Peso más de 50 kg",
  "Mi última donación fue hace más de 90 días",
  "Sin fiebre ni gripa en los últimos 7 días",
  "No estoy tomando antibióticos",
  "Sin tatuajes en los últimos 6 meses",
];

export default function ElegibilidadPage() {
  const router = useRouter();
  const submitEligibilityCheck = useAppStore((s) => s.submitEligibilityCheck);
  const [answers, setAnswers] = useState<boolean[]>(Array(QUESTIONS.length).fill(false));

  function toggle(index: number) {
    setAnswers((current) => current.map((value, i) => (i === index ? !value : value)));
  }

  function handleVerify() {
    submitEligibilityCheck(answers.every(Boolean));
    router.push("/agendar/elegibilidad/resultado");
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar donación", href: "/agendar" },
          { label: "Elegibilidad" },
        ]}
      />
      <PageHeader title="Verifica si puedes donar hoy" body="Seis preguntas rápidas. Tus respuestas son confidenciales." />
      <Container className="flex flex-col gap-6 pb-16">
        <Stepper step={3} total={4} label="Elegibilidad" />

        <div>
          <p className="text-h2 mb-4">Cuestionario</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {QUESTIONS.map((question, index) => (
              <Checkbox
                key={question}
                label={question}
                checked={answers[index]}
                onChange={() => toggle(index)}
              />
            ))}
          </div>
        </div>

        <InfoNote>
          Un profesional repetirá esta verificación el día de la donación, en
          el punto.
        </InfoNote>

        <div className="flex gap-4">
          <Button onClick={handleVerify}>Verificar</Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Volver
          </Button>
        </div>
      </Container>
    </>
  );
}
