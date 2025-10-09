## 根拠となる問題点の特定

コードを見ると：
```typescript
import { parse } from "secure-json-parse"  // ← importしてる
// ...
const obj: Config = JSON.parse(jsonString);  // ← 使ってない！
```

## セキュリティ問題

### ❌ 問題1: secure-json-parseを使っていない
- importしているのに`JSON.parse`を使用
- プロトタイプ汚染のリスク

### ❌ 問題2: パストラバーサル攻撃の可能性
```typescript
export function importMCPSettings(filePath: string = ".mcp-manager.json") {
    const jsonString = readFileSync(filePath, "utf8");  // ← 危険
}
```
攻撃例：`filePath = "../../etc/passwd"`

### ❌ 問題3: エラーハンドリング不足
- ファイルが存在しない場合のチェックなし

## 修正版コード

```typescript
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { ConfigSchema, type Config } from "./schemas";
import { validateConfig } from "./validate";
import { homedir } from "node:os";
import { join, resolve, normalize } from "node:path";
import { parse } from "secure-json-parse";

/**
 * パストラバーサル攻撃を防ぐ
 */
function validateFilePath(filePath: string, baseDir: string): string {
    const normalizedPath = normalize(filePath);
    const resolvedPath = resolve(baseDir, normalizedPath);
    const resolvedBase = resolve(baseDir);

    // ベースディレクトリ外へのアクセスを防ぐ
    if (!resolvedPath.startsWith(resolvedBase)) {
        throw new Error("無効なファイルパスです");
    }

    return resolvedPath;
}

export function importMCPSettings(filePath: string = ".mcp-manager.json") {
    // パスの検証
    const safePath = validateFilePath(filePath, homedir());

    // ファイル存在チェック
    if (!existsSync(safePath)) {
        throw new Error(`設定ファイルが見つかりません: ${filePath}`);
    }

    try {
        const jsonString = readFileSync(safePath, "utf8");

        // ★ secure-json-parseを使用 ★
        const obj = parse(jsonString, {
            protoAction: 'remove',
            constructorAction: 'remove',
        }) as Config;

        const result = ConfigSchema.safeParse(obj);
        validateConfig(result);

        return result.data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`JSONの解析に失敗しました: ${error.message}`);
        }
        throw error;
    }
}

export function exportMCPSettings(
    obj: Config,
    pathfromhomedir: string = ".mcp-manager.json",
) {
    // パスの検証
    const safePath = validateFilePath(pathfromhomedir, homedir());

    const result = ConfigSchema.safeParse(obj);
    validateConfig(result);

    try {
        const formatterJson = JSON.stringify(result.data, null, 2);
        writeFileSync(safePath, formatterJson, "utf8");
    } catch (error) {
        throw new Error(`設定ファイルの書き込みに失敗しました: ${error}`);
    }
}

const APP_PATHS: Record<string, string> = {
    "claude-code": ".claude.json",
    "gemini-cli": ".gemini/settings.json",
    "claude-desktop":
        "Library/Application Support/Claude/claude_desktop_config.json",
} as const;

const DEFAULT_PATH = ".mcp-manager.json";

export function getPathFromAppName(app: string = ""): string {
    if (app === "") {
        return join(homedir(), DEFAULT_PATH);
    }

    const appPath = APP_PATHS[app];

    if (!appPath) {
        const validApps = Object.keys(APP_PATHS).join(", ");
        throw new Error(
            `無効なクライアント名です。有効な値: ${validApps}`
        );
    }

    return join(homedir(), appPath);
}
```

## 主な変更点

### 1. ✅ secure-json-parseを使用
```typescript
// Before
const obj: Config = JSON.parse(jsonString);

// After
const obj = parse(jsonString, {
    protoAction: 'remove',
    constructorAction: 'remove',
}) as Config;
```

### 2. ✅ パストラバーサル対策
```typescript
function validateFilePath(filePath: string, baseDir: string): string {
    const normalizedPath = normalize(filePath);
    const resolvedPath = resolve(baseDir, normalizedPath);
    const resolvedBase = resolve(baseDir);

    // ベースディレクトリ外へのアクセスを防ぐ
    if (!resolvedPath.startsWith(resolvedBase)) {
        throw new Error("無効なファイルパスです");
    }

    return resolvedPath;
}
```

### 3. ✅ ファイル存在チェック
```typescript
if (!existsSync(safePath)) {
    throw new Error(`設定ファイルが見つかりません: ${filePath}`);
}
```

### 4. ✅ エラーハンドリング強化
```typescript
try {
    // ...
} catch (error) {
    if (error instanceof SyntaxError) {
        throw new Error(`JSONの解析に失敗しました: ${error.message}`);
    }
    throw error;
}
```

### 5. ✅ より明確なエラーメッセージ
```typescript
const validApps = Object.keys(APP_PATHS).join(", ");
throw new Error(
    `無効なクライアント名です。有効な値: ${validApps}`
);
```

## セキュリティ対策まとめ

| 対策 | 防ぐ攻撃 |
|------|---------|
| secure-json-parse | プロトタイプ汚染 |
| validateFilePath | パストラバーサル |
| existsSync | ファイルシステムエラー |
| try-catch | JSONパースエラー |

**これで安全になります！**
