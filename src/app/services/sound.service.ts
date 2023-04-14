import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sound } from '../model/sound';
// import * as dotenv from "dotenv";
// dotenv.config();

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private soundURL = 'http://86.89.142.164:4000';
  // private soundPort = process.env['PORT']!;

  private _exportIndex: BehaviorSubject<string> = new BehaviorSubject<string>(
    'default'
  );

  constructor(private http: HttpClient) {}

  public getSounds(): Observable<Sound[]> {
    // console.log(this.soundURL + ':' + this.soundPort);
    return this.http.get<Sound[]>(this.soundURL);
  }

  public get exportIndex(): BehaviorSubject<string> {
    return this._exportIndex;
  }

  public set exportIndex(value: BehaviorSubject<string>) {
    this._exportIndex = value;
  }
}
