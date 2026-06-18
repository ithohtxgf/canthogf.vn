import dotenv from "dotenv";
import { resolve } from "path";

/** Load `.env.local` (ưu tiên) rồi `.env` — dùng cho script CLI ngoài Next.js */
export function loadProjectEnv(): void {
  const root = process.cwd();
  dotenv.config({ path: resolve(root, ".env.local") });
  dotenv.config({ path: resolve(root, ".env") });
}

loadProjectEnv();
