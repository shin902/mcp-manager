# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---
description: Use Bun instead of Node.js, npm, pnpm, or vite.
globs: "*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json"
alwaysApply: false
---

## Project Overview

This is `mcp-quick-apply`, a CLI tool for managing and applying MCP (Model Context Protocol) servers to various AI agents. The project uses TypeScript with Bun runtime and citty for command-line interface structure.

### Architecture

- **CLI Framework**: Uses `citty` for command definitions and subcommand structure
- **Entry Point**: `src/index.ts` defines the main command with subcommands
- **Commands**: Individual commands are in `src/commands/` (currently `list.ts`)
- **Config File**: Users' MCP servers are stored in `~/.mcp-manager.json`

### Key Dependencies

- `citty`: CLI framework for command definitions and argument parsing
- `@biomejs/biome`: Linting and formatting (configured in `biome.json`)
- TypeScript with strict configuration (extends `@tsconfig/bun` and `@tsconfig/strictest`)

## Development Commands

- **Install dependencies**: `bun install`
- **Run CLI**: `bun run src/index.ts [command]` or `bun src/index.ts [command]`
- **Development with hot reload**: `bun --hot src/index.ts [command]`
- **Lint and format**: `bunx biome check .` (check) / `bunx biome format .` (apply formatting)
- **Test**: `bun test`

## Code Style

- Uses Biome for consistent formatting with tab indentation and double quotes
- Follows strict TypeScript configuration
- Import organization is automated via Biome

## Bun Usage Notes

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.
