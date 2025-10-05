import { importMCPSettings } from "../import-settings";
import type { Config } from "../schemas";
import { getPathFromClientName } from "../return-client-settings";

export function listFunc(client?: string) {
  const configPath = getPathFromClientName(client);

  const obj: Config = importMCPSettings(configPath);

  const mcps = Object.keys(obj.mcpServers);
  Object.values(mcps).forEach((serverName) => {
    console.log(serverName);
  });
}
