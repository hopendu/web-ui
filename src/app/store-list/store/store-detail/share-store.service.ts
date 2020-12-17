import { Injectable } from '@angular/core';
import { StoreProfile} from '../../../model/store-profile';

@Injectable({
  providedIn: 'root'
})
export class ShareStoreService {

  public storeProfile: StoreProfile;

  constructor() { }
}
