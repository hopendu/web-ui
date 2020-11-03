import { Injectable } from '@angular/core';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { SelectionOption } from '../model/selection-option';
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

  public setBusinessHours( businessHours: BusinessHours[]): void {
    if( businessHours.length === 0){
      this.businessHours.splice(0, this.businessHours.length);
      return;
    }
    let temp = new Array<BusinessHours>();
    businessHours.forEach( (value, index) =>  temp[index] = value);
    temp.reverse();
    daysOfTheWeek.forEach((value, index) => temp[index].day = value);
    temp.forEach( value => console.log(value));
    this.businessHours.splice(0, this.businessHours.length);
    temp.forEach( (value, index) => this.businessHours.push(value));
  }  
  public addStock(stock: Stock): void {
    //stock.images.splice(0, stock.images.length - 1);
    this.stockList.push(stock);
  }

  public getStock(): Stock[] {
    return this.stockList;
  }
  
  public reset(): void {
    this.businessHours.splice(0, this.businessHours.length);
    this.storeInfo
  }

}


const daysOfTheWeek = [ 
  BusinessHours.DayEnum.MONDAY,
  BusinessHours.DayEnum.TUESDAY,
  BusinessHours.DayEnum.WEDNESDAY,
  BusinessHours.DayEnum.THURSDAY,
  BusinessHours.DayEnum.FRIDAY,
  BusinessHours.DayEnum.SATURDAY,
  BusinessHours.DayEnum.SUNDAY
] as const;