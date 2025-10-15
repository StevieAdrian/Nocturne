import type { Process } from "../../types/process";
import { eventBus } from "./eventBus";

let pidCounter = 1;
const processes = new Map<number, Process>();

export const processManager = {
    spawn(name: string): Process {
        const proc: Process = {
            pid: pidCounter++,
            name,
            status: "running",
        };
        processes.set(proc.pid, proc);
        eventBus.publish("process:spawn", proc);
        return proc;
    },

    kill(pid: number) {
        const proc = processes.get(pid);
        if (!proc) return;
        proc.status = "stopped";
        processes.delete(pid);
        eventBus.publish("process:kill", proc);
    },

    list(): Process[] {
        return Array.from(processes.values());
    },
};
