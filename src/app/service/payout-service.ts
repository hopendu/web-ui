import { Injectable } from '@angular/core';
import { StoreProfile } from '../model/store-profile';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stock } from '../model/stock';
import { environment } from 'src/environments/environment';
import { PayoutBundle } from '../model/payoutBundle';
import { Payout } from '../model/payout';

@Injectable({
  providedIn: 'root'
})
export class PayoutService {
  
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  get headers(){ 
    return {
    "Content-type": "application/json",
    "app-version": "2.5.0",
    };
  }

  getShopPayouts(): Observable<PayoutBundle>{
    return this.http.get<PayoutBundle>(this.baseUrl  +`/recon/shopPayoutBundle`, {headers: this.headers});
  }

  patchShopPayouts(payoutBundle: PayoutBundle): Observable<PayoutBundle>{
    var results = {
      bundleId: payoutBundle.id
    }
    return this.http.patch<PayoutBundle>(this.baseUrl  +`/recon/shopPayoutBundle`, results, {headers: this.headers});
  }

  getMessengerPayouts(): Observable<PayoutBundle>{
    return this.http.get<PayoutBundle>(this.baseUrl  +`/recon/messengerPayoutBundle`, {headers: this.headers});
  }

  patchMessengerPayouts(payoutBundle: PayoutBundle): Observable<PayoutBundle>{
    var results = {
      bundleId: payoutBundle.id
    }
    return this.http.patch<PayoutBundle>(this.baseUrl  +`/recon/messengerPayoutBundle`, results, {headers: this.headers});
  }

  getPayout(payoutId: string, bundleId: string): Observable<Payout> {
    return this.http.get<Payout>(this.baseUrl  +`/recon/payout?payoutBundleId=${bundleId}&payoutId=${payoutId}`, {headers: this.headers});
  }
}