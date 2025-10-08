import { program } from "commander";
import { addFunc } from "./commands/add";
import { listFunc } from "./commands/list";
import { removeFunc } from "./commands/remove";

program.version("0.0.1", "-v, --version");

program
  .command("list")
  .description("アプリに登録してある MCP サーバーを一覧表示します")
  .option("-a, --app <appName>", "アプリ名")
  .action((options) => {
    listFunc(options.app);
  });

program
  .command("add")
  .description("mcpサーバーをアプリに登録します")
  .option("-e, --env [key=value...]", "環境変数を設定")
  .option("-f, --force", "強制上書き")
  .option("--apps [appNames]", "アプリ名")
  .argument("<name>", "MCPサーバー名")
  .argument("<command>", "実行コマンド")
  .argument("[args...]", "追加の引数")
  .action((name, command, args, options) => {
    addFunc(name, command, args, options.apps, options.force, options.env);
  });

program
  .command("remove")
  .description("アプリから MCP サーバーを削除します")
  .requiredOption("-s, --server <serverName>", "MCP サーバー名")
  .option("-a, --app <appName>", "アプリ名")
  .action((options) => {
    removeFunc(options.server, options.app);
  });

program.parse();
