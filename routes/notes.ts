import express, { Request, Response } from "express";

const notes = express.Router();

notes.get("/", (req: Request, res: Response) => {
  res.send("notes");
});

export default notes;
