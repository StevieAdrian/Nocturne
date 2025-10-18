import { useState } from "react";
import { vfs } from "../../core/vfs/vfs";

export default function Notes() {
    const [path, setPath] = useState("/home/note.txt");
    const [content, setContent] = useState("");

    const loadNote = () => {
        try {
            const text = vfs.cat(path);
            setContent(text);
        } catch {
            setContent("// New file");
        }
    };


    const saveNote = () => {
        vfs.write(path, content);
        alert(`Saved to ${path}`);
    };

    return (
        <div style={{ fontFamily: "monospace", display: "flex", flexDirection: "column", height: "100%" }} >
            <div style={{ marginBottom: 8 }}>
                <input value={path} onChange={(e) => setPath(e.target.value)} style={{ background: "#111", color: "#0f0", border: "none", padding: "4px 6px", width: "70%",}}/>
                <button onClick={loadNote}>Open</button>
                <button onClick={saveNote}>Save</button>
            </div>

            <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ flex: 1, background: "#000", color: "#0f0", border: "none", padding: 10, resize: "none", fontFamily: "monospace" }}/>
        </div>
    );
}
