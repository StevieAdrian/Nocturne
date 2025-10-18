import { useState } from "react";
import { vfs } from "../../core/vfs/vfs";

export default function Terminal() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string[]>([]);

    const runCommand = (cmd: string) => {
        const [command, ...args] = cmd.split(" ");
        let result = "";

        try {
            switch (command) {
                case "ls":
                    result = vfs.ls(args[0] || "/").join("  ");
                    break;
                case "cat":
                    result = vfs.cat(args[0]);
                    break;
                case "mkdir":
                    vfs.mkdir(args[0]);
                    result = `Created directory ${args[0]}`;
                    break;
                case "echo":
                    result = args.join(" ");
                    break;
                default:
                    result = `Command not found: ${command}`;
            }
        } catch (e: any) {
            result = `Error: ${e.message}`;
        }

        setOutput((prev) => [...prev, `$ ${cmd}`, result]);
    };

    return (
        <div style={{ fontFamily: "monospace", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, overflowY: "auto", marginBottom: 5 }}>
                {output.map((line, i) => (
                <div key={i}>{line}</div>
                ))}
            </div>
            <input value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => { 
                    if (e.key === "Enter") {
                        runCommand(input);
                        setInput("");
                    }
                }}
                style={{ background: "#111", color: "#0f0", border: "none", padding: 6 }} placeholder="Type a command..."
            />
        </div>
    );
}
