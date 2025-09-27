import { defineCommand } from "citty";
import { importMCPManager } from "../import-settings";

export const apply = defineCommand({
  meta: {
    name: "list",
    description: "mcp-managerに登録してある MCP サーバーを一覧表示します",
  },
  args: {
    mcp: { type: "string[]", required: true },
    client: { type: "string[]", required: true },
  },
  run({ args }) {
    applyFunc(args);
  },
});

function applyFunc(args) {
  console.log(args.mcp, args.client);
}
