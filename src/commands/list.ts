import { importMCPManager } from "../import-settings";

export function listFunc(client?: string) {
  let pathfromhomedir: string = ".mcp-manager.json";
  switch (client) {
    case "claude-code": {
      pathfromhomedir = ".claude.json";
      break;
    }
    case "gemini-cli": {
      pathfromhomedir = ".gemini/settings.json";
      break;
    }
    case "claude": {
      pathfromhomedir =
        "Library/Application Support/Claude/claude_desktop_config.json";
      break;
    }
    case "default": {
      throw new Error("無効なクライアント名です");
    }
  }
  const obj = importMCPManager(pathfromhomedir);

  const mcps = Object.keys(obj.mcpServers);
  Object.values(mcps).forEach((serverName) => {
    console.log(serverName);
  });
}
