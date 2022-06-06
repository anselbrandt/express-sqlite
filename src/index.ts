import Database from "better-sqlite3";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import path from "path";
import noteStore from "./model/notes";
import router from "./routes";

async function main() {
  const app: Express = express();
  const port = 5000;

  const db = new Database("./notes.db", { verbose: console.log });

  const store = noteStore(db);

  store.init();

  const r = router;

  // bodyParser may need to run after graphql
  app.use(bodyParser.json());
  app.use("/graphql", r.graphql);
  app.use("/images", r.images);
  app.use("/api/notes", r.notes(store));
  app.use("/api/graphql", r.graphql(store));
  app.use("/", r.web);

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "../../../web/build/index.html"));
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}

main().catch((error) => console.log(error));
