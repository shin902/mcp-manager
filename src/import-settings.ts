const fs = require("fs");
const os = require("os");
const path = require("path");
const filePath = path.join(os.homedir(), ".mcp-manager.json");
if (!fs.existsSync(filePath)) {
  throw new Error("ファイルが存在しません");
}
const jsonString = fs.readFileSync(filePath, "utf8");
if (!("mcpServers" in JSON.parse(jsonString))) {
  throw new Error("mcpServersが存在しません");
}
export const obj = JSON.parse(jsonString);
