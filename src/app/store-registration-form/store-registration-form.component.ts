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
  tags: string[];
  bank: Bank;
  storeInfo: StoreInfo;
  storeProfile: StoreProfile;
  stockList = new Array<Stock>();
  businessHours : BusinessHours[];



  constructor(private service: StoreControllerService,
              private share: ShareDataService,
              private router: Router) {
              }

  ngOnInit(): void {
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
    this.businessHours = this.share.getBusinessHours();
    this.tags = this.storeInfo.tags;

    // for( let i = 0; i < this.businessHours.length; i++){
    //   console.log("Day: " + this.businessHours[i].day);
    //   console.log("Open: " + this.businessHours[i].open);
    //   console.log("Close: " + this.businessHours[i].close);
    //   console.log("Size: " + this.businessHours.length);
    // }
  
  }
/*
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }*/
  onChange(): void{
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
    //this.businessHours = this.share.getBusinessHours();
  }

  backClick = function (){
    this.router.navigate(['/form/stock-list']); 
    //this.router.navigateByUrl('/form/bank');
  };

  editStoreInfOnClick = function (){
    this.router.navigateByUrl('/form/store-info');
  };

  editOpHoursOnClick= function(){
    //this.share.resetBusinessHours();
    this.router.navigate(['/form/business-hours']); 
    //this.router.navigateByUrl('/form/bank');
    // this.share.opEdit = true;
  };

  btnClick( day: BusinessHours): void{

    this.share.editBusinessHours.close = day.close;
    this.share.editBusinessHours.day = day.day;
    this.share.editBusinessHours.open = day.open;

    this.router.navigate(['/form/business-hours/view']);
    //this.router.navigate(['/form/bank'])
  }
  
  onSubmit(): void {
      this.onChange();
      this.storeProfile = new StoreProfile(
        this.storeInfo.name,
        0, 
        // this.bank
        null, 
        this.businessHours, 
        new Date(),
        this.storeInfo.description,
        this.storeInfo.emailAddress,
        true, 
        new Date(), 
        false, 
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
        StoreProfile.RoleEnum.STORE,
        0, 
        this.stockList, 
        StoreProfile.StoreTypeEnum.FOOD,
        this.storeInfo.tags,
        '', 
        0);
      this.service.create(this.storeProfile).subscribe( s => console.log(s));
      //this.share.reset();
      this.router.navigate(['']);
  }
}
