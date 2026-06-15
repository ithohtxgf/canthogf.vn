import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { assertDatabaseReady } from "./config";
import { runMigrations } from "./schema";
import { seedDatabaseIfEmpty } from "./seed";

declare global {
  // eslint-disable-next-line no-var
  var __canthogfDb: Database.Database | undefined;
}

function getDbPath(): string {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "canthogf.db");
}

export function getDb(): Database.Database {
  assertDatabaseReady();

  if (globalThis.__canthogfDb) {
    return globalThis.__canthogfDb;
  }

  const db = new Database(getDbPath());
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  runMigrations(db);
  seedDatabaseIfEmpty(db);

  if (process.env.NODE_ENV !== "production") {
    globalThis.__canthogfDb = db;
  }

  return db;
}
