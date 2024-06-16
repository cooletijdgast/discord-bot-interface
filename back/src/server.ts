import express, { Request, Response } from "express";
import connection from "./util/connection";
import { Sound } from "./util/add-sound";
import { AddedSound } from "./models/added-sound.model";
import { ModifiedSound } from "./models/modified-sound.model";

// Constants
const PORT = 4000;
const HOST = "localhost";

// App
const app = express();
const soundClass = new Sound();
app.use(function (request: Request, response: Response, next) {
  response.set("Access-Control-Allow-Origin", "http://localhost:4200");
  response.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  response.set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  response.set("Access-Control-Allow-Credentials", "true");
  next();
});

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/sounds", (req, res) => {
  const all = () => connection.get("sounds").values();
  res.status(200).json(all());
});

app.post("/sounds/", async (req, res) => {
  const addedSound: AddedSound = { duration: 0, fileName: ''};
  if (soundClass.verifyFileName(req.body.filename)) {
    res.status(406).send();
  }
  if (await soundClass.convertToMp3(req.body.url, req.body.filename)) {
    addedSound.duration = await soundClass.extractMp3DurationInSeconds(
      req.body.filename
    );
    addedSound.fileName = soundClass.soundFolderPath(req.body.filename);
    res.status(200).json(addedSound);
  }
  res.status(500).send();
});

app.post("/sounds/:file", async (req, res) => {
  let modifiedSound: ModifiedSound = { begin: 0, end: 0, oldName: ''};
  modifiedSound = req.body.modifiedSound as ModifiedSound;
  const mp3Cutter = new mp3Cutter
  
  res.status(500).send();
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
