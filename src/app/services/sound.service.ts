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

  private _combo: BehaviorSubject<string> = new BehaviorSubject<string>(
    '<sound> <sound>'
  );

  private _next: BehaviorSubject<string> = new BehaviorSubject<string>(
    '<sound>'
  );

  private _default: BehaviorSubject<string> = new BehaviorSubject<string>(
    '<sound>'
  );

  private _defaultSelect = true;
  private _nextSelect = false;
  private _comboSelect = false;

  constructor(private http: HttpClient) {}

  public getSounds(): Observable<Sound[]> {
    return this.http.get<Sound[]>(this.soundURL);
  }

  public resetPrefixValues(): void{
    this.default.next('<sound>');
    this.next.next('<sound>');
    this.combo.next('<sound> <sound>');
  }

  public resetPressed(sounds: Sound[]): void {
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].pressed = false;
    }
  }

  public get exportIndex(): BehaviorSubject<string> {
    return this._exportIndex;
  }

  public set exportIndex(value: BehaviorSubject<string>) {
    this._exportIndex = value;
  }

  public get default(): BehaviorSubject<string> {
    return this._default;
  }
  public set default(value: BehaviorSubject<string>) {
    this._default = value;
  }

  public get next(): BehaviorSubject<string> {
    return this._next;
  }
  public set next(value: BehaviorSubject<string>) {
    this._next = value;
  }

  public get combo(): BehaviorSubject<string> {
    return this._combo;
  }
  public set combo(value: BehaviorSubject<string>) {
    this._combo = value;
  }

  public get defaultSelect() {
    return this._defaultSelect;
  }
  public set defaultSelect(value) {
    this._defaultSelect = value;
  }

  public get nextSelect() {
    return this._nextSelect;
  }
  public set nextSelect(value) {
    this._nextSelect = value;
  }

  public get comboSelect() {
    return this._comboSelect;
  }
  public set comboSelect(value) {
    this._comboSelect = value;
  }
}
