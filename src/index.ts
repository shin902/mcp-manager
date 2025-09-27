import { defineCommand, runMain } from "citty";
import { list } from "./commands/list";
import { apply } from "./commands/apply";

// サブコマンドの定義

const main = defineCommand({
  meta: {
    name: "mcp-manager",
    description: "mcpを各エージェントに簡単に適用するCLIツールです。",
  },
  subCommands: {
    list: list,
    apply: apply,
  },
});

runMain(main);
