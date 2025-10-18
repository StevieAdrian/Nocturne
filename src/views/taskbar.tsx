import { useProcessStore } from "../store/processStore";

export default function Taskbar() {
    const { processes, spawnApp } = useProcessStore();

    return (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 40, backgroundColor: "#111", color: "#0f0", display: "flex", alignItems: "center", padding: "0 10px", gap: "10px", borderTop: "1px solid #333" }}>
            <button onClick={() => spawnApp("Terminal")}>Terminal</button>
            <button onClick={() => spawnApp("Notes")}>Notes</button>
            <span style={{ marginLeft: "auto", opacity: 0.6 }}>
                {processes.length} app(s) running
            </span>
        </div>
    );
}
