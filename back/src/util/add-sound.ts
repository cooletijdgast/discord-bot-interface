import { getAllSounds } from "./connection";
import SoundModel from "../models/sound-model";
import ytdl from "ytdl-core";
import * as fs from "fs";
import getAudioDurationInSeconds from "get-audio-duration";

export class Sound {
  public addSound(name: string, tag?: string[]) {
    if (!name) {
      return;
    }
    let sound = new SoundModel(name, tag);
    let allSounds = getAllSounds();
    allSounds.push(sound).write();
  }

  public async convertToMp3(url: string, fileName: string) {
    if (!fileName.includes(".mp3")) {
      fileName += ".mp3";
    }
    const readableStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });
    const writeStream = fs.createWriteStream(`../sounds/${fileName}`);
    readableStream.pipe(writeStream);
    writeStream.on("finish", async () => {
      console.log("finished\n");
      console.log(await getAudioDurationInSeconds(`../sounds/${fileName}`));
    });
  }

  public verifyFileName(fileName: string): boolean {
    return fileName.includes(" ");
  }
}
