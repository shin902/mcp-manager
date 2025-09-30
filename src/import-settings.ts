import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export function importMCPManager(pathfromhomedir: string) {
	const filePath = join(homedir(), pathfromhomedir);
	if (!existsSync(filePath)) {
		throw new Error("ファイルが存在しません");
	}
	const jsonString = readFileSync(filePath, "utf8");
	const obj = JSON.parse(jsonString);
	if (!("mcpServers" in obj)) {
		throw new Error("mcpServersが存在しません");
	}
	if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
		throw new Error("無効なJSON形式");
	}

	return obj;
}
