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
  }
/*
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }*/
  onChange(): void{
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
    this.businessHours = this.share.getBusinessHours();
  }
  backClick = function (){
    this.router.navigateByUrl('/form/bank');
  };
  onSubmit(): void {
      this.onChange();
      let store = new StoreProfile(this.storeInfo.name
        ,0, this.bank, this.businessHours, 
        new Date(),this.storeInfo.description,true, new Date(), false, null, 
        this.storeInfo.imageUrl,0,0,0,
        this.storeInfo.mobileNumber, 
        new Date(), this.storeInfo.name,this.storeInfo.userId,this.storeInfo.regNumber,
        0, StoreProfile.RoleEnum.STOREADMIN,
        0, this.stockList, this.storeInfo.tags,
        '', 0);
      /*  this.service.create(store).subscribe( s => console.log(s));*/
  }
}
