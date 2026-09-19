const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const MONTHS_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const WEEKDAYS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "2026-09-19" -> Date a medianoche local, evitando líos de zona horaria. */
export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function diffInDays(fromIso: string, toIso: string): number {
  const from = parseISODate(fromIso);
  const to = parseISODate(toIso);
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function todayISO(): string {
  return toISODate(new Date());
}

/** "15 de junio de 2024" */
export function formatDateLong(iso: string): string {
  const date = parseISODate(iso);
  return `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
}

/** "Lunes 8 de septiembre de 2026" */
export function formatDateWithWeekday(iso: string): string {
  const date = parseISODate(iso);
  const weekday = capitalize(WEEKDAYS[date.getDay()]);
  return `${weekday} ${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
}

/** "8 sep" */
export function formatDateShort(iso: string): string {
  const date = parseISODate(iso);
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

/** "15 jun 2024" */
export function formatDateShortYear(iso: string): string {
  const date = parseISODate(iso);
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

/** "lunes 8 de septiembre" (minúscula, sin año) */
export function formatDateWeekdayNoYear(iso: string): string {
  const date = parseISODate(iso);
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}

/** "Lunes 8 de septiembre" (con mayúscula inicial, sin año) */
export function formatDateWeekdayNoYearCap(iso: string): string {
  return capitalize(formatDateWeekdayNoYear(iso));
}

/** Edad en años cumplidos a partir de una fecha de nacimiento ISO. */
export function calculateAge(birthdateISO: string): number {
  const birth = parseISODate(birthdateISO);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

/** "1.350" (separador de miles al estilo es-CO) */
export function formatThousands(value: number): string {
  return value.toLocaleString("es-CO");
}

/** "marzo de 2024" */
export function formatMonthYear(iso: string): string {
  const date = parseISODate(iso);
  return `${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
}

/** "6 de septiembre de 2026 a las 9:41 a. m." */
export function formatDateTimeLong(date: Date): string {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const suffix = hours >= 12 ? "p. m." : "a. m.";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${formatDateLong(toISODate(date))} a las ${hours}:${minutes} ${suffix}`;
}
