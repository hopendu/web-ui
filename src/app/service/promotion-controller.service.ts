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

  fetchAllPromotionsByStoreIdAndStoreType(storeId : string, storeType: string): Observable<Promotion[]>{
    return this.http.get<Promotion[]>( `${this.baseUrl}/promotion?storeId=${storeId}&storeType=${storeType}`);
  }

  fetchPromotionById( id: string): Observable<Promotion>{
    return this.http.get<Promotion>(`${this.baseUrl}/promotion/${id}`);
  }

  create(profile: Promotion): Observable<Promotion>{
    return this.http.post(`${this.baseUrl}/promotion`, profile);
  }

  patch( id: string, profile: Promotion): Observable<Promotion>{
    return this.http.patch(`${this.baseUrl}/promotion/${id}`, profile);
  }
  
  delete( id: string): Observable<Promotion>{
    return this.http.delete(`${this.baseUrl}/promotion/${id}`);
  }
}

