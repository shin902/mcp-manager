import { z } from "zod";

// 1. スキーマを定義
const MCPServerSchema = z.object({
  command: z.string(),
  args: z.array(z.string()),
  env: z.record(z.string(), z.string()).optional(), // オプショナル
});

export const ConfigSchema = z
  .object({
    mcpServers: z.record(z.string(), MCPServerSchema), // キーは任意、値はMCPServerSchema
  })
  .passthrough();

// スキーマから型を自動生成
export type Config = z.infer<typeof ConfigSchema>;
export type MCPServer = z.infer<typeof MCPServerSchema>;
