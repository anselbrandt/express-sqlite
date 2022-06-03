import express, { Request, Response } from "express";

const graphql = express.Router();

graphql.get("/", (req: Request, res: Response) => {
  res.send("graphql");
});

export default graphql;
