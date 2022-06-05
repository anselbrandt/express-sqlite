import express, { Request, Response } from "express";
import { NoteStore } from "../model/notes";

const notes = (store: NoteStore) => {
  const r = express.Router();

  r.get("/", (req: Request, res: Response) => {
    const results = store.getAll();
    res.json(results);
  });

  r.post("/", (req: Request, res: Response) => {
    const note = req.body;
    const response = store.add(note.contents);
    res.json(response);
  });

  r.put("/", (req: Request, res: Response) => {
    const note = req.body;
    console.log(note);
    res.send("ok");
  });

  r.delete("/", (req: Request, res: Response) => {
    const note = req.body;
    console.log(note);
    res.send("ok");
  });
  return r;
};

export default notes;
