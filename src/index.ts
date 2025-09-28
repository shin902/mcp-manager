import { Command } from "commander";
const program = new Command();

import { listFunc } from "./commands/list";

program.version("0.0.1", "-v, --version");

program
  .command("list")
  .description("my first example")
  .action(() => listFunc());

program.parse();
