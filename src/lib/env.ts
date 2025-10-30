import path from "node:path";
import dotenv from "dotenv";

export function loadEnv() {
  // Load .env from project root
  const result = dotenv.config({ path: path.resolve(__dirname, "../../.env") });

  if (result.error) {
    throw new Error("Could not load .env file");
  }

  const { DATABASE_URL } = process.env;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env");
  }

  return { DATABASE_URL };
}
