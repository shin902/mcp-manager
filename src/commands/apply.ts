import {
	importMCPSettings,
	getPathFromAppName,
	exportMCPSettings,
} from "../settings";
import type { Config } from "../schemas";

export function applyFunc(servers: string[], apps: string[]) {
	const configFilePath = getPathFromAppName();
	const configObj: Config = importMCPSettings(configFilePath);

	apps.forEach((app: string) => {
		servers.forEach((server: string) => {
			const serverObj = configObj.mcpServers[server];
			if (!serverObj) {
				throw new Error(`MCPサーバーが設定されてません: ${server}`);
			}
			const appFilePath = getPathFromAppName(app);
			const appObj: Config = importMCPSettings(appFilePath);
			appObj.mcpServers[server] = serverObj;
			exportMCPSettings(appObj, appFilePath);
		});
	});
}
