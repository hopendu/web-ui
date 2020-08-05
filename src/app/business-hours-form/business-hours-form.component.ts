import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BusinessHours } from '../model/business-hours';
import { StoreProfile } from '../model/store-profile';

@Component({
  selector: 'app-basiness-hours-form',
  templateUrl: './business-hours-form.component.html',
  styleUrls: ['./business-hours-form.component.css']
})
export class BusinessHoursFormComponent implements OnInit {

  businessHours = new Array<BusinessHours>();
  businessHoursForm = new FormArray([]);
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  addHours(): void {
    const group = new FormGroup({
      open: new FormControl(Date),
      day: new FormControl(BusinessHours.DayEnum),
      close: new FormControl(Date)
    });

    this.businessHoursForm.push(group);

    this.businessHours.push(new BusinessHours(group.get('close').value,
    group.get('day').value, group.get('open').value));
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.businessHoursForm.invalid){  return; }

    this.add(this.businessHours);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.businessHours, null, 4));
  }

  add(businessHours: BusinessHours[]): void{

  }

  onReset(): void {
    this.submitted = false;
    this.businessHoursForm.reset();
  }

}
