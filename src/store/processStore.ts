import { create } from "zustand";
import type { Process } from "../types/process";
import { processManager } from "../core/kernel/processManager";
import { eventBus } from "../core/kernel/eventBus";

interface ProcessState {
    processes: Process[];
    spawnApp: (name: string) => void;
    killApp: (pid: number) => void;
}

export const useProcessStore = create<ProcessState>((set) => ({
    processes: [],

    spawnApp: (name) => {
        const proc = processManager.spawn(name);
        set((state) => ({ processes: [...state.processes, proc] }));
    },

    killApp: (pid) => {
        processManager.kill(pid);
        set((state) => ({
            processes: state.processes.filter((p) => p.pid !== pid),
        }));
    },
}));

// sync dr eventbus sub (jadiny store tetep update klo ada process yg berubah ditempat lain)
eventBus.subscribe("process:kill", (proc) => {
    useProcessStore.setState((state) => ({
        processes: state.processes.filter((p) => p.pid !== proc.pid),
    }));
});
