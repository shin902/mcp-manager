import { homedir } from "node:os";
import { join } from "node:path";

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
