import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { StoreControllerService } from '../service/store-controller.service';
import { StoreProfile } from '../model/store-profile';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';
import { StoreInfo } from '../model/store-info';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-store-registration-form',
  templateUrl: './store-registration-form.component.html',
  styleUrls: ['./store-registration-form.component.css']
})
export class StoreRegistrationFormComponent implements OnInit {

  storeProfile: StoreProfile;

  constructor(private sharedData: SharedService,
              private service: StoreControllerService) {
               }

  ngOnInit(): void {
    if( this.sharedData.getStoreProfile() === null ) return;
    /*this.service.create(this.sharedData.getStoreProfile())
                .subscribe(storeProfile => this.storeProfile = storeProfile)
                );*/
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.storeProfile, null, 4));
  }
}
