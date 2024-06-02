import {getAllSounds} from "./connection";
import SoundModel from "../models/sound-model";
import ytdl from 'ytdl-core';
import * as fs from 'fs';

export class Sound {
    public addSound(name: string, tag?: string[]){
        if(!name){
            return;
        }
        let sound = new SoundModel(name, tag);
        let allSounds = getAllSounds();
        allSounds.push(sound).write();
    }

    public async convertToMp3(url: string, fileName: string){
        if(!fileName.includes('.mp3')){
            fileName += '.mp3';
        }
        ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(fs.createWriteStream('../../sounds/' + fileName))
    }

    public verifyFileName(fileName: string){
        return fileName.includes(' ');
    }
}