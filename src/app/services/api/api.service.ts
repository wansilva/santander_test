import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server= "https://dummyapi.io/data/v1";

  constructor(private http: HttpClient) {}

  getExternal(data: { url: string, headers: HttpHeaders }): Observable<any> {
    return this.http.get(data.url, { headers: data.headers });
  }

  getData(data: { url: string, headers: HttpHeaders }): Observable<any> {
    return this.http.get(`${this.server}/${data.url}`, { headers: data.headers });
  }
}
