import { Injectable } from '@angular/core';
import { StoreInfo } from '../model/store-info';
import { Bank } from '../model/bank';
import { Stock} from '../model/stock';
import { BusinessHours } from '../model/business-hours';
import { StoreProfile } from '../model/store-profile';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  storeProfile: StoreProfile;
  storeInfo: StoreInfo;
  bank: Bank;
  stocks: Stock[];
  businessHours : BusinessHours[];

  constructor() { }

  setBusinessHours(businessHours: BusinessHours[]){
    this.businessHours = businessHours;
  }

  setStocks(stocks: Stock[]): void {
    this.stocks = stocks;
  }

  setBank(bank: Bank): void {
    this.bank = bank;
  }

  setStoreInfo(storeInfo: StoreInfo): void {
    this.storeInfo = storeInfo;
  }
  
  getStoreProfile(): StoreProfile{
    if( this.storeInfo === null ||
        this.bank === null ||
        this.businessHours == null ||
        this.stocks === null
        ) return;
    return new StoreProfile(
      this.storeInfo.address,
      0,
      this.bank,
      this.businessHours,
      new Date(),
      this.storeInfo.description,
      false,
      new Date(),
      true,
      null,
      this.storeInfo.imageUrl,
      0,
      0,
      0,
      this.storeInfo.mobileNumber,
      new Date(),
      this.storeInfo.name,
      this.storeInfo.userId,
      this.storeInfo.regNumber,
      0,
      StoreProfile.RoleEnum.STOREADMIN,
      0,
      this.stocks,
      this.storeInfo.tags,
      '',
      0
    );
  }
}
