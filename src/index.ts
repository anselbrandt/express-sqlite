import express, { Express, Request, Response } from "express";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import router from "../routes";

async function main() {
  const app: Express = express();
  const port = 5000;

  const db = await open({
    filename: "./notes.db",
    driver: sqlite3.Database,
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS "notes" (
		"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		"contents" TEXT,
		"createdAt" INTEGER,
		"updatedAt" INTEGER
	);`);

  const r = router;

  app.use("/images", r.images);
  app.use("/api/notes", r.notes);
  app.use("/api/graphql", r.graphql);
  app.use("/", r.web);

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "../../../web/build/index.html"));
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}

main().catch((error) => console.log(error));
