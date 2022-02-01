import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Promotion } from '../model/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionControllerService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get headers(){ 
    return {
    "Content-type": "application/json",
    "app-version": "2.5.0",
    };
  }

  fetchAllPromotionsByStoreIdAndStoreType(storeId : string, storeType: string): Observable<Promotion[]>{
    return this.http.get<Promotion[]>( `${this.baseUrl}/promotion?storeId=${storeId}&storeType=${storeType}`, {headers: this.headers});
  }

  fetchPromotionById( id: string): Observable<Promotion>{
    return this.http.get<Promotion>(`${this.baseUrl}/promotion/${id}`, {headers: this.headers});
  }

  create(profile: Promotion): Observable<Promotion>{
    return this.http.post(`${this.baseUrl}/promotion`, profile, {headers: this.headers});
  }

  patch( id: string, profile: Promotion): Observable<Promotion>{
    return this.http.patch(`${this.baseUrl}/promotion/${id}`, profile, {headers: this.headers});
  }
  
  delete( id: string): Observable<Promotion>{
    return this.http.delete(`${this.baseUrl}/promotion/${id}`, {headers: this.headers});
  }
}

