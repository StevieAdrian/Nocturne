import { useEffect } from "react";
import { useSystemStore } from "./store";
import { eventBus } from "./core/kernel/eventBus";
import WindowManager from "./views/windowManager";
import Taskbar from "./views/taskbar";

function App() {
  const { booted, boot, log } = useSystemStore();

  useEffect(() => {
    if (!booted) return;
  
    const unsubSpawn = eventBus.subscribe("process:spawn", (i) =>
      log(`Process started: ${i.name} (PID ${i.pid})`)
    );
    const unsubKill = eventBus.subscribe("process:kill", (i) =>
      log(`Process stopped: ${i.name}`)
    );
  
    return () => {
      unsubSpawn();
      unsubKill();
    };
  }, [booted]);

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h1>Nocturne OS</h1>
      {!booted ? (
        <button onClick={boot}>Boot System</button>
      ) : (
        <>
          <WindowManager />
          <Taskbar />
        </>
      )}
    </div>
  );
}

export default App;