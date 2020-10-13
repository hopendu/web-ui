import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { StoreInfo } from '../model/store-info';
import { UploadService } from '../service/upload.service';
import { ShareDataService } from '../service/share-data.service';
import { Router, NavigationExtras } from '@angular/router';

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
              private router: Router, private share: ShareDataService) { }

  ngOnInit(): void {
    this.storeInfoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      emailAddress: ['', Validators.email],
      userId: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber:  ['', Validators.required],
      regNumber: ['', Validators.required],
      tags: this.fb.array([])
    });

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

  btnClick = function () {


    if (this.storeInfoForm.invalid){  return; }

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
        'https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(file)
    );
    this.router.navigate(['/form/bank'])
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
