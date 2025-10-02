import { z } from "zod";

// 1. スキーマを定義
const MCPServerSchema = z.object({
  command: z.string(),
  args: z.array(z.string()),
  env: z.array(z.string()).optional(), // オプショナル
});

export const ConfigSchema = z.object({
  mcpServers: z.record(z.string(), MCPServerSchema), // キーは任意、値はMCPServerSchema
});
