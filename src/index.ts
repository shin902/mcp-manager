import { Command } from "commander";
const program = new Command();
import { listFunc } from "./commands/list";

program.version("0.0.1", "-v, --version");

program
  .command("list")
  .description("mcp-managerに登録してある MCP サーバーを一覧表示します")
  .option("-c, --client <clientName>", "クライアント名")
  .action((options) => {
    listFunc(options.client);
  });

program.parse();
