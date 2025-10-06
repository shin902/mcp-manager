import { homedir } from "node:os";
import { join } from "node:path";

const APP_PATHS: Record<string, string> = {
	"claude-code": ".claude.json",
	"gemini-cli": ".gemini/settings.json",
	"claude-desktop":
		"Library/Application Support/Claude/claude_desktop_config.json",
};

const DEFAULT_PATH = join(homedir(), ".mcp-manager.json");

export function getPathFromAppName(app: string = ""): string {
	if (!app) {
		return DEFAULT_PATH;
	}

	const path = APP_PATHS[app];

	if (!path) {
		throw new Error("無効なアプリケーション名です");
	}

	return join(homedir(), path);
}
