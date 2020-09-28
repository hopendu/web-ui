
import { Component, OnInit } from '@angular/core';
import { BusinessHours } from '../model/business-hours';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './business-hours-form.component.html',
  styleUrls: ['./business-hours-form.component.css']
})
export class BusinessHoursFormComponent implements OnInit {
  businesHours = new Array<BusinessHours>();
  daysOfTheWeek = daysOfTheWeek;
  timesFormGroup: FormGroup;

  constructor(  private sharedData: SharedService,
                private fb: FormBuilder,
                private router: Router){}

  ngOnInit(): void {
    this.timesFormGroup = new FormGroup({
      times: new FormGroup(daysOfTheWeek.reduce((acc, day) => {
        acc[day] = new FormGroup({
          openTime: new FormControl(''),
          closeTime: new FormControl('')
        });
        return acc;
       }, {}))
    });
  }

  getTimes(day: any){
    return this.timesFormGroup.get('times').get(day) as FormGroup;
  }

  setBusinessHours(){
    
    this.businesHours[6] = this.businesHours.pop();
    this.businesHours[5] = this.businesHours.pop();
    this.businesHours[4] = this.businesHours.pop();
    this.businesHours[3] = this.businesHours.pop();
    this.businesHours[2] = this.businesHours.pop();
    this.businesHours[1] = this.businesHours.pop();
    this.businesHours[0] = this.businesHours.pop();
    this.businesHours.splice(7, this.businesHours.length);
  }
  addBusinesHours(day: BusinessHours.DayEnum, openTime: string, closeTime: string, index: number){
    let dateOpen = new Date();
    let dateClose = new Date();
    this.businesHours.push(
      new BusinessHours(
        this.resetDateGivenDays(this.resetDateGivenTime(dateClose, closeTime), index),
        day,
        this.resetDateGivenDays(this.resetDateGivenTime(dateOpen, openTime), index)
        ))
  }
  private resetDateGivenTime(date: Date, time: string): Date{
    date.setHours(Number(time.split(':')[0]));
    date.setMinutes(Number(time.split(':')[1]));
    return date;
  }

private resetDateGivenDays(date: Date, day: number): Date { 
    let days = this.absolute( day - date.getDay());
    date.setDate(date.getDate() + days);
    return date;
  }

  private absolute(num: number){ if ( num < 0) return -1 * num; return num;}

  btnClick = function () {
    this.setBusinessHours();
    console.log(this.businesHours);
    this.sharedData.setBusinessHours(this.businesHours);
    this.router.navigateByUrl('/form/stock');
  };

}

const daysOfTheWeek = [
  BusinessHours.DayEnum.SUNDAY,
  BusinessHours.DayEnum.MONDAY,
  BusinessHours.DayEnum.TUESDAY,
  BusinessHours.DayEnum.WEDNESDAY,
  BusinessHours.DayEnum.THURSDAY,
  BusinessHours.DayEnum.FRIDAY,
  BusinessHours.DayEnum.SATURDAY
] as const;
