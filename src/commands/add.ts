import { exportMCPSettings } from "../export-settings";
import { importMCPSettings } from "../import-settings";

export function addFunc(
  name: string,
  command: string,
  args: string[],
  force?: boolean,
  config?: string,
  env?: string[],
) {
  console.log(
    `name: ${name}\ncommand: ${command}\nargs: ${args}\nforce: ${force}\nenv: ${env}\nconfig: ${config}`,
  );
  const obj = importMCPSettings(config ? config : undefined);
  if (force || !(name in obj.mcpServers)) {
    obj.mcpServers[name] = { command: command, args: args, env: env };
    exportMCPSettings(obj, config ? config : undefined);
  } else {
    console.log("すでに同じ名前のMCPサーバーが存在します");
  }
}
