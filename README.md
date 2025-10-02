# mcp-quick-apply

MCPサーバーを各種AIエージェントに簡単に適用するためのCLIツールです。

## 概要

`mcp-quick-apply` は、Model Context Protocol (MCP) サーバーを管理し、様々なAIエージェントに適用するためのコマンドラインツールです。TypeScriptとBunランタイムを使用して構築されており、`citty`を使用したモダンなCLIフレームワークを採用しています。

## 機能

- **MCPサーバーの一覧表示** (`list`): 設定ファイルに登録されているMCPサーバーの一覧を表示
- **MCPサーバーの追加** (`add`): 新しいMCPサーバーを設定ファイルに追加
- **MCPサーバーの適用** (`apply`): 指定したMCPサーバーをAIエージェントに適用（開発中）

## 技術スタック

- **ランタイム**: Bun v1.x
- **言語**: TypeScript（strict設定）
- **CLIフレームワーク**: citty
- **バリデーション**: Zod（型安全なスキーマバリデーション）
- **コード品質**: Biome（リンター・フォーマッター）

## インストール

依存関係をインストール:

```bash
bun install
```

## 使用方法

CLIツールを実行:

```bash
bun run src/index.ts
```

### 利用可能なコマンド

#### `list` - MCPサーバーの一覧表示
設定ファイルに登録されているMCPサーバーの一覧を表示します。

```bash
bun run src/index.ts list
```

#### `add` - MCPサーバーの追加
新しいMCPサーバーを設定ファイルに追加します。

```bash
bun run src/index.ts add <name> <command> [args...]
```

**オプション:**
- `--force`: 既存の同名サーバーを上書き
- `--config <path>`: カスタム設定ファイルのパスを指定
- `--env <key=value>`: 環境変数を設定（複数指定可能）

**例:**
```bash
# 基本的な追加
bun run src/index.ts add my-server node server.js

# 環境変数付きで追加
bun run src/index.ts add my-server node server.js --env API_KEY=xxx

# 既存サーバーを強制上書き
bun run src/index.ts add my-server node server.js --force
```

#### `apply` - MCPサーバーの適用（開発中）
指定したMCPサーバーをAIエージェントに適用します。

```bash
bun run src/index.ts apply --include <server1> <server2> --exclude <server3>
```

## 開発

### 開発環境での実行（ホットリロード付き）
```bash
bun --hot src/index.ts [command]
```

### コードの品質チェック
```bash
# フォーマットとリンターのチェック
bunx biome check .

# フォーマットの適用
bunx biome format .
```

### テスト実行
```bash
bun test
```

## プロジェクト構造

```
mcp-quick-apply/
├── src/
│   ├── index.ts              # メインエントリーポイント
│   ├── schemas.ts            # Zodスキーマ定義（型安全なバリデーション）
│   ├── import-settings.ts    # 設定ファイルの読み込み
│   ├── export-settings.ts    # 設定ファイルの書き出し
│   └── commands/             # 各コマンドの実装
│       ├── list.ts           # listコマンド
│       ├── add.ts            # addコマンド
│       └── apply.ts          # applyコマンド（開発中）
├── package.json
├── tsconfig.json
├── biome.json
└── README.md
```

## 設定ファイル

MCPサーバーの設定は `~/.mcp-manager.json` に保存されます。

### 保存場所
- **Windows**: `C:\Users\<ユーザー名>\.mcp-manager.json`
- **macOS**: `/Users/<ユーザー名>/.mcp-manager.json`
- **Linux**: `/home/<ユーザー名>/.mcp-manager.json`

全てのOSでホームディレクトリ直下の `.mcp-manager.json` ファイルを使用します。

---

このプロジェクトは [Bun](https://bun.com) を使用して作成されました。
