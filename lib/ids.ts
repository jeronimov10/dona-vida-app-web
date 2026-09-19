/** Código de turno estilo "DV-2026-0148", como el que muestra el PDF. */
export function generateTurnoCode(date = new Date()): string {
  const year = date.getFullYear();
  const sequence = Math.floor(Math.random() * 9000 + 1000);
  return `DV-${year}-${sequence}`;
}
