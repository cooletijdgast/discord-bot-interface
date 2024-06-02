import express, {Request, Response} from "express";
import connection from "./util/connection";
import {Sound} from "./util/add-sound";

// Constants
const PORT = 4000;
const HOST = "localhost";

// App
const app = express();
const soundClass = new Sound;
app.use(function (request: Request, response: Response, next) {
    response.setHeader("Access-Control-Allow-Origin", '*');
    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    response.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    response.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/sounds", (req, res) => {
    const all = () => connection.get("sounds").values();
    res.status(200).json(all());
});

app.post("/sounds", (req, res) => {
    soundClass.addSound(req.body.soundName);
    res.status(200).send;
});

app.post("/sounds/:url", async (req, res) => {
    if(soundClass.verifyFileName(req.body.filename)){
        res.status(406).send();
    }
    await soundClass.convertToMp3(req.params.url, req.body.filename);
    res.status(200).send();
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
