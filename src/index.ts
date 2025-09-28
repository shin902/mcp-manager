import { Command } from "commander";
const program = new Command();

import { list } from "./commands/list";

program.version("0.0.1", "-v, --version");

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
