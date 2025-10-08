import { readFileSync, writeFileSync } from "node:fs";
import { ConfigSchema, type Config } from "./schemas";
import { validateConfig } from "./validate";
import { homedir } from "node:os";
import { join } from "node:path";

export function importMCPSettings(filePath: string = ".mcp-manager.json") {
  const jsonString = readFileSync(filePath, "utf8");
  const obj: Config = JSON.parse(jsonString);

  const result = ConfigSchema.safeParse(obj);
  validateConfig(result);

  return result.data;
}

export function exportMCPSettings(
  obj: Config,
  pathfromhomedir: string = ".mcp-manager.json",
) {
  const result = ConfigSchema.safeParse(obj);

  validateConfig(result);

  const formatterJson = JSON.stringify(result.data, null, 2);
  writeFileSync(pathfromhomedir, formatterJson);
}

const APP_PATHS: Record<string, string> = {
  "claude-code": ".claude.json",
  "gemini-cli": ".gemini/settings.json",
  "claude-desktop":
    "Library/Application Support/Claude/claude_desktop_config.json",
};

const DEFAULT_PATH = ".mcp-manager.json";

export function getPathFromAppName(app: string = ""): string {
  let appPath = APP_PATHS[app];

  if (app === "") {
    appPath = DEFAULT_PATH;
  } else if (!(app in APP_PATHS) || !appPath) {
    throw new Error("無効なクライアント名です");
  }

  const path = appPath;

  return join(homedir(), path);
}
