import { homedir } from "node:os";
import { join } from "node:path";

const APPS_PATHS: Record<string, string> = {
	"claude-code": ".claude.json",
	"gemini-cli": ".gemini/settings.json",
	"claude-desktop":
		"Library/Application Support/Claude/claude_desktop_config.json",
};

const DEFAULT_PATH = join(homedir(), ".mcp-manager.json");

export function getPathFromAppsName(apps: string = ""): string {
	if (!apps) {
		return DEFAULT_PATH;
	}

	const path = APPS_PATHS[apps];

	if (!path) {
		throw new Error("無効なアプリケーション名です");
	}

	return join(homedir(), path);
}
