import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sound } from '../model/sound';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private soundURL = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  public getSounds(): Observable<Sound[]> {
    return this.http.get<Sound[]>(this.soundURL);
  }
}
