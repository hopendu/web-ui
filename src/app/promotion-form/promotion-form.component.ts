import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreControllerService } from '../service/store-controller.service';
import { UploadService } from '../service/upload.service';
import { AlertService } from '../_services/alert.service';
import { PromotionControllerService } from '../service/promotion-controller.service';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreType } from '../model/store-type';
import { Promotion } from '../model/promotion';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.css']
})
export class PromotionFormComponent  implements OnInit, OnDestroy {

  toFile: { item: (arg0: number) => any; };
  submitted = false;
  stockId: string;
  promotionForm: UntypedFormGroup;
  id: string = null;
  storeName: string;
  imageUrl: string;
  storeType: StoreType.StoreTypeEnum;
  promotion: Promotion;

  subscription: Subscription[] = [];
  
  constructor(private uploadService: UploadService,
              private fb: UntypedFormBuilder,
              private storeService: StoreControllerService,
              private promotionService: PromotionControllerService,
              private activeRoute: ActivatedRoute,
              private alertService : AlertService){ }

  ngOnInit(): void {

    this.subscription[0] =this.activeRoute.queryParams.subscribe( params => 
      {
        this.id = params['id'];
        this.stockId = params['item'];
        this.subscription[1] = this.storeService.fetchStoreById(this.id).subscribe( store => 
          {
            this.storeName = store.name;
            this.storeType = store.storeType; 
             this.promotionForm = this.fb.group({
              title: ['', Validators.required],
              actionUrl: [''],
              message: ['', Validators.required],
              date: ['', Validators.required],
              start: ['', Validators.required] });

        this.promotion = new Promotion(
          null,
          "",
          !!store.storeWebsiteUrl ? store.storeWebsiteUrl : "",
          "",
          "",
          store.id,
          this.stockId,
          store.storeType,
          new Date()
         );
             
            });

            this.promotionForm = this.fb.group({
                title: ['', Validators.required],
                actionUrl: [''],
                message: ['', Validators.required],
                date: ['', Validators.required],
                start: ['', Validators.required]});
      });
      
      

     
  }

  ngOnDestroy(): void {
   if(!!this.subscription) this.subscription.forEach( sub => sub.unsubscribe );
  }


  onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
    this.toFile = event.target.files;
    
    const file = this.toFile.item(0);
     this.imageUrl = 'https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(file, this.storeName);
  }

  get f() { return this.promotionForm.controls; }
  
  cancel(): void {
    window.history.back();
  }

  submit(): void {

    this.submitted = true;

    if (this.promotionForm.invalid){ this.alertService.error("WARNING: INVALID INPUT."); 
    console.log('invalid!!!')
    return; }

    this.promotion.message = this.promotionForm.get('message').value;
    this.promotion.expiryDate = new Date(this.promotionForm.get('date').value);
    this.promotion.actionUrl = !!this.promotionForm.get('actionUrl').value ? this.promotionForm.get('actionUrl').value : null ;
    this.promotion.imageUrl = this.imageUrl;
    this.promotion.title = this.promotionForm.get('title').value;

    const start: string = this.promotionForm.get('start').value;
  
    this.promotion.expiryDate.setHours(Number(start.split(':')[0]));
    this.promotion.expiryDate.setMinutes(Number(start.split(':')[1]));
    
    this.subscription[1] = this.promotionService.create(this.promotion).subscribe( data  => {
    this.alertService.success('Succcessful added promotion.',true), err => {
      this.alertService.error('Failed to add promotion', true)
    }});
    this.onReset();
    window.history.back();
  };

  onReset(): void {
    this.submitted = false;
    this.promotionForm.reset();
  }

  allEntriesAreValid(tags: string[]): boolean {
    return !!tags.find( tag => tag.length === 0);
  }
}

class Hours{
  constructor(public openTime: string,
    public closeTime: string){}
  
}