import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { ConfigSchema, type Config } from "./schemas";
import { validateConfig } from "./validate";

export function exportMCPSettings(
  obj: Config,
  pathfromhomedir: string = ".mcp-manager.json",
) {
  const result = ConfigSchema.safeParse(obj);

  validateConfig(result);

  const filePath = join(homedir(), pathfromhomedir);
  const formatterJson = JSON.stringify(result.data, null, 2);
  writeFileSync(filePath, formatterJson);
}
