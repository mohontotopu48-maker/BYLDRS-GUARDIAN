import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MemberSession {
  isVerified: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  passcode: string;
  activatedAt: string; // ISO timestamp
}

interface MemberStore extends MemberSession {
  /** True once Zustand has finished reading from localStorage */
  isHydrated: boolean;
  activate: (_data: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    passcode: string;
  }) => void;
  deactivate: () => void;
  getFullName: () => string;
}

const DEFAULT_SESSION: MemberSession = {
  isVerified: false,
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  passcode: "",
  activatedAt: "",
};

export const useMemberStore = create<MemberStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SESSION,
      isHydrated: false,

      activate: (data) => {
        set({
          isVerified: true,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          passcode: data.passcode,
          activatedAt: new Date().toISOString(),
        });
      },

      deactivate: () => {
        set(DEFAULT_SESSION);
      },

      getFullName: () => {
        const { firstName, lastName } = get();
        const parts = [firstName, lastName].filter(Boolean).join(" ").trim();
        return parts || "Guardian";
      },
    }),
    {
      name: "guardian-member-session", // localStorage key
      partialize: (state) => ({
        isVerified: state.isVerified,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        passcode: state.passcode,
        activatedAt: state.activatedAt,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error && state) {
            // Mark hydration complete — now safe to read isVerified
            state.isHydrated = true;
          }
          if (error) {
            console.warn("MemberStore rehydration error:", error);
          }
        };
      },
    }
  )
);
