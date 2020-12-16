import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user-profile';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserControllerService { 

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>(this.baseUrl + `user`);
  }

  getAllStoreAdmin(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>( this.baseUrl  + `user?latitude=0&longitude=0&range=10000&role=STORE_ADMIN`);
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
