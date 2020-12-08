import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { StoreInfo } from '../model/store-info';
import { UploadService } from '../service/upload.service';
import { ShareDataService } from '../service/share-data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Service } from 'aws-sdk/global';
import { StoreControllerService } from '../service/store-controller.service';

@Component({
  selector: 'app-store-info-form',
  templateUrl: './store-info-form.component.html',
  styleUrls: ['./store-info-form.component.css']
})
export class StoreInfoFormComponent implements OnInit {

  toFile: { item: (arg0: number) => any; };
  submitted = false;
  show = true;
  storeInfo: StoreInfo;
  storeInfoForm: FormGroup;
  
  constructor(private uploadService: UploadService,
              private fb: FormBuilder,
              private router: Router, 
              private share: ShareDataService,
              private service: StoreControllerService){ }

  ngOnInit(): void {

    if( !!this.share.store){
      this.storeInfoForm = this.fb.group({
        name: [this.share.store.name, Validators.required],
        description: [this.share.store.description, Validators.required],
        emailAddress: [this.share.store.emailAddress, [Validators.required, Validators.email]],
        userId: [this.share.store.ownerId, Validators.required],
        address: [this.share.store.address, Validators.required],
        mobileNumber:  [this.share.store.mobileNumber, Validators.required],
        regNumber: [this.share.store.regNumber, Validators.required],
        tags: this.fb.array([])
      });

      this.share.store.tags.forEach( tag => this.getTags.push(new FormControl(tag)));
      
    }
    else{
      this.storeInfoForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        userId: ['', Validators.required],
        address: ['', Validators.required],
        mobileNumber:  ['', Validators.required],
        regNumber: ['', Validators.required],
        tags: this.fb.array([])
      });
  
    }
    
  }

  // tags(): FormGroup {
  //   return this.fb.group({
  //     tag: ''
  //   });
  // }

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

  btnClick = function () {

    this.submitted = true;

    if (this.storeInfoForm.invalid){ ("WARNING: INVALID INPUT!\n1. All fields must be field.\n2. Use email address formart (i.e. xx@.yy.com) for email address.\n3. Ensure correct phone number format."); return; }

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

    if(!! this.share.store){

      this.share.store.name = this.share.storeInfo.name;
      this.share.store.address = this.share.storeInfo.address;
      this.share.store.emailAddress = this.share.storeInfo.emailAddress;
      this.share.store.mobileNumber = this.share.storeInfo.mobileNumber;
      this.share.store.regNumber = this.share.storeInfo.regNumber;
      this.share.store.description = this.share.storeInfo.description;
      this.share.store.tags = this.share.storeInfo.tags;
      this.share.store.ownerId = this.share.storeInfo.userId;
      this.share.store.imageUrl = this.share.storeInfo.imageUrl;
      this.router.navigateByUrl('/form');
    } else {
      this.router.navigate(['/form/business-hours']);
    }
    //this.router.navigate(['/form/bank'])
    this.onReset();
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
