import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SavedSound} from '../model/saved-sound.model';
import {BackEndService} from "./back-end.service";

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  constructor(private backEndService: BackEndService) {
  }

  private _exportIndex: BehaviorSubject<string> = new BehaviorSubject<string>(
    'default'
  );

  public get exportIndex(): BehaviorSubject<string> {
    return this._exportIndex;
  }

  public set exportIndex(value: BehaviorSubject<string>) {
    this._exportIndex = value;
  }

  private _combo: BehaviorSubject<string> = new BehaviorSubject<string>(
    '<sound> <sound>'
  );

  public get combo(): BehaviorSubject<string> {
    return this._combo;
  }

  public set combo(value: BehaviorSubject<string>) {
    this._combo = value;
  }

  private _next: BehaviorSubject<string> = new BehaviorSubject<string>(
    '<sound>'
  );

  public get next(): BehaviorSubject<string> {
    return this._next;
  }

  public set next(value: BehaviorSubject<string>) {
    this._next = value;
  }

  private _default: BehaviorSubject<string> = new BehaviorSubject<string>(
    '<sound>'
  );

  public get default(): BehaviorSubject<string> {
    return this._default;
  }

  public set default(value: BehaviorSubject<string>) {
    this._default = value;
  }

  private _defaultSelect = true;

  public get defaultSelect() {
    return this._defaultSelect;
  }

  public set defaultSelect(value) {
    this._defaultSelect = value;
  }

  private _nextSelect = false;

  public get nextSelect() {
    return this._nextSelect;
  }

  public set nextSelect(value) {
    this._nextSelect = value;
  }

  private _comboSelect = false;

  public get comboSelect() {
    return this._comboSelect;
  }

  public set comboSelect(value) {
    this._comboSelect = value;
  }

  public getSounds(): Observable<SavedSound[]> {
    return this.backEndService.get<SavedSound[]>(`sounds`);
  }

  public resetPrefixValues(): void {
    this.default.next('<sound>');
    this.next.next('<sound>');
    this.combo.next('<sound> <sound>');
  }

  public resetPressed(sounds: SavedSound[]): void {
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].pressed = false;
    }
  }
}
