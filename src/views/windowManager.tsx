import { useEffect } from "react";
import { useProcessStore } from "../store/processStore";
import { useWindowStore } from "../store/windowStore";
import Terminal from "../apps/terminal/Terminal";
import Notes from "../apps/notes/Notes";

export default function WindowManager() {
    const { processes, killApp } = useProcessStore();
    const { windows, registerWindow, unregisterWindow, bringToFront, moveWindow } =
    useWindowStore();

    useEffect(() => {
        // add window TIAP process muncul
        processes.forEach((p) => {
            if (!windows.find((w) => w.pid === p.pid)) registerWindow(p.pid);
        });
        // apus klo ad process yg DITUTUP
        windows.forEach((w) => {
            if (!processes.find((p) => p.pid === w.pid)) unregisterWindow(w.pid);
        });
    }, [processes]);

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

    const startDrag = (e: React.MouseEvent, pid: number) => {
        e.stopPropagation();
        bringToFront(pid);
        const win = windows.find((w) => w.pid === pid);
        if (!win) return;

        const startX = e.clientX - win.x;
        const startY = e.clientY - win.y;

        const handleMove = (ev: MouseEvent) => {
            moveWindow(pid, ev.clientX - startX, ev.clientY - startY);
        };

        const handleUp = () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleUp);
        };

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleUp);
    };

    return (
        <>
            {processes.map((proc: any) => {
                const meta = windows.find((w: any) => w.pid === proc.pid);
                if (!meta) return null;

                return (
                <div key={proc.pid} onMouseDown={() => bringToFront(proc.pid)} style={{ position: "absolute", top: meta.y, left: meta.x, width: 600, height: 400, backgroundColor: "#222", border: "1px solid #333", borderRadius: 6, color: "#fff", padding: 0, zIndex: meta.z, boxShadow: "0 0 8px #0008", }} >
                    <div onMouseDown={(e) => startDrag(e, proc.pid)} style={{ height: 28, background: "#111", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", cursor: "grab", borderTopLeftRadius: 6, borderTopRightRadius: 6 }} >
                        <span style={{ userSelect: "none" }}>
                            {proc.name} — PID {proc.pid}
                        </span>

                        <button onClick={() => killApp(proc.pid)}>X</button>
                    </div>

                    <div style={{ height: "calc(100% - 28px)", padding: 10 }}>
                        {renderApp(proc.name)}
                    </div>
                </div>
                );
            })}
        </>
    );
}
