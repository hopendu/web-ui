import { Component, OnInit, SimpleChanges } from '@angular/core';
import { StoreControllerService } from '../service/store-controller.service';
import { StoreProfile } from '../model/store-profile';
import { StoreInfo } from '../model/store-info';
import { ShareDataService } from '../service/share-data.service';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';

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
  status: Boolean = false;
  stock: Stock;

  constructor(private service: StoreControllerService,
              private share: ShareDataService, 
              private alertService: AlertService,
              private router: Router) {
              }

  ngOnInit(): void {
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
    this.businessHours = this.share.getBusinessHours();
    this.tags = this.storeInfo.tags;
  }

  hideDetail(event) {
    this.status = false;
  }

  isClicked(event: Stock) {
    this.stock = event;
    this.status = true;
  }

  onChange(): void{
    this.bank = this.share.bank;
    this.storeInfo = this.share.storeInfo;
    this.stockList = this.share.stockList;
  }

  backClick = function (){
    this.router.navigate(['/form/stock-list']); 
  };

  editStoreInfOnClick = function (){
    this.router.navigateByUrl('/form/store-info');
  };

  editOpHoursOnClick= function(){
    this.router.navigate(['/form/business-hours']); 
  };

  btnClick( day: BusinessHours): void{
    this.share.editBusinessHours.close = day.close;
    this.share.editBusinessHours.day = day.day;
    this.share.editBusinessHours.open = day.open;
    this.router.navigate(['form/business-hours/view']);
  }
  
  onSubmit(): void {
      this.onChange();
      this.storeProfile = new StoreProfile(
        this.storeInfo.address,
        0, 
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
        false,
        -29.883333,
        0,
        31.049999,
        this.storeInfo.mobileNumber, 
        new Date(), 
        this.storeInfo.name,
        this.storeInfo.userId,
        this.storeInfo.regNumber,
        0, 
        StoreProfile.RoleEnum.STORE,
        0,
        this.storeInfo.shortName,
        this.stockList, 
        StoreProfile.StoreTypeEnum.FOOD,
        this.storeInfo.storeWebsiteUrl,
        this.storeInfo.tags,
        '', 
        0);
      this.service.create(this.storeProfile).subscribe( data => { 
        this.share.store = data; 
        this.router.navigate(['stores'], { queryParams: { id: data.ownerId}});
        this.alertService.success('Successful created a store.', true);
      },
      err => this.alertService.error("Failure to create the store.", true));
  }
}
