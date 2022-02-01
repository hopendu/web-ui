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

  get headers(){ 
    return {
    "Content-type": "application/json",
    "app-version": "2.5.0",
    };
  }

  fetchAllUsers(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>(this.baseUrl + `/user`, {headers: this.headers});
  }

  fetchAllStoreAdmin(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>( this.baseUrl  + `/user?latitude=0&longitude=0&range=10000&role=STORE_ADMIN`, {headers: this.headers});
  }
  
  create(profile: UserProfile): Observable<UserProfile>{
    return this.http.post(this.baseUrl  +`/user`, profile, {headers: this.headers});
  }

  patch( userId: string, profile: UserProfile): Observable<UserProfile>{
    return this.http.patch(this.baseUrl  +`/user/`+ userId, profile, {headers: this.headers});
  }
  
  delete( userId: string): Observable<UserProfile>{
    return this.http.delete(this.baseUrl  +`/user/`+ userId, {headers: this.headers});
  }

  findUser(cellNumber: string): Observable<UserProfile> {
    return this.http.get(this.baseUrl  +`/user/`+ cellNumber, {headers: this.headers});
  } 

}
