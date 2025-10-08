import { importMCPSettings } from "../import-settings";
import type { Config } from "../schemas";
import { getPathFromAppName } from "../return-apps-settings";

export function listFunc(app?: string) {
  const filePath = getPathFromAppName(app);

  const obj: Config = importMCPSettings(filePath);

  const mcps = Object.keys(obj.mcpServers);
  Object.values(mcps).forEach((serverName) => {
    console.log(serverName);
  });
}
