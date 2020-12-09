import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { SelectionOption } from '../model/selection-option';
import { Stock } from '../model/stock';
import { StoreInfo } from '../model/store-info';
import { StoreProfile } from '../model/store-profile';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public bank: Bank;
  public store: StoreProfile;
  public stockForm: FormGroup;
  public stock: Stock;
  public toggle: Boolean;
  public storeInfo: StoreInfo;
  public stockList = new Array<Stock>();
  public editBusinessHours: BusinessHours = new BusinessHours();
  private businessHours = new Array<BusinessHours>();
  private daysOfTheWeek = [ 
    BusinessHours.DayEnum.MONDAY,
    BusinessHours.DayEnum.TUESDAY,
    BusinessHours.DayEnum.WEDNESDAY,
    BusinessHours.DayEnum.THURSDAY,
    BusinessHours.DayEnum.FRIDAY,
    BusinessHours.DayEnum.SATURDAY,
    BusinessHours.DayEnum.SUNDAY
  ];

  stores: StoreProfile[];
  
  constructor() { 
    this.initializeBusinesHours();
    this.businessHours.forEach( (e, i)=> console.log("Day "+ ( i + 1)+" "+ e.day))
  }

  /*
  ngOnDestroy(): void {
    this.bank = null;
    this.storeInfo = null;
    this.stockList.forEach( stock => this.stockList.pop());
    this.businessHours.forEach(time => this.businessHours.pop());
  }*/
  


  public addBusinessHours( hours: BusinessHours){
    this.businessHours.forEach( e => {
      if( e.day.match(hours.day)){
        e.close = hours.close;
        e.open = hours.open;
        return;
      }
    })
  }

  public getBusinessHours(): BusinessHours[]{
    return this.businessHours;
  }
 
  public addStock(stock: Stock): void {
    //stock.images.splice(0, stock.images.length - 1);
    this.stockList.push(stock);
  }

  public getStock(): Stock[] {
    return this.stockList;
  }
  
  private initializeBusinesHours(){
    this.daysOfTheWeek.forEach( day => {
      this.businessHours.push(new BusinessHours( new Date(),day, new Date() ));
    })
}

}