import type { VNode } from "../../types/vfs";


export class VFS {
    private root: VNode = {
        id: "root",
        name: "/",
        type: "dir",
        children: [
        {
            id: crypto.randomUUID(),
            name: "home",
            type: "dir",
            children: [
            {
                id: crypto.randomUUID(),
                name: "readme.txt",
                type: "file",
                content: "Welcome to Nocturne!",
            },
            ],
        },
        ],
    };

    ls(path = "/"): string[] {
        const dir = this.findNode(path);

        if (!dir || dir.type !== "dir") throw new Error("Not a directory");
        
        return dir.children!.map((c) => c.name);
    }

    cat(path: string): string {
        const file = this.findNode(path);

        if (!file || file.type !== "file") throw new Error("File not found");

        return file.content || "";
    }

    write(path: string, content: string) {
        const file = this.findNode(path);

        if (file && file.type === "file") {
            file.content = content;
        } else {
            this.createFile(path, content);
        }
    }

    mkdir(path: string) {
        const parts = path.split("/").filter(Boolean);
        let curr = this.root;

        for (const part of parts) {
            let child = curr.children!.find((c) => c.name === part);
            if (!child) {
                child = { id: crypto.randomUUID(), name: part, type: "dir", children: [] };
                curr.children!.push(child);
            }
            curr = child;
        }
    }

    private findNode(path: string): VNode | null {
        const parts = path.split("/").filter(Boolean);
        let curr = this.root;

        for (const part of parts) {
            const next = curr.children?.find((c) => c.name === part);
            if (!next) return null;
            curr = next;
        }

        return curr;
    }

    private createFile(path: string, content = "") {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop()!;
        const dirPath = "/" + parts.join("/");
        const dir = this.findNode(dirPath);
        if (!dir || dir.type !== "dir") throw new Error("Invalid path");
        dir.children!.push({
            id: crypto.randomUUID(),
            name: fileName,
            type: "file",
            content,
        });
    }
}

export const vfs = new VFS();
