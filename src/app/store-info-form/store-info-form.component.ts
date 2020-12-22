import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { StoreInfo } from '../model/store-info';
import { UploadService } from '../service/upload.service';
import { ShareDataService } from '../service/share-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreControllerService } from '../service/store-controller.service';
import { StoreProfile } from '../model/store-profile';
import { NavigationService } from '../service/navigation.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-store-info-form',
  templateUrl: './store-info-form.component.html',
  styleUrls: ['./store-info-form.component.css']
})
export class StoreInfoFormComponent implements OnInit, OnDestroy {

  toFile: { item: (arg0: number) => any; };
  submitted = false;
  show = true;
  storeInfo: StoreInfo;
  storeInfoForm: FormGroup;
  id: string = null;
  store: StoreProfile;

  subscription: Subscription[] = [];
  
  constructor(private uploadService: UploadService,
              private fb: FormBuilder,
              private router: Router, 
              private share: ShareDataService,
              private storeService: StoreControllerService,
              private activeRoute: ActivatedRoute,
              private alertService : AlertService,
              private navigation: NavigationService){ }

  ngOnInit(): void {

    this.subscription[0] =this.activeRoute.queryParams.subscribe( params => 
      {
        this.id = params['id']
        this.subscription[1] = this.storeService.fetchStoreById(this.id).subscribe( store => 
          {
            this.store = store;
            this.storeInfoForm = this.fb.group({
              name: [store.name, Validators.required],
              description: [store.description, Validators.required],
              emailAddress: [store.emailAddress, [Validators.required, Validators.email]],
              userId: [store.ownerId, Validators.required],
              address: [store.address, Validators.required],
              mobileNumber: [store.mobileNumber, Validators.required],
              regNumber: [store.regNumber, Validators.required],
              tags: this.fb.array([])
            });
            store.tags.forEach( tag => this.getTags.push(new FormControl(tag)));

            this.storeInfoForm.controls['userId'].disable();
          })
      })

      this.storeInfoForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        userId: [ this.activeRoute.snapshot.queryParams['oi'], Validators.required],
        address: ['', Validators.required],
        mobileNumber:  ['', Validators.required],
        regNumber: ['', Validators.required],
        tags: this.fb.array([])
      });

      this.storeInfoForm.controls['userId'].disable();
    
  }

  ngOnDestroy(): void {
   if(!!this.subscription) this.subscription.forEach( sub => sub.unsubscribe );
  }

  get getTags(): FormArray {
    return this.storeInfoForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.getTags.push(new FormControl(''));
  }

  deleteTag( index: number): void{
    ( this.storeInfoForm.get('tags') as FormArray).removeAt(index);
  }

  onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
    this.toFile = event.target.files;
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

    if (this.storeInfoForm.invalid){ ("WARNING: INVALID INPUT!\n1. All fields must be field.\n2. Use email address formart (i.e. xx@.yy.com) for email address.\n3. Ensure correct phone number format."); 
    console.log('invalid!!!')
    return; }

    const file = this.toFile.item(0);

    this.share.storeInfo = new StoreInfo(
        this.storeInfoForm.get('address').value,
        this.storeInfoForm.get('description').value,
        this.storeInfoForm.get('emailAddress').value,
        this.storeInfoForm.get('userId').value,
        this.storeInfoForm.get('mobileNumber').value,
        this.storeInfoForm.get('name').value,
        this.storeInfoForm.get('regNumber').value,
        this.storeInfoForm.get('tags').value,
        'https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(file, this.storeInfoForm.get('name').value)
    );

    if(!!this.id){

      this.store.name = this.share.storeInfo.name;
      this.store.address = this.share.storeInfo.address;
      this.store.emailAddress = this.share.storeInfo.emailAddress;
      this.store.mobileNumber = this.share.storeInfo.mobileNumber;
      this.store.regNumber = this.share.storeInfo.regNumber;
      this.store.description = this.share.storeInfo.description;
      this.store.tags = this.share.storeInfo.tags;
      this.store.ownerId = this.share.storeInfo.userId;
      this.store.imageUrl = this.share.storeInfo.imageUrl;
      
     this.storeService.patch(this.id, this.store).subscribe( data => 
      {
        this.alertService.success('Succesfull updaed store infomation')
        window.history.back()
      }, err => {
        this.alertService.error('Failed to update store infomation.')
      })
      return;
    } else {this.router.navigate(['form/business-hours'], {queryParams:{ oi: this.storeInfoForm.get('userId').value }});
    }
  };

  onReset(): void {
    this.submitted = false;
    this.storeInfoForm.reset();
    this.getTags.clear();
  }

  allEntriesAreValid(tags: string[]): boolean {
    return !!tags.find( tag => tag.length === 0);
  }
}
