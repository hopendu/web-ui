import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { StoreInfo } from '../model/store-info';
import { StoreControllerService } from '../service/store-controller.service';
import { UploadService } from '../service/upload.service';
import { StoreProfile } from '../model/store-profile';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
              private uploadService: UploadService,
              private router: Router) { }

  ngOnInit(): void {
    this.storeInfoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      userId: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber:  ['', Validators.required],
      regNumber: ['', Validators.required],
      tags: this.fb.array([ this.tags ])
    });

  }

  get tags(): FormGroup {
    return this.fb.group({
      tag: ''
    });
  }

  get getTags(): FormArray {
    return this.storeInfoForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.getTags.push(this.tags);
  }

  deleteTag( index: number): void{
    ( this.storeInfoForm.get('tags') as FormArray).removeAt(index);
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.storeInfoForm.invalid){  return; }

    const file = this.toFile.item(0);

    this.storeInfo = new StoreInfo(
        this.storeInfoForm.get('address').value,
        this.storeInfoForm.get('description').value,
        this.storeInfoForm.get('userId').value,
        this.storeInfoForm.get('mobileNumber').value,
        this.storeInfoForm.get('name').value,
        this.storeInfoForm.get('regNumber').value,
        this.storeInfoForm.get('tags').value,
        'https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(file));
    //this.add(storeInfo);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.storeInfoForm.value, null, 4));
    /*

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['form/store-info']));

    */
  }
  onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
    this.toFile = event.target.files;
  }

  add(storeInfo: StoreInfo): void {
  }

  onReset(): void {
    this.submitted = false;
    this.storeInfoForm.reset();
    this.getTags.clear();
  }

  allEntriesAreValid(tags: string[]): boolean {
    return !!tags.find( tag => tag.length === 0);
  }


}
