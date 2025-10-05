import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { ConfigSchema, type Config } from "./schemas";

export function exportMCPSettings(
  obj: Config,
  pathfromhomedir: string = ".mcp-manager.json",
) {
  try {
    const validatedObj = ConfigSchema.parse(obj);
    // 以降の処理（ファイル書き込み）
  } catch (error) {
    // エラーハンドリング
    throw new Error(`設定が不正です: ${error}`);
  }

  const filePath = join(homedir(), pathfromhomedir);
  const formatterJson = JSON.stringify(obj, null, 2);
  writeFileSync(filePath, formatterJson);
}
