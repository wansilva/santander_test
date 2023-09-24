import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ListUsersSchema } from 'src/app/schemas/common.schema';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token = "64ed062e4340d229095be2de";
  // token = "64ed062d4340d2b2d45be2db";

  headers = new HttpHeaders({
    "app-id": this.token,
  });

  constructor(private api: ApiService) {}

  fetchUsers(): Observable<any> {
    return this.api.getData("user", this.headers);
  }

  fetchUserById(user_id: string): Observable<any> {
    return this.api.getData(`user/${user_id}`, this.headers);
  }

  createUser(payload: any): Observable<any> {
    return this.api.postData("user/create", payload, this.headers);
  }

  updateUser(user_id: string, payload: any): Observable<any> {
    return this.api.putData(`user/${user_id}`, payload, this.headers);
  }

  deleteUser(user_id: string): Observable<any> {
    return this.api.delData(`user/${user_id}`, this.headers);
  }
}
