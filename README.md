# mcp-quick-apply

MCPサーバーを各種AIエージェントに簡単に適用するためのCLIツールです。

## 概要

`mcp-quick-apply` は、Model Context Protocol (MCP) サーバーを管理し、様々なAIエージェントに適用するためのコマンドラインツールです。TypeScriptとBunランタイムを使用して構築されており、`citty`を使用したモダンなCLIフレームワークを採用しています。

## 機能

- MCPサーバーの一覧表示
- MCPサーバーの管理機能（今後実装予定）
- 各種AIエージェントへの簡単な適用（今後実装予定）

## 技術スタック

- **ランタイム**: Bun v1.x
- **言語**: TypeScript（strict設定）
- **CLIフレームワーク**: citty
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
```bash
bun run src/index.ts list
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
│   ├── index.ts          # メインエントリーポイント
│   └── commands/         # 各コマンドの実装
│       └── list.ts       # listコマンド
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
