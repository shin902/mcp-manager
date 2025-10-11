import { program } from "commander";
import { addFunc } from "./commands/add";
import { listFunc } from "./commands/list";
import { removeFunc } from "./commands/remove";
import { applyFunc } from "./commands/apply";

program.version("0.0.1", "-v, --version");

program
	.command("list")
	.description("アプリに登録してある MCP サーバーを一覧表示します")
	.option("-a, --app <apps>", "アプリ名")
	.action((options) => {
		listFunc(options.app);
	});

program
	.command("add")
	.description("mcpサーバーをアプリに登録します")
	.option("-e, --env [key=value...]", "環境変数を設定")
	.option("-f, --force", "強制上書き")
	.argument("<name>", "MCPサーバー名")
	.argument("<command>", "実行コマンド")
	.argument("[args...]", "追加の引数")
	.action((name, command, args, options) => {
		addFunc(name, command, args, options.force, options.env);
	});

program
	.command("apply")
	.description("登録したMCPサーバーを対象のアプリに適用します")
	.option("-s, --servers [servers...]", "MCPサーバー名")
	.option("-a, --apps [apps...]", "アプリ名")
	.action((options) => {
		applyFunc(options.servers, options.apps);
	});

program
	.command("remove")
	.description("アプリから MCP サーバーを削除します")
	.requiredOption("-s, --servers [servers...]", "MCP サーバー名")
	.option("-a, --app <app>", "アプリ名")
	.option("-f --force", "強制上書き")
	.action((options) => {
		removeFunc(options.servers, options.app, options.force);
	});

program.parse();
