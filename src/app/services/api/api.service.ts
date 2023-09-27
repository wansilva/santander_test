import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server= "https://dummyapi.io/data/v1";

  constructor(private http: HttpClient) {}

  getExternal(params: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(params, { headers: headers });
  }

  getData(params: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${this.server}/${params}`, { headers: headers });
  }

  postData(params: string, payload: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.server}/${params}`, payload, { headers: headers });
  }

  putData(params: string, payload: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put(`${this.server}/${params}`, payload, { headers: headers });
  }

  delData(params: string, headers?: HttpHeaders): Observable<any> {
    return this.http.delete(`${this.server}/${params}`, { headers: headers });
  }
}
