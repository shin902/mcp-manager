import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { Config } from "./schemas";
import { ConfigSchema } from "./schemas";

export function importMCPSettings(
	pathfromhomedir: string = ".mcp-manager.json",
) {
	const filePath = join(homedir(), pathfromhomedir);
	if (!existsSync(filePath)) {
		throw new Error("ファイルが存在しません");
	}
	const jsonString = readFileSync(filePath, "utf8");
	const obj: Config = ConfigSchema.parse(JSON.parse(jsonString));
	return obj;
}
