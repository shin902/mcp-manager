import { defineCommand } from "citty";

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
  const fs = require("fs");
  const os = require("os");
  const path = require("path");
  const filePath = path.join(os.homedir(), ".mcp-manager.json");
  if (!fs.existsSync(filePath)) {
    console.error("ファイルが存在しません");
    return;
  }
  const jsonString = fs.readFileSync(filePath, "utf8");
  const obj = JSON.parse(jsonString);
  if (!("mcpServers" in obj)) {
    console.error("mcpServersが存在しません");
    return;
  }
  const mcps = Object.keys(obj.mcpServers);
  Object.values(mcps).forEach((serverName) => {
    console.log(serverName);
  });
}
