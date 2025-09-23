import { defineCommand, runMain } from "citty";
import { list } from "./commands/list";

// サブコマンドの定義

const main = defineCommand({
  meta: {
    name: "mcp-manager",
    description: "mcpを各エージェントに簡単に適用するCLIツールです。",
  },
  subCommands: {
    list: list,
  },
});

runMain(main);
