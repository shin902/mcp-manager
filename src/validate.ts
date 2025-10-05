import { type ZodError } from "zod";
import { type Config } from "./schemas";

type SafeParseSuccess<Output> = {
  success: true;
  data: Output;
  error?: never;
};

type SafeParseFailure<Input> = {
  success: false;
  error: ZodError<Input>;
  data?: never;
};

type SafeParseResult<Input, Output> =
  | SafeParseSuccess<Output>
  | SafeParseFailure<Input>;

export function validateConfig(
  result: SafeParseResult<unknown, Config>,
): asserts result is SafeParseSuccess<Config> {
  if (!result.success) {
    const errorMessages = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new Error(`設定が不正です: ${errorMessages}`);
  }
}
