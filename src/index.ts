import { Command } from "commander";
const program = new Command();
import { listFunc } from "./commands/list";
import { addFunc } from "./commands/add";

program.version("0.0.1", "-v, --version");

program
  .command("list")
  .description("mcp-managerに登録してある MCP サーバーを一覧表示します")
  .option("-c, --client <clientName>", "クライアント名")
  .action((options) => {
    listFunc(options.client);
  });

program
  .command("add")
  .description("mcpサーバーをmcp-managerに登録します")
  .argument("<name>", "MCPサーバー名")
  .argument("<command>", "実行コマンド")
  .option("-e, --env [key=value...]", "環境変数を設定")
  .option("-f, --force", "強制上書き")
  .option("-c, --config [path...]", "設定ファイルのパス")
  .action((name, command, options) => {
    addFunc(name, command, options.force, options.config, options.env);
  });

program.parse();
