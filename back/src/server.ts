import express, { Request, Response } from "express";
import connection from "./util/connection";
import { Sound } from "./util/add-sound";

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
  console.log("receiving");
  if (soundClass.verifyFileName(req.body.filename)) {
    res.status(406).send();
  }
  await soundClass.convertToMp3(req.body.url, req.body.filename);
  res.status(200).send();
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
