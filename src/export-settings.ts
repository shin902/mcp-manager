import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { ConfigSchema, type Config } from "./schemas";

export function exportMCPSettings(
	obj: Config,
	pathfromhomedir: string = ".mcp-manager.json",
) {
	const result = ConfigSchema.safeParse(obj);

	if (!result.success) {
		const errorMessages = result.error.issues
			.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
			.join(", ");
		throw new Error(`設定が不正です: ${errorMessages}`);
	}

	const filePath = join(homedir(), pathfromhomedir);
	const formatterJson = JSON.stringify(result.data, null, 2);
	writeFileSync(filePath, formatterJson);
}
