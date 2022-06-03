import express, { Request, Response } from "express";

const root = express.Router();

root.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript + GraphQL");
});

export default root;
