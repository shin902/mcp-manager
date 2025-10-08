import { readFileSync } from "node:fs";
import { ConfigSchema, type Config } from "./schemas";
import { validateConfig } from "./validate";

export function importMCPSettings(
  pathfromhomedir: string = ".mcp-manager.json",
) {
  const jsonString = readFileSync(pathfromhomedir, "utf8");
  const obj: Config = JSON.parse(jsonString);

  const result = ConfigSchema.safeParse(obj);
  validateConfig(result);

  return result.data;
}
