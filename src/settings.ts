import { readFileSync, writeFileSync } from "node:fs";
import { ConfigSchema, type Config, type MCPServer } from "./schemas";
import { validateConfig } from "./validate";
import { homedir } from "node:os";
import { join } from "node:path";
import { parse } from "secure-json-parse";
import { existsSync } from "node:fs";
import *as toml from "toml";

const APP_PATHS = {
	default: join(homedir(), ".mcp-manager.json"),
	"claude-code": join(homedir(), ".claude.json"),
	"gemini-cli": join(homedir(), ".gemini/settings.json"),
	"claude-desktop": join(
		homedir(),
		"Library/Application Support/Claude/claude_desktop_config.json",
	),
	"codex-cli": join(homedir(), ".codex/config.toml"),
} as const;

const defaultJson: Config = {
	mcpServers: {},
};

export function getPathFromAppName(appName: string = ""): string {
	let appFullPath: string = APP_PATHS[appName as keyof typeof APP_PATHS];

	if (appName === "") {
		appFullPath = APP_PATHS.default;
	} else if (!(appName in APP_PATHS) || !appFullPath) {
		throw new Error(`無効なクライアント名です: ${appName}`);
	}

	return appFullPath;
}

export function importMCPSettings(filePath: string = ".mcp-manager.json") {
	if (!Object.values(APP_PATHS).includes(filePath)) {
		throw new Error(`無効なクライアント名です: ${filePath}`);
	}
	if (!existsSync(filePath)) {
		console.log(`設定ファイルが見つかりません。新しく作成します`);
		writeFileSync(filePath, JSON.stringify(defaultJson, null, 2), "utf-8");
	}

	let obj: Config = defaultJson;
	let configString: string;

	if (filePath.endsWith(".toml")) {
		configString = readFileSync(filePath, "utf-8");
		obj = toml.parse(configString) as Config;
	} else {
		configString = readFileSync(filePath, "utf8");
	}


	if (configString.trim() === "") {
		obj = defaultJson;

	} else if (filePath.endsWith(".toml")) {
		configString = readFileSync(filePath, "utf8");
		const oldObj = toml.parse(configString);
		const mcps = oldObj.mcp_servers ?? {};
		obj.mcpServers = mcps;
	} else {
		configString = readFileSync(filePath, "utf8");
		obj = parse(configString, {
			protoAction: "remove",
			constructorAction: "remove",
		}) as Config;
	}
	const result = ConfigSchema.safeParse(obj);
	validateConfig(result);
	return result.data;
}

export function exportMCPSettings(obj: Config, filePath: string) {
	const result = ConfigSchema.safeParse(obj);
	validateConfig(result);

	if (!existsSync(filePath)) {
		throw new Error(`設定ファイルが見つかりません: ${filePath}`);
	}

	const formatterJson = JSON.stringify(result.data, null, 2);
	writeFileSync(filePath, formatterJson);
}
