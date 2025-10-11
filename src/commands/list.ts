import { importMCPSettings, getPathFromAppName } from "../settings";
import type { Config } from "../schemas";

export function listFunc(app?: string) {
	const filePath = getPathFromAppName(app);

	const obj: Config = importMCPSettings(filePath);

	const mcps = Object.keys(obj.mcpServers);
	Object.values(mcps).forEach((serverName) => {
		console.log(serverName);
	});
}
