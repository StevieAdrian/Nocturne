import { useSystemStore } from "../store";
import Terminal from "../apps/terminal/Terminal";

export default function WindowManager() {
    const { booted } = useSystemStore();

    if (!booted) return null;

    // tes dummy
    const runningApps = [{ pid: 1, name: "Terminal", component: <Terminal /> }];

    return (
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a1a1a", color: "white", overflow: "hidden" }}>
            {runningApps.map((app) => (
                <div key={app.pid} style={{ position: "absolute", top: 100, left: 100, width: 600, height: 400, backgroundColor: "#222", border: "1px solid #333", borderRadius: 6, boxShadow: "0 0 10px #0008", padding: 10 }}>
                    <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                        {app.name} — PID {app.pid}
                    </div>
                    {app.component}
                </div>
            ))}
        </div>
    );
}
