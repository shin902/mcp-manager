import { importMCPSettings } from "../import-settings";
import type { Config } from "../schemas";
import { getPathFromAppsName } from "../return-client-settings";

export function listFunc(apps?: string) {
	const configPath = getPathFromAppsName(apps);

	const obj: Config = importMCPSettings(configPath);

	const mcps = Object.keys(obj.mcpServers);
	Object.values(mcps).forEach((serverName) => {
		console.log(serverName);
	});
}
