import { ValidationError } from "yup";

export function getError(e: unknown): string | string[] {
    if (e == null) return "null";
    if (typeof e == "string") return e;
    if (e instanceof ValidationError) return e.errors;
    if (e instanceof Error) return e.message;
    if (typeof e == "object") return JSON.stringify(e);
    return String(e);
  }