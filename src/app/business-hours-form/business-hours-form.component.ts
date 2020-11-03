
import { Component, OnInit } from '@angular/core';
import { BusinessHours } from '../model/business-hours';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './business-hours-form.component.html',
  styleUrls: ['./business-hours-form.component.css']
})
export class BusinessHoursFormComponent implements OnInit {
  
  businessHours = new Array<BusinessHours>();
  hours = new Array<Hours>();
  daysOfTheWeek = daysOfTheWeek;
  timesFormGroup: FormGroup;
  submitted = false;

  constructor(  private fb: FormBuilder,
                private share: ShareDataService,
                private router: Router){}

  ngOnInit(): void {
    this.timesFormGroup = new FormGroup({
      times: new FormGroup(daysOfTheWeek.reduce((acc, day) => {
        acc[day] = new FormGroup({
          openTime: new FormControl('', Validators.required),
          closeTime: new FormControl('', Validators.required)
        });
        return acc;
       }, {}))
    });
  }

  get f() { return this.timesFormGroup.controls; }


  getOperatingHoursPerDay( group: FormGroup): void {
    let openTime = '';
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if( abstractControl instanceof FormGroup){
        this.getOperatingHoursPerDay(abstractControl);
      } else {
         if( key.match("openTime")) openTime = abstractControl.value; 
         else this.hours.push( new Hours(openTime, abstractControl.value));
      }
    })
  }

  getTimes(day: any){
    return this.timesFormGroup.get('times').get(day) as FormGroup;
  }
  
  setBusinessHours(){
    this.getOperatingHoursPerDay(this.timesFormGroup);
    this.daysOfTheWeek.forEach((dayOfTheWeek,index) => {
      let hours = this.hours.pop();
      this.addBusinessHours(dayOfTheWeek, hours.openTime, hours.closeTime, ++index)
      this.share.addBusinessHours(this.businessHours[index - 1])
    });
  }
  
  private addBusinessHours( day: BusinessHours.DayEnum, openTime: string, closeTime: string, index: number){
    let dateOpen = new Date();
    let dateClose = new Date();
    this.businessHours.push(
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
    const dayToday = date.getDay();
    const diff = this.absolute(dayToday - day);
    if ( day < dayToday) {
      date.setDate( date.getDate() - diff);
      date.setDate( date.getDate() + 7);
    }
    if( day == dayToday) 
      date.setDate( date.getDate() + 7 );
    if( day > dayToday) 
      date.setDate( date.getDate() + diff);
    date.setHours(date.getHours() /*+ 2*/);
    return date;
  }

  private absolute(num: number){ if ( num < 0) return (-1 * num); return num;}

  

  btnClick = function () {
    this.submitted = true;
    if (this.timesFormGroup.invalid){ return; }
    this.setBusinessHours();
    this.share.setBusinessHours(this.businessHours);
    this.router.navigateByUrl('/form/stock');  
  };

  backClick = function (){
    this.router.navigateByUrl('');
  }

  update(): void {
    this.timesFormGroup.reset();
    this.timesFormGroup = new FormGroup({
      times: new FormGroup(daysOfTheWeek.reduce((acc, day) => {
        acc[day] = new FormGroup({
          openTime: new FormControl('', Validators.required),
          closeTime: new FormControl('', Validators.required)
        });
        return acc;
       }, {}))
    });
    this.businessHours.splice(0, this.businessHours.length);
    this.share.setBusinessHours(this.businessHours)
    console.log(this.businessHours);
    //this.timesFormGroup.patchValue()
  }
}

const daysOfTheWeek = [ 
  BusinessHours.DayEnum.MONDAY,
  BusinessHours.DayEnum.TUESDAY,
  BusinessHours.DayEnum.WEDNESDAY,
  BusinessHours.DayEnum.THURSDAY,
  BusinessHours.DayEnum.FRIDAY,
  BusinessHours.DayEnum.SATURDAY,
  BusinessHours.DayEnum.SUNDAY
] as const;

class Hours{
  constructor(public openTime: string,
    public closeTime: string){}
  
}