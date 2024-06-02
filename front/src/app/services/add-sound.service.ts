import {BackEndService} from "./back-end.service";
import {DownloadedSound} from "../model/downloaded-sound.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AddSoundService {

  constructor(
    private backEndService: BackEndService) {
  }

  public saveSoundFromUrl(url: string, filename: string): Observable<DownloadedSound> {
    return this.backEndService.post<DownloadedSound>(`/sounds/${url}`, {filename: filename});
  }
}
