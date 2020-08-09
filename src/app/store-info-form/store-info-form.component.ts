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
  storeProfile: StoreProfile;
  storeInfoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private storeControllerServices: StoreControllerService,
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
      tags: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });

  }


  get getTags(): FormArray {
    return this.storeInfoForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.getTags.push(this.fb.control(''));
  }

  deleteTag( index: number): void{
    ( this.storeInfoForm.get('tags') as FormArray).removeAt(index);
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.storeInfoForm.invalid){  return; }
    /*if (this.allEntriesAreValid(this.storeInfoForm.get('tags').value)){ return; }*/

    const file = this.toFile.item(0);
    this.uploadService.fileUpload(file);

    const storeInfo = new StoreInfo(
        this.storeInfoForm.get('address').value,
        this.storeInfoForm.get('description').value,
        this.storeInfoForm.get('userId').value,
        this.storeInfoForm.get('mobileNumber').value,
        this.storeInfoForm.get('name').value,
        this.storeInfoForm.get('regNumber').value,
        this.storeInfoForm.get('tags').value,
        'https://izinga-aws.s3.amazonaws.com/index.jpeg',
        [new BusinessHours(
          new Date(),
          BusinessHours.DayEnum.MONDAY ,
          new Date())]);
    this.add(storeInfo);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.storeInfoForm.value, null, 4));
    /*

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['form/store-info']));

    */
  }
  onChange(event): void {
    this.toFile = event.target.files;

  }
  add(storeInfo: StoreInfo): void {
    const storeProfile = new StoreProfile(
      storeInfo.address,
      0,
      new Bank('', '', '', ''),
      storeInfo.businessHours,
      new Date(),
      storeInfo.description,
      false,
      new Date(),
      false,
      null,
      storeInfo.imageUrl,
      0,
      0,
      0,
      storeInfo.mobileNumber,
      new Date(),
      storeInfo.name,
      storeInfo.userId,
      storeInfo.regNumber,
      0,
      StoreProfile.RoleEnum.STOREADMIN,
      0,
      new Array<Stock>(),
      storeInfo.tags,
      '',
      0 );


      /*

          this.storeControllerServices.create(storeProfile).subscribe( p => {this.storeProfile = p;
                                                                       alert('SUCCESS!! :-)\n\n' + JSON.stringify(p.id, null, 4)); });



                                                                       */
    this.storeControllerServices.create(storeProfile).subscribe( p => this.storeProfile = p);

  }

  onReset(): void {
    this.submitted = false;
    this.storeInfoForm.reset();
  }

  allEntriesAreValid(tags: string[]): boolean {
    return !!tags.find( tag => tag.length === 0);
  }


}
