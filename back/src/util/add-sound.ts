import { getAllSounds } from "./connection";
import SoundModel from "../models/sound-model";
import ytdl from "ytdl-core";
import * as fs from "fs";
import getAudioDurationInSeconds from "get-audio-duration";
import { reject } from "lodash";

export class Sound {
  private soundFolderPath(fileName: string): string {
    if (!fileName.includes(".mp3")) {
      fileName += ".mp3";
    }
    return `../sounds/${fileName}`;
  }

  public addSound(name: string, tag?: string[]): void {
    if (!name) {
      return;
    }
    let sound = new SoundModel(name, tag);
    let allSounds = getAllSounds();
    allSounds.push(sound).write();
  }

  public async convertToMp3(url: string, fileName: string): Promise<boolean> {
    console.log("Starting download");
    const readableStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });
    const writeStream = fs.createWriteStream(this.soundFolderPath(fileName));
    readableStream.pipe(writeStream);
    const result = await new Promise<boolean>((resolve, reject) => {
      writeStream.on("finish", () => {
        console.log("Finished successfully");
        resolve(true);
      });

      writeStream.on("error", (error) => {
        console.error("An error occurred:", error);
        reject(false);
      });
    }).catch(() => false);
    return result;
  }

  public async extractMp3DurationInSeconds(fileName: string) {
    return await getAudioDurationInSeconds(this.soundFolderPath(fileName));
  }

  public verifyFileName(fileName: string): boolean {
    return fileName.includes(" ");
  }
}
