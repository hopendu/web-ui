import { Component, OnInit, SimpleChanges } from '@angular/core';
import { StoreControllerService } from '../service/store-controller.service';
import { StoreProfile } from '../model/store-profile';
import { StoreInfo } from '../model/store-info';
import { ShareDataService } from '../service/share-data.service';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-store-registration-form',
  templateUrl: './store-registration-form.component.html',
  styleUrls: ['./store-registration-form.component.css']
})
export class StoreRegistrationFormComponent implements OnInit {

  bank: Bank;
  storeInfo: StoreInfo;
  storeProfile: StoreProfile;
  stockList = new Array<Stock>();
  businessHours = new Array<BusinessHours>();

  constructor(private service: StoreControllerService,
              private share: ShareDataService,
              private router: Router) {
              }

  ngOnInit(): void {
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
    this.businessHours = this.share.getBusinessHours();
    console.log("start*******start*******start");
    console.log(this.storeInfo);
    console.log(this.bank);
    console.log(this.businessHours);
    console.log("End*********End*******End");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    /*
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
    this.businessHours = this.share.getBusinessHours();
    console.log("on-change-start*******on-change-start*******on-change-start");
    console.log(this.storeInfo);
    console.log(this.bank);
    console.log(this.businessHours);
    console.log("on-change-end*********on-change-end*******on-change-end");*/
  }
  onChange(): void{
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
    this.businessHours = this.share.getBusinessHours();
    console.log("on-change-start*******on-change-start*******on-change-start");
    console.log(this.storeInfo);
    console.log(this.bank);
    console.log(this.businessHours);
    console.log("on-change-end*********on-change-end*******on-change-end");
  }
  backClick = function (){
    this.router.navigateByUrl('/form/bank');
  };
  onSubmit(): void {
      this.onChange();
     // alert.arguments('',JSON.stringify(this.bank), 4);
  }
}
