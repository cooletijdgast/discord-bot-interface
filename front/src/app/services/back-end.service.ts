import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpOptions} from "../model/http-options.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  private soundURL = 'http://localhost:4000';

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.soundURL}/${url}`);
  }

  public post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    const formattedUrl = `${this.soundURL}/${url}`;
    return this.httpClient.post<T>(`${formattedUrl}`, body, options);
  }
}
