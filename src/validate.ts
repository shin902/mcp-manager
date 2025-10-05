import { type ZodSafeParseResult } from "zod";
import { type Config } from "./schemas";

export function validateConfig(result: ZodSafeParseResult<Config>): void {
  if (!result.success) {
    const errorMessages = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new Error(`設定が不正です: ${errorMessages}`);
  }
}
