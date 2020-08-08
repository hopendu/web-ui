import { Injectable } from '@angular/core';
import { StoreProfile } from '../model/store-profile';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreControllerService {

  constructor(private http: HttpClient) { }

  getAllStores(): Observable<StoreProfile[]>{
    return this.http.get<StoreProfile[]>(`http://ec2co-ecsel-1b20jvvw3yfzt-2104564802.af-south-1.elb.amazonaws.com/store`);
  }
  create(profile: StoreProfile): Observable<StoreProfile>{
    return this.http.post(`http://ec2co-ecsel-1b20jvvw3yfzt-2104564802.af-south-1.elb.amazonaws.com/store`, profile);
  }
}
