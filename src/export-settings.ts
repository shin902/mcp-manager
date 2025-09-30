import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export function exportMCPSettings(
    obj: any,
    pathfromhomedir: string = ".mcp-manager.json",
) {
    const filePath = join(homedir(), pathfromhomedir);
    if (!("mcpServers" in obj)) {
        throw new Error("mcpServersが存在しません");
    }
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        throw new Error("無効なJSON形式");
    }
    const formatterJson = JSON.stringify(obj, null, 2);
    writeFileSync(filePath, formatterJson);
}
