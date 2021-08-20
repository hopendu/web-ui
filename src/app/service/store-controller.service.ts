import { Injectable } from '@angular/core';
import { StoreProfile } from '../model/store-profile';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stock } from '../model/stock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreControllerService {
  
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  fetchAllStores(): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(this.baseUrl  +`store?range=100000&size=0&storeType=FOOD`);
  }

  fetchStoreById(id: string): Observable<StoreProfile> {
    return this.http.get<StoreProfile>(`${this.baseUrl}/store/${id}`);
  }

  create(profile: StoreProfile): Observable<StoreProfile>{
    return this.http.post(this.baseUrl  +`store`, profile);
  }

  patch( storeId: string, profile: StoreProfile): Observable<StoreProfile>{
    return this.http.patch(this.baseUrl  +`store/`+ storeId, profile);
  }
  
  delete( storeId: string): Observable<StoreProfile>{
    return this.http.delete(this.baseUrl  +`store/`+ storeId);
  }

  fetchStockByStoreId(storeId: string): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.baseUrl  +`store/`+ storeId +`/stock`);
  }

  patchStockByStoreId(storeId: string, stock: Stock): Observable<StoreProfile>{
    return this.http.patch<StoreProfile>(this.baseUrl  +`store/`+ storeId +`/stock`, stock);
  }

  fetchStoreListByOwnerId(ownerId: string): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(this.baseUrl +`/store?latitude=0&longitude=0&ownerId=`+ownerId+`&range=100000&size=0&storeType=FOOD`);
  }
}
