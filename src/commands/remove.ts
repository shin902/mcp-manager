import { getPathFromAppName } from "../return-apps-settings";
import { exportMCPSettings } from "../export-settings";
import { importMCPSettings } from "../import-settings";
import type { Config } from "../schemas";

export function removeFunc(server: string, app: string) {
  const filePath = getPathFromAppName(app);

  const obj: Config = importMCPSettings(filePath);
  if (server in obj.mcpServers) {
    delete obj.mcpServers[server];
  } else {
    console.log(`Server ${server} not found`);
  }
  exportMCPSettings(obj, filePath);
}
