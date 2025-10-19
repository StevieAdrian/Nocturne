import { create } from "zustand";

interface WindowMeta {
    pid: number;
    x: number;
    y: number;
    z: number;
}

interface WindowState {
    windows: WindowMeta[];
    bringToFront: (pid: number) => void;
    moveWindow: (pid: number, x: number, y: number) => void;
    registerWindow: (pid: number) => void;
    unregisterWindow: (pid: number) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
    windows: [],
    bringToFront: (pid) =>
        set((state) => {
            const maxZ = Math.max(0, ...state.windows.map((w) => w.z)) + 1;
            return {
                windows: state.windows.map((w) =>
                    w.pid === pid ? { ...w, z: maxZ } : w
                ),
            };
        }),

    moveWindow: (pid, x, y) =>
        set((state) => ({
            windows: state.windows.map((w) =>
                w.pid === pid ? { ...w, x, y } : w
            ),
        })),

    registerWindow: (pid) =>
        set((state) => ({
            windows: [
                ...state.windows,
                { pid, x: 100 + state.windows.length * 30, y: 80 + state.windows.length * 30, z: state.windows.length + 1 },
            ],
        })),

    unregisterWindow: (pid) =>
        set((state) => ({
            windows: state.windows.filter((w) => w.pid !== pid),
        })),
}));
