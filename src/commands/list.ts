import { importMCPSettings } from "../import-settings";
import type { Config } from "../schemas";
import { getPathFromAppName } from "../resolve-app-settings";

export function listFunc(app?: string) {
	const configPath = getPathFromAppName(app);

	const obj: Config = importMCPSettings(configPath);

	const mcps = Object.keys(obj.mcpServers);
	Object.values(mcps).forEach((serverName) => {
		console.log(serverName);
	});
}
