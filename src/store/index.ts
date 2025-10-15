import { create } from "zustand";

interface SystemState {
    booted: boolean;
    bootLog: string[];
    boot: () => void;
    log: (msg: string) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
    booted: false,
    bootLog: [],
    boot: () =>
        set((state) => ({
            booted: true,
            bootLog: [...state.bootLog, "Nocturne OS kernel initialized."],
        })),
    log: (msg) =>
        set((state) => ({
            bootLog: [...state.bootLog, msg],
        })),
}));
