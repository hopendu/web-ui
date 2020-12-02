import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user-profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserControllerService {

  baseUrl = 'https://api-uat.izinga.co.za/';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>(this.baseUrl  +`user`);
  }

  create(profile: UserProfile): Observable<UserProfile>{
    return this.http.post(this.baseUrl  +`user`, profile);
  }

  patch( userId: string, profile: UserProfile): Observable<UserProfile>{
    return this.http.patch(this.baseUrl  +`user/`+ userId, profile);
  }
  
  delete( userId: string): Observable<UserProfile>{
    return this.http.delete(this.baseUrl  +`user/`+ userId);
  }

}
