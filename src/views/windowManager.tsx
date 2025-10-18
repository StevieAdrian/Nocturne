import { useProcessStore } from "../store/processStore";
import Terminal from "../apps/terminal/Terminal";
import Notes from "../apps/notes/Notes";

export default function WindowManager() {
    const { processes, killApp } = useProcessStore();

    const renderApp = (name: string) => {
        switch (name) {
        case "Terminal":
            return <Terminal />;
        case "Notes":
            return <Notes />;
        default:
            return <div>Unknown app: {name}</div>;
        }
    };

    return (
        <>
            {processes.map((proc, index) => (
                <div key={proc.pid} style={{ position: "absolute", top: 80 + index * 40, left: 100 + index * 40, width: 600, height: 400, backgroundColor: "#222", border: "1px solid #333", borderRadius: 6, color: "#fff", padding: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, borderBottom: "1px solid #444", }} >
                        <span>
                            {proc.name} — PID {proc.pid}
                        </span>
                        <button onClick={() => killApp(proc.pid)}>X</button>
                    </div>
                    {renderApp(proc.name)}
                </div>
            ))}
        </>
    );
}
