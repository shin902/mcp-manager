import { writeFileSync } from "node:fs";
import { ConfigSchema, type Config } from "./schemas";
import { validateConfig } from "./validate";

export function exportMCPSettings(
  obj: Config,
  pathfromhomedir: string = ".mcp-manager.json",
) {
  const result = ConfigSchema.safeParse(obj);

  validateConfig(result);

  const formatterJson = JSON.stringify(result.data, null, 2);
  writeFileSync(pathfromhomedir, formatterJson);
}
