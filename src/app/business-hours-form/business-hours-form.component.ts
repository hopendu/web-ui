
import { Component, OnInit } from '@angular/core';
import { BusinessHours } from '../model/business-hours';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DlDateTimePickerComponent } from 'angular-bootstrap-datetimepicker';

@Component({
  selector: 'app-stock-form',
  templateUrl: './business-hours-form.component.html',
  styleUrls: ['./business-hours-form.component.css']
})
export class BusinessHoursFormComponent implements OnInit {

  submitted = false;
  businessHoursFormGroup: FormGroup;

  selectedDate = new FormControl(Date);


  constructor(private fb: FormBuilder) {
    this.businessHoursFormGroup = this.fb.group({
      hours: this.fb.array([
        this.fb.group({
          open: new FormControl(Number, Validators.required),
          day: new FormControl('', Validators.required),
          close: new FormControl(Number, Validators.required),
        }),
      ])
    });
  }

  ngOnInit(): void {


  }

  write(): void{
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.selectedDate.value, null, 4));
  }
  get getBussinessHours(): FormArray {
    return this.businessHoursFormGroup.get('hours') as FormArray;
  }
  addBusinessHours(): void {
    const fg = this.fb.group({
      open: [DlDateTimePickerComponent],
      day: [''],
      close: [DlDateTimePickerComponent],
    });
    if (this.businessHoursFormGroup.invalid){  return; }
    ( this.businessHoursFormGroup.get('hours') as FormArray).push(fg);
  }

  deleteBusinessHours( index: number): void{
    ( this.businessHoursFormGroup.get('hours') as FormArray).removeAt(index);
  }
  onSubmit(): void {

    this.submitted = true;

    if (this.businessHoursFormGroup.get('hours').invalid){  return; }
    this.send(this.businessHoursFormGroup.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.businessHoursFormGroup.value, null, 4));
  }
  send(hours: BusinessHours[]): void {

  }

  onReset(): void {
    this.submitted = false;
    this.businessHoursFormGroup.reset();
  }

}

