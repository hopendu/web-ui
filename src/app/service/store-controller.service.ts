import { Injectable } from '@angular/core';
import { StoreProfile } from '../model/store-profile';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stock } from '../model/stock';
import { environment } from 'src/environments/environment';
import { PayoutBundle } from '../model/payoutBundle';

@Injectable({
  providedIn: 'root'
})
export class StoreControllerService {
  
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  get headers(){ 
    return {
    "Content-type": "application/json",
    "app-version": "2.5.0",
    };
  }

  fetchAllStores(): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(this.baseUrl  +`store?range=100000&size=0&storeType=FOOD`, {headers: this.headers});
  }

  fetchStoreById(id: string): Observable<StoreProfile> {
    return this.http.get<StoreProfile>(`${this.baseUrl}/store/${id}`, {headers: this.headers});
  }

  create(profile: StoreProfile): Observable<StoreProfile>{
    return this.http.post(this.baseUrl  +`/store`, profile);
  }

  patch( storeId: string, profile: StoreProfile): Observable<StoreProfile>{
    return this.http.patch(this.baseUrl  +`/store/`+ storeId, profile, {headers: this.headers});
  }
  
  delete( storeId: string): Observable<StoreProfile>{
    return this.http.delete(this.baseUrl  +`/store/`+ storeId, {headers: this.headers});
  }

  fetchStockByStoreId(storeId: string): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.baseUrl  +`/store/`+ storeId +`/stock`, {headers: this.headers});
  }

  patchStockByStoreId(storeId: string, stock: Stock): Observable<StoreProfile>{
    return this.http.patch<StoreProfile>(this.baseUrl  +`/store/`+ storeId +`/stock`, stock, {headers: this.headers});
  }

  fetchStoreListByOwnerId(ownerId: string): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(this.baseUrl +`/store?latitude=0&longitude=0&ownerId=`+ownerId+`&range=100000&size=0&storeType=FOOD`, {headers: this.headers});
  }

  getShopPayouts(): Observable<PayoutBundle>{
    return this.http.get<PayoutBundle>(this.baseUrl  +`https://api.izinga.co.za/recon/shopPayoutBundle`, {headers: this.headers});
  }

  getMessengerPayouts(): Observable<PayoutBundle>{
    return this.http.get<PayoutBundle>(this.baseUrl  +`https://api.izinga.co.za/recon/messengerPayoutBundle`, {headers: this.headers});
  }
}
