import {
    importMCPSettings,
    getPathFromAppName,
    exportMCPSettings,
} from "../settings";
import type { Config } from "../schemas";

export function removeFunc(servers: string[], app: string, force?: boolean) {
    const filePath = getPathFromAppName(app);

    const obj: Config = importMCPSettings(filePath);
    servers.forEach((server: string) => {
        if (server in obj.mcpServers || force) {
            delete obj.mcpServers[server];
        } else {
            console.log(`Server ${server} not found`);
        }
    })
    exportMCPSettings(obj, filePath);
}
