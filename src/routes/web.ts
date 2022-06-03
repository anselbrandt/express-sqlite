import express, { Request, Response } from "express";
import path from "path";

const web = express.Router();
web.use(express.static(path.join(__dirname, "../../web/out")));
web.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "../../../web/out/index.html"));
});

export default web;
