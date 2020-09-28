import { Injectable } from '@angular/core';
import { StoreProfile } from '../model/store-profile';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreControllerService {
  baseUrl = 'https://api-uat.izinga.co.za/'
  constructor(private http: HttpClient) { }

  getAllStores(): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(this.baseUrl  +`store`);
  }
  create(profile: StoreProfile): Observable<StoreProfile>{
    return this.http.post(this.baseUrl  +`store`, profile);
  }
}
