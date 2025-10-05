import { existsSync, readFileSync } from "node:fs";
import { ConfigSchema, type Config } from "./schemas";
import { validateConfig } from "./validate";

export function importMCPSettings(filePath: string = ".mcp-manager.json") {
	if (!existsSync(filePath)) {
		throw new Error("ファイルが存在しません");
	}
	const jsonString = readFileSync(filePath, "utf8");
	const obj: Config = JSON.parse(jsonString);

	const result = ConfigSchema.safeParse(obj);
	validateConfig(result);

	return result.data;
}
