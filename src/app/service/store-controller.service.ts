import { Injectable } from '@angular/core';
import { StoreProfile } from '../model/store-profile';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stock } from '../model/stock';

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

  patch( storeId: string, profile: StoreProfile): Observable<StoreProfile>{
    return this.http.patch(this.baseUrl  +`store/`+ storeId, profile);
  }
  
  delete( storeId: string): Observable<StoreProfile>{
    return this.http.delete(this.baseUrl  +`store/`+ storeId);
  }

  getStockByStoreId(storeId: string): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(this.baseUrl  +`store/`+ storeId +`/stock`);
  }

  patchStockByStoreId(storeId: string, stock: Stock): Observable<StoreProfile>{
    return this.http.patch<StoreProfile>(this.baseUrl  +`store/`+ storeId +`/stock`, stock);
  }

  getStoreListByOwnerId(ownerId: string): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(`https://api-uat.izinga.co.za/store?latitude=0&longitude=0&ownerId=`+ownerId+`&range=100000&size=0&storeType=FOOD`);
    //return this.http.get<StoreProfile[]>(`https://api-uat.izinga.co.za/store?latitude=0&longitude=0&ownerId=08fcdb32-2a89-4e26-9110-042cb0c58f04&range=100000&size=0&storeType=FOOD`);
  }
}
