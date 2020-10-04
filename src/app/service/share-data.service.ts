import { Injectable } from '@angular/core';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';
import { StoreInfo } from '../model/store-info';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public bank: Bank;
  public storeInfo: StoreInfo;
  public stockList = new Array<Stock>();
  private businessHours = new Array<BusinessHours>();
  
  constructor() { }

  /*
  ngOnDestroy(): void {
    this.bank = null;
    this.storeInfo = null;
    this.stockList.forEach( stock => this.stockList.pop());
    this.businessHours.forEach(time => this.businessHours.pop());
  }*/

  public addBusinessHours(businessHours: BusinessHours){
    this.businessHours.push(businessHours);
  }

  public getBusinessHours(): BusinessHours[]{
    return this.businessHours;
  }

  public addStock(stock: Stock): void {
    this.stockList.push(stock);
  }
  
}
