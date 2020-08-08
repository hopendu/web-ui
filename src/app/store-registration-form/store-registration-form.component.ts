import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { StoreControllerService } from '../service/store-controller.service';
import { StoreProfile } from '../model/store-profile';
import { Bank } from '../model/bank';
import { BusinessHours } from '../model/business-hours';
import { Stock } from '../model/stock';
import { StoreInfo } from '../model/store-info';

@Component({
  selector: 'app-store-registration-form',
  templateUrl: './store-registration-form.component.html',
  styleUrls: ['./store-registration-form.component.css']
})
export class StoreRegistrationFormComponent implements OnInit {

  storeProfile: StoreProfile;
  storeProfileRegistrationForm: FormGroup;

  constructor(private service: StoreControllerService,
              private fb: FormBuilder) {
               }

  ngOnInit(): void {
    this.storeProfileRegistrationForm = this.fb.group({
      badge: [Number],
      bank: [Bank],
      businessHours: [BusinessHours],
      storeInfo: [StoreInfo],
      featured: [Boolean],
      featuredExpiry: [Date],
      hasVat: [Boolean],
      imageUrl: [''],
      stockList: [Stock],
      yearsInService: [Number]
    });
  }











}
