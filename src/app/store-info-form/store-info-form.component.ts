import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { ShareDataService } from '../service/share-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreControllerService } from '../service/store-controller.service';
import { StoreProfile } from '../model/store-profile';
import { NavigationService } from '../service/navigation.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { share } from 'rxjs/operators';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-store-info-form',
  templateUrl: './store-info-form.component.html',
  styleUrls: ['./store-info-form.component.css']
})
export class StoreInfoFormComponent implements OnInit, OnDestroy {

  toFile: { item: (arg0: number) => any; };
  submitted = false;
  show = true;
  storeInfoForm: FormGroup;
  id: string = null;
  store: StoreProfile;
  storeTypeEnum: StoreProfile.StoreTypeEnum;
  storeType: FormControl;



  tags: string[];
  bank: Bank;
  stockList = new Array<Stock>();
  businessHours : BusinessHours[];
  status: Boolean = false;
  stock: Stock;


  subscription: Subscription[] = [];

  constructor(private uploadService: UploadService,
    private service: StoreControllerService,
    private fb: FormBuilder,
    private router: Router,
    private share: ShareDataService,
    private storeService: StoreControllerService,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit(): void {

    StoreProfile.StoreTypeEnum.FOOD

    this.subscription[0] = this.activeRoute.queryParams.subscribe(params => {
      this.id = params['id']
      this.subscription[1] = this.storeService.fetchStoreById(this.id).subscribe(store => {
        this.store = store;
        this.bank = this.store.bank;
        this.stockList = this.store.stockList;
        this.businessHours = this.store.businessHours;
    
        this.storeInfoForm = this.fb.group({
          name: [store.name, Validators.required],
          shortName: [store.shortName, Validators.required],
          description: [store.description, Validators.required],
          emailAddress: [store.emailAddress, Validators.email],
          userId: [store.ownerId, Validators.required],
          address: [store.address, Validators.required],
          mobileNumber: [store.mobileNumber, Validators.required],
          regNumber: [store.regNumber],
          storeWebsiteUrl: [!!store.storeWebsiteUrl ? store.storeWebsiteUrl : ''],
          longitude: [store.longitude, Validators.required],
          latitude: [store.latitude, Validators.required],
          storeType: [store.storeType, Validators.required],
          collectAllowed: [store.collectAllowed],
          brandPrimaryColor: [store.brandPrimaryColor],
          brandSecondaryColor: [store.brandSecondaryColor],
          freeDeliveryMinAmount: [store.freeDeliveryMinAmount],
          izingaTakesCommission: [store.izingaTakesCommission],
          tags: this.fb.array([])
        });
        store.tags.forEach(tag => this.getTags.push(new FormControl(tag)));

        this.storeInfoForm.controls['userId'].disable();
      })
    })

    this.storeInfoForm = this.fb.group({
      name: ['', Validators.required],
      shortName: ['', Validators.required],
      description: ['', Validators.required],
      emailAddress: ['', Validators.email],
      userId: [this.activeRoute.snapshot.queryParams['oi'], Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      regNumber: [''],
      storeWebsiteUrl: [''],
      longitude: [0, Validators.required],
      latitude: [0, Validators.required],
      storeType: [StoreProfile.StoreTypeEnum.FOOD, Validators.required],
      collectAllowed: [true],
      brandPrimaryColor: [''],
      brandSecondaryColor: [''],
      freeDeliveryMinAmount: [0],
      izingaTakesCommission: [false],
      tags: this.fb.array([])
    });

    this.bank = this.share.bank;
    this.stockList = this.share.stockList;
    this.businessHours = this.share.getBusinessHours();
    
    this.storeInfoForm.controls['userId'].disable();
    this.addTag();
  }

  ngOnDestroy(): void {
    if (!!this.subscription) this.subscription.forEach(sub => sub.unsubscribe);
  }

  get getTags(): FormArray {
    return this.storeInfoForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.getTags.push(new FormControl(''));
  }

  deleteTag(index: number): void {
    (this.storeInfoForm.get('tags') as FormArray).removeAt(index);
  }

  onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
    this.toFile = event.target.files;
  }

  changeCommissionValue(e) {
    this.storeInfoForm.get('izingaTakesCommission').setValue(e.target.value, {
      onlySelf: true
    })
  }

  get f() { return this.storeInfoForm.controls; }

  cancel(): void {
    window.history.back();
    //this.onReset();
    // this.router.navigateByUrl(`stores?id=${this.storeInfo.userId}`, { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['stores'], {queryParams:{ id: this.storeInfo.userId }});});
  }

  submit(): void {

    this.submitted = true;

    if (this.storeInfoForm.invalid) {
      this.alertService.error("WARNING: INVALID INPUT!\n1. All fields must be field.\n2. Use email address formart (i.e. xx@.yy.com) for email address.\n3. Ensure correct phone number format.\n4 Ensure atleast one tag iss added.");
      console.log('invalid!!!')
      return;
    }

    var imagesLogoUrl = ''
    const file =  (!(this.toFile == null) && (this.toFile.item(0) != null)) ? this.toFile.item(0) : null; 
      
    imagesLogoUrl = 'https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(file, this.storeInfoForm.get('name').value)
    
    
    // this.share.storeInfo = new StoreInfo(
    //   this.storeInfoForm.get('address').value,
    //   this.storeInfoForm.get('description').value,
    //   this.storeInfoForm.get('emailAddress').value,
    //   this.storeInfoForm.get('userId').value,
    //   this.storeInfoForm.get('mobileNumber').value,
    //   this.storeInfoForm.get('name').value,
    //   this.storeInfoForm.get('regNumber').value,
    //   this.storeInfoForm.get('shortName').value,
    //   this.storeInfoForm.get('storeWebsiteUrl').value,
    //   this.storeInfoForm.get('tags').value,
    //   imagesLogoUrl
    //   , this.storeInfoForm.get('longitude').value,
    //   this.storeInfoForm.get('latitude').value,
    //   this.storeInfoForm.get('storeType').value,
    //   this.storeInfoForm.get('brandPrimaryColor').value,
    //   this.storeInfoForm.get('brandSecondaryColor').value,
    //   this.storeInfoForm.get('collectAllowed').value,
    //   this.storeInfoForm.get('freeDeliveryMinAmount').value,
    //   this.storeInfoForm.get('izingaTakesCommission').value
    // );




 this.share.store = new StoreProfile(
        this.storeInfoForm.get('address').value,
        0, 
        null, 
        this.businessHours, 
        new Date(),
        this.storeInfoForm.get('description').value,
        this.storeInfoForm.get('emailAddress').value,
        true, 
        new Date(), 
        false, 
        null, 
        imagesLogoUrl,
        this.storeInfoForm.get('izingaTakesCommission').value,
        this.storeInfoForm.get('latitude').value,
        0,
        this.storeInfoForm.get('longitude').value,
        this.storeInfoForm.get('mobileNumber').value, 
        new Date(), 
        this.storeInfoForm.get('name').value,
        this.storeInfoForm.get('userId').value,
        this.storeInfoForm.get('regNumber').value,
        0, 
        StoreProfile.RoleEnum.STORE,
        0,
        this.storeInfoForm.get('shortName').value,
        this.stockList,
        null, 
        this.storeInfoForm.get('storeType').value,
        this.storeInfoForm.get('storeWebsiteUrl').value,
        this.storeInfoForm.get('tags').value,
        '', 
        0,
      this.storeInfoForm.get('brandPrimaryColor').value,
      this.storeInfoForm.get('brandSecondaryColor').value,
      this.storeInfoForm.get('collectAllowed').value,
      this.storeInfoForm.get('freeDeliveryMinAmount').value);

      // this.service.create(this.store).subscribe( data => { 
      //   this.share.store = data; 
      //   this.router.navigate(['stores'], { queryParams: { id: data.ownerId}});
      //   this.alertService.success('Successful created a store.', true);
      // },
      // err => this.alertService.error("Failure to create the store.", true));



    if (!!this.id) {

      this.store.name = this.share.store.name;
      this.store.address = this.share.store.address;
      this.store.emailAddress = this.share.store.emailAddress;
      this.store.mobileNumber = this.share.store.mobileNumber;
      this.store.regNumber = this.share.store.regNumber;
      this.store.description = this.share.store.description;
      this.store.shortName = this.share.store.shortName;
      this.store.storeWebsiteUrl = this.share.store.storeWebsiteUrl;
      this.store.tags = this.share.store.tags;
      this.store.ownerId = this.share.store.ownerId;
      this.store.imageUrl =  this.share.store.imageUrl.length > 0 ? this.share.store.imageUrl : this.store.imageUrl;
      this.store.latitude = this.share.store.latitude;
      this.store.longitude = this.share.store.longitude;
      this.store.storeType = this.share.store.storeType;
      this.store.brandPrimaryColor = this.share.store.brandPrimaryColor;
      this.store.brandSecondaryColor = this.share.store.brandSecondaryColor;
      this.store.collectAllowed = this.share.store.collectAllowed;
      this.store.freeDeliveryMinAmount = this.share.store.freeDeliveryMinAmount;
      this.store.izingaTakesCommission = this.share.store.izingaTakesCommission;

      this.storeService.patch(this.id, this.store).subscribe(data => {
        this.alertService.success('Succesfull updated store infomation.', true)
        window.history.back()
      }, err => {
        this.alertService.error('Failed to update store infomation.', true)
      })
      return;
    } else {
      this.router.navigateByUrl('form', { skipLocationChange: true }).then(() => {
        this.router.navigate(['form'], { queryParams: { oi: this.storeInfoForm.get('userId').value } });
      });
    }
  };

  onReset(): void {
    this.submitted = false;
    this.storeInfoForm.reset();
    this.getTags.clear();
  }

  allEntriesAreValid(tags: string[]): boolean {
    return !!tags.find(tag => tag.length === 0);
  }
}
