import type { Database } from "better-sqlite3";

export interface NoteStore {
  init: () => any;
  getAll: () => any[];
  add: (contents: string) => any;
  update: () => void;
  remove: () => void;
}
export default function noteStore(db: Database): NoteStore {
  const init = () => {
    const stmt = db.prepare(`CREATE TABLE IF NOT EXISTS "notes" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "contents" TEXT,
      "createdAt" INTEGER,
      "updatedAt" INTEGER
    );`);
    const info = stmt.run();
    return info;
  };
  const getAll = () => {
    const stmt = db.prepare("SELECT * FROM notes ORDER BY updatedAt");
    const results = stmt.all();
    return results;
  };
  const add = (contents: string) => {
    console.log(contents);
    const stmt = db.prepare(
      "INSERT INTO notes (contents, createdAt, UpdatedAt) values (?, ?, ?)"
    );
    const t = Date.now();
    const info = stmt.run(contents, t, t);
    // {"changes":1,"lastInsertRowid":1
    return info;
  };
  const update = () => {};
  const remove = () => {};
  return {
    init,
    getAll,
    add,
    update,
    remove,
  };
}

// SELECT * FROM notes ORDER BY updatedAt;
