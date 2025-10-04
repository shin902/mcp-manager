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

  let newEnv = {};

  if (env) {
    newEnv = env.reduce((acc, e) => {
      const [key, value] = e.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  }

  const obj = importMCPSettings(config ? config : undefined);
  if (force || !(name in obj.mcpServers)) {
    obj.mcpServers[name] = { command: command, args: args, env: newEnv };
    exportMCPSettings(obj, config ? config : undefined);
  } else {
    console.log("すでに同じ名前のMCPサーバーが存在します");
  }
}
