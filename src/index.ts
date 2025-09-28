import { Command } from "commander";
const program = new Command();
import { listFunc } from "./commands/list";

// サブコマンドの定義

// const main = defineCommand({
//   meta: {
//     name: "mcp-manager",
//     description: "mcpを各エージェントに簡単に適用するCLIツールです。",
//   },
//   subCommands: {
//     list: list,
//   },
// });

// runMain(main);

program.version("0.0.1", "-v, --version");

program
  .command("list")
  .description("mcp-managerに登録してある MCP サーバーを一覧表示します")
  .option("-c, --client <clientName>", "クライアント名")
  .action((options) => {
    listFunc(options.client);
  });

program.parse();
