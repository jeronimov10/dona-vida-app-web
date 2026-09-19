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

interface AppState {
  session: Session;
  profile: DonorProfile;
  donations: DonationRecord[];
  turno: Turno | null;
  bookingDraft: BookingDraft;
  reminderActive: boolean;
  notificationPrefs: NotificationPrefs;
  recentSearches: RecentSearch[];
  /** Resultado del último envío del cuestionario de la pantalla 15. */
  lastEligibilityCheckPassed: boolean | null;

  login: (email: string) => void;
  logout: () => void;
  registerAccount: (data: { name: string; email: string; phone: string }) => void;
  updateProfile: (partial: Partial<DonorProfile>) => (keyof DonorProfile)[];

  setBookingDraft: (partial: BookingDraft) => void;
  clearBookingDraft: () => void;

  submitEligibilityCheck: (allChecked: boolean) => boolean;

  confirmTurno: (turno: Omit<Turno, "code" | "reprogramCount">) => Turno;
  cancelTurno: () => void;
  reprogramTurno: (
    newDateISO: string,
    newTime: string,
  ) => { beforeDateISO: string; beforeTime: string };

  setReminderActive: (active: boolean) => void;
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
      notificationPrefs: SEED_NOTIFICATION_PREFS,
      recentSearches: SEED_RECENT_SEARCHES,
      lastEligibilityCheckPassed: null,

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
        const changedFields = (Object.keys(partial) as (keyof DonorProfile)[]).filter(
          (key) => partial[key] !== undefined && partial[key] !== before[key],
        );
        set({ profile: { ...before, ...partial } });
        return changedFields;
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

      cancelTurno: () => set({ turno: null }),

      reprogramTurno: (newDateISO, newTime) => {
        const current = get().turno;
        const beforeDateISO = current?.dateISO ?? newDateISO;
        const beforeTime = current?.time ?? newTime;
        if (current) {
          set({
            turno: {
              ...current,
              dateISO: newDateISO,
              time: newTime,
              reprogramCount: current.reprogramCount + 1,
            },
          });
        }
        return { beforeDateISO, beforeTime };
      },

      setReminderActive: (active) => set({ reminderActive: active }),

      setNotificationPrefs: (partial) =>
        set((state) => ({
          notificationPrefs: { ...state.notificationPrefs, ...partial },
        })),

      addRecentSearch: (search) =>
        set((state) => ({ recentSearches: [search, ...state.recentSearches] })),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "dona-vida-store",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
