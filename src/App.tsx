import { useEffect } from "react";
import { useSystemStore } from "./store";
import { eventBus } from "./core/kernel/eventBus";
import WindowManager from "./views/windowManager";

function App() {
  const { booted, boot, log } = useSystemStore();

  useEffect(() => {
    if (booted) {
      // tes subscribe ke event proses, to be removed
      eventBus.subscribe("process:spawn", (i) =>
        log(`Process started: ${i.name} (PID ${i.pid})`)
      );
      eventBus.subscribe("process:kill", (i) =>
        log(`Process stopped: ${i.name}`)
      );
    }
  }, [booted]);

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h1>Nocturne OS</h1>
      {!booted ? (
        <button onClick={boot}>Boot System</button>
      ) : (
        <>
          <p>System booted successfully.</p>
          <WindowManager />
        </>
      )}
    </div>
  );
}

export default App;