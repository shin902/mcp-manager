import { defineCommand } from "citty";
import { obj } from "../import-settings";

export const list = defineCommand({
  meta: {
    name: "list",
    description: "mcp-managerに登録してある MCP サーバーを一覧表示します",
  },
  args: {
    // name: { type: "string", required: true },
  },
  run({ args }) {
    listFunc();
  },
});

function listFunc() {
  if (!("mcpServers" in obj)) {
    throw new Error("mcpServersが存在しません");
  }
  const mcps = Object.keys(obj.mcpServers);
  Object.values(mcps).forEach((serverName) => {
    console.log(serverName);
  });
}
