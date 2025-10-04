import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { MCPServer } from "./schemas";

export function exportMCPSettings(
  obj: MCPServer,
  pathfromhomedir: string = ".mcp-manager.json",
) {
  const filePath = join(homedir(), pathfromhomedir);
  const formatterJson = JSON.stringify(obj, null, 2);
  writeFileSync(filePath, formatterJson);
}
