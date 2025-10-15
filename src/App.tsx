import { useEffect } from "react";
import { useSystemStore } from "./store";
import { processManager } from "./core/kernel/processManager";
import { eventBus } from "./core/kernel/eventBus";
import { vfs } from "./core/vfs/vfs";

function App() {
  const { booted, boot, bootLog, log } = useSystemStore();

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

  // tes simulasi task manager
  const handleStartApp = () => {
    const proc = processManager.spawn("Terminal");
    setTimeout(() => processManager.kill(proc.pid), 3000);
  };

  // tes file system nya work, kek cocmponentdidmount file system nya lah
  const handleVfsTest = () => {
    const files = vfs.ls("/home");
    console.log("Files in /home:", files);

    const content = vfs.cat("/home/readme.txt");
    console.log("readme.txt:", content);

    vfs.write("/home/newfile.txt", "Hello world nocturne");
    console.log("After write:", vfs.ls("/home"));
  };

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h1>Nocturne OS</h1>
      {!booted ? (
        <button onClick={boot}>Boot System</button>
      ) : (
        <>
          <p>System booted successfully.</p>
          <button onClick={handleStartApp}>Spawn Process</button>
          <div style={{ background: "#111", color: "green", padding: 10, marginTop: 10 }}>
            {bootLog.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </>
      )}

      <button onClick={handleVfsTest}>Test VFS</button>
    </div>
    
  );
}

export default App;