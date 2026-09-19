import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getEligibility } from "./eligibility";
import { generateTurnoCode } from "./ids";
import {
  createSeedDonations,
  createSeedProfile,
  SEED_NOTIFICATION_PREFS,
  SEED_RECENT_SEARCHES,
} from "./seed";
import type {
  BookingDraft,
  DonationRecord,
  DonorProfile,
  NotificationPrefs,
  RecentSearch,
  Turno,
} from "./types";

interface Session {
  isLoggedIn: boolean;
  email: string | null;
}

export interface ProfileFieldChange {
  field: string;
  before: string;
  after: string;
}

const PROFILE_FIELD_LABELS: Partial<Record<keyof DonorProfile, string>> = {
  name: "Nombre",
  email: "Correo",
  phone: "Teléfono",
  city: "Ciudad",
  bloodType: "Tipo de sangre",
  weight: "Peso",
};

interface AppState {
  session: Session;
  profile: DonorProfile;
  donations: DonationRecord[];
  turno: Turno | null;
  bookingDraft: BookingDraft;
  reminderActive: boolean;
  urgentCampaignsOptIn: boolean;
  notificationPrefs: NotificationPrefs;
  recentSearches: RecentSearch[];
  /** Resultado del último envío del cuestionario de la pantalla 15. */
  lastEligibilityCheckPassed: boolean | null;
  /** Antes/después de la última reprogramación, para la pantalla 27. */
  lastReprogram: {
    beforeDateISO: string;
    beforeTime: string;
    afterDateISO: string;
    afterTime: string;
  } | null;
  /** Snapshot del turno justo antes de cancelarlo, para la pantalla 29. */
  lastCancelledTurno: Turno | null;
  /** Diferencias de la última edición de perfil, para la pantalla 36. */
  lastProfileChangeAt: number | null;
  lastProfileChangeFields: ProfileFieldChange[];

  login: (email: string) => void;
  logout: () => void;
  registerAccount: (data: { name: string; email: string; phone: string }) => void;
  updateProfile: (partial: Partial<DonorProfile>) => void;

  setBookingDraft: (partial: BookingDraft) => void;
  clearBookingDraft: () => void;

  submitEligibilityCheck: (allChecked: boolean) => boolean;

  confirmTurno: (turno: Omit<Turno, "code" | "reprogramCount">) => Turno;
  cancelTurno: () => void;
  reprogramTurno: (newDateISO: string, newTime: string) => void;

  setReminderActive: (active: boolean) => void;
  setUrgentCampaignsOptIn: (value: boolean) => void;
  setNotificationPrefs: (partial: Partial<NotificationPrefs>) => void;

  addRecentSearch: (search: RecentSearch) => void;
  clearRecentSearches: () => void;
}

const seedProfile = createSeedProfile();

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      session: { isLoggedIn: true, email: seedProfile.email },
      profile: seedProfile,
      donations: createSeedDonations(seedProfile),
      turno: null,
      bookingDraft: {},
      reminderActive: false,
      urgentCampaignsOptIn: false,
      notificationPrefs: SEED_NOTIFICATION_PREFS,
      recentSearches: SEED_RECENT_SEARCHES,
      lastEligibilityCheckPassed: null,
      lastReprogram: null,
      lastCancelledTurno: null,
      lastProfileChangeAt: null,
      lastProfileChangeFields: [],

      login: (email) => set({ session: { isLoggedIn: true, email } }),

      logout: () =>
        set((state) => ({ session: { ...state.session, isLoggedIn: false } })),

      registerAccount: ({ name, email, phone }) =>
        set((state) => ({
          session: { isLoggedIn: true, email },
          profile: { ...state.profile, name, email, phone },
        })),

      updateProfile: (partial) => {
        const before = get().profile;
        const changes: ProfileFieldChange[] = (
          Object.keys(partial) as (keyof DonorProfile)[]
        )
          .filter((key) => partial[key] !== undefined && partial[key] !== before[key])
          .map((key) => ({
            field: PROFILE_FIELD_LABELS[key] ?? key,
            before: String(before[key]),
            after: String(partial[key]),
          }));

        set({
          profile: { ...before, ...partial },
          lastProfileChangeAt: Date.now(),
          lastProfileChangeFields: changes,
        });
      },

      setBookingDraft: (partial) =>
        set((state) => ({ bookingDraft: { ...state.bookingDraft, ...partial } })),

      clearBookingDraft: () => set({ bookingDraft: {} }),

      submitEligibilityCheck: (allChecked) => {
        const eligibility = getEligibility(get().profile.lastDonationDateISO);
        const passed = allChecked && eligibility.isEligible;
        set({ lastEligibilityCheckPassed: passed });
        return passed;
      },

      confirmTurno: (turno) => {
        const fullTurno: Turno = {
          ...turno,
          code: generateTurnoCode(),
          reprogramCount: 0,
        };
        set({ turno: fullTurno, bookingDraft: {} });
        return fullTurno;
      },

      cancelTurno: () =>
        set((state) => ({ turno: null, lastCancelledTurno: state.turno })),

      reprogramTurno: (newDateISO, newTime) => {
        const current = get().turno;
        if (!current) return;
        set({
          turno: {
            ...current,
            dateISO: newDateISO,
            time: newTime,
            reprogramCount: current.reprogramCount + 1,
          },
          lastReprogram: {
            beforeDateISO: current.dateISO,
            beforeTime: current.time,
            afterDateISO: newDateISO,
            afterTime: newTime,
          },
        });
      },

      setReminderActive: (active) => set({ reminderActive: active }),

      setUrgentCampaignsOptIn: (value) => set({ urgentCampaignsOptIn: value }),

      setNotificationPrefs: (partial) =>
        set((state) => ({
          notificationPrefs: { ...state.notificationPrefs, ...partial },
        })),

      addRecentSearch: (search) =>
        set((state) => ({ recentSearches: [search, ...state.recentSearches] })),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      // v2: el modelo de datos creció durante el desarrollo (turno,
      // reprogramaciones, cambios de perfil, etc.). Un valor guardado con
      // una versión anterior del esquema (de una visita hecha mientras se
      // construía la app) puede no tener campos que el código actual da
      // por sentado (p. ej. `profile.birthdateISO`), y provocaría un error
      // al leerlos. Cambiar la llave de almacenamiento hace que cualquier
      // dato viejo se ignore en vez de romper la app; `merge` además evita
      // que un objeto guardado incompleto borre valores por defecto.
      name: "dona-vida-store-v2",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      merge: (persisted, current) => {
        const saved = (persisted as Partial<AppState>) ?? {};
        return {
          ...current,
          ...saved,
          session: { ...current.session, ...saved.session },
          profile: { ...current.profile, ...saved.profile },
          notificationPrefs: {
            ...current.notificationPrefs,
            ...saved.notificationPrefs,
          },
          bookingDraft: { ...current.bookingDraft, ...saved.bookingDraft },
        };
      },
    },
  ),
);
