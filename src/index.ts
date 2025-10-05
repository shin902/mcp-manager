import { program } from "commander";
import { addFunc } from "./commands/add";
import { listFunc } from "./commands/list";
import { applyFunc } from "./commands/apply";

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
	.option("-e, --env [key=value...]", "環境変数を設定")
	.option("-c, --config <path>", "設定ファイルのパス")
	.option("-f, --force", "強制上書き")
	.argument("<name>", "MCPサーバー名")
	.argument("<command>", "実行コマンド")
	.argument("[args...]", "追加の引数")
	.action((name, command, args, options) => {
		addFunc(name, command, args, options.force, options.config, options.env);
	});

program
	.command("apply")
	.description("mcp-managerに登録してある MCP サーバーを一括適用します")
	.option("-i, --include [includedServers...]", "適用するサーバー名")
	.option("-e, --exclude [excludedServers...]", "除外するサーバー名")
	.option("-r, --remove [removedServers...]", "削除するサーバー名")
	.option("-c, --client [clients...]", "適用するエージェント名")
	.action((options) => {
		applyFunc(options.include, options.exclude, options.remove);
	});

program.parse();
