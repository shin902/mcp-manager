import { homedir } from "node:os";
import { join } from "node:path";

export function getPathFromClientName(client: string = ""): string {
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
    case undefined:
    case "": {
      // デフォルトの.mcp-manager.jsonを使用
      break;
    }
    default: {
      throw new Error("無効なクライアント名です");
    }
  }
  return join(homedir(), pathfromhomedir);
}
