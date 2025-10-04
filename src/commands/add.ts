import { exportMCPSettings } from "../export-settings";
import { importMCPSettings } from "../import-settings";
import type { Config } from "../schemas";

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

  /*
  forEachの省略版みたいなやつ。要素の個数分追加処理が入る
  acc: 現在操作しているオブジェクト、e: 現在処理している文字列
  eに最初の文字列 string1=string2 が入る
  それから keyとvalue を生成して、accに追加する(初期値は{})
  */
  if (env) {
    newEnv = env.reduce(
      (acc, e) => {
        const [key, value] = e.split("=");
        if (key && value) {
          acc[key] = value;
        } else {
          throw new Error(
            "envが無効な形式です。=で2つの文字列をつなげてください。",
          );
        }
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  const obj: Config = importMCPSettings(config ? config : undefined);
  if (force || !(name in obj.mcpServers)) {
    obj.mcpServers[name] = { command: command, args: args, env: newEnv };
    exportMCPSettings(obj, config ? config : undefined);
  } else {
    console.log("すでに同じ名前のMCPサーバーが存在します");
  }
}
