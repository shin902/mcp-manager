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
  if (fs.existsSync(filePath)) {
    const jsonString = fs.readFileSync(filePath, "utf8");
    const obj = JSON.parse(jsonString);
    const mcps = Object.keys(obj.mcpServers);
    Object.values(mcps).forEach((serverName) => {
      console.log(serverName);
    });
  } else {
    console.log("ファイルが存在しません");
  }
}
