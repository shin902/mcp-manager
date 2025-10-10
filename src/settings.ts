import { readFileSync, writeFileSync } from "node:fs";
import { ConfigSchema, type Config } from "./schemas";
import { validateConfig } from "./validate";
import { homedir } from "node:os";
import { join } from "node:path";
import { parse } from "secure-json-parse"
import { existsSync } from "node:fs";

const defaultJson = {
    mcpServers: {}
}

export function importMCPSettings(filePath: string = ".mcp-manager.json") {
    //TODO: if (!(filePath in Object.values(APP_PATHS))) {}
    if (!existsSync(filePath)) {
        console.log(`設定ファイルが見つかりません。新しく作成します`);
        writeFileSync(filePath, JSON.stringify(defaultJson, null, 2), "utf-8");
    }

    //TODO: ファイルが空だったり、mcpServersのキーが存在しなかった場合
    // safePath = validateFilePath パスが有効か検証（これは絶対有効だから上だけでいいか）

    const jsonString = readFileSync(filePath, "utf8");
    const obj = parse(jsonString, {
        protoAction: 'remove',
        constructorAction: 'remove',
    }) as Config;

    const result = ConfigSchema.safeParse(obj);
    validateConfig(result);

    return result.data;
}

export function exportMCPSettings(
    obj: Config,
    filePath: string,
) {
    const result = ConfigSchema.safeParse(obj);
    validateConfig(result);

    if (!existsSync(filePath)) {
        throw new Error(`設定ファイルが見つかりません: ${filePath}`);
    }

    const formatterJson = JSON.stringify(result.data, null, 2);
    writeFileSync(filePath, formatterJson);
}

const APP_PATHS: Record<string, string> = {
    "claude-code": ".claude.json",
    "gemini-cli": ".gemini/settings.json",
    "claude-desktop":
        "Library/Application Support/Claude/claude_desktop_config.json",
};

const DEFAULT_PATH = ".mcp-manager.json";

export function getPathFromAppName(app: string = ""): string {
    let appPath = APP_PATHS[app];

    if (app === "") {
        appPath = DEFAULT_PATH;
    } else if (!(app in APP_PATHS) || !appPath) {
        throw new Error("無効なクライアント名です");
    }

    const path = appPath;

    return join(homedir(), path);
}
