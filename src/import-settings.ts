import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const filePath = join(homedir(), ".mcp-manager.json");
if (!existsSync(filePath)) {
  throw new Error("ファイルが存在しません");
}
const jsonString = readFileSync(filePath, "utf8");
if (!("mcpServers" in JSON.parse(jsonString))) {
  throw new Error("mcpServersが存在しません");
}
export const obj = JSON.parse(jsonString);
