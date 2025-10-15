export interface Process {
    pid: number;
    name: string;
    status: "running" | "stopped";
}
