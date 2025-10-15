export type NodeType = "file" | "dir";

export interface VNode {
    id: string;
    name: string;
    type: NodeType;
    content?: string;
    children?: VNode[];
}
