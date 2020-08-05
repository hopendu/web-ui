import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { StoreControllerService } from '../service/store-controller.service';
import { StoreProfile } from '../model/store-profile';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-store-registration-form',
  templateUrl: './store-registration-form.component.html',
  styleUrls: ['./store-registration-form.component.css']
})
export class StoreRegistrationFormComponent implements OnInit {


  bank: Bank;
  profile: StoreProfile;
  stock = new Array<Stock>();
  businessHours = new Array<BusinessHours>();

  storeProfileRegistrationForm = new FormGroup({});

  constructor(private service: StoreControllerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
