import { Command } from "commander";
const program = new Command();

import { listFunc } from "./commands/list";

program.version("0.0.1", "-v, --version");

program
  .command("list")
  .option(
    "-c, --client <clientName>",
    "MCPサーバーを一覧表示するクライアント名",
    "claude",
  )
  .description("my first example")
  .action((options) => listFunc(options.client));

program.parse();
