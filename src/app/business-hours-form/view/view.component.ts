import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessHours } from 'src/app/model/business-hours';
import { ShareDataService } from 'src/app/service/share-data.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  businessHours = new BusinessHours();
  hours = new Array<Hours>();
  daysOfTheWeek = daysOfTheWeek;
  timesFormGroup: FormGroup;
  submitted = false;
  day: BusinessHours.DayEnum;
  // days = new Array<number>();

  constructor(  private fb: FormBuilder,
                private share: ShareDataService,
                private router: Router,
                private _location: Location){}

        ngOnInit(): void {
              this.timesFormGroup = this.fb.group({
                    end: ['', Validators.required],
                    start: ['', Validators.required],
                    allDay: ['none', Validators.required]});

                    // for( let i = 0; i < 7; i++){ this.days.push(i);}
                    // this.day = this.days.shift();
                    this.day = this.share.editBusinessHours.day;
                }

  get f() { return this.timesFormGroup.controls; }


  setBusinessHours(): void {
    const date: Date = new Date(this.timesFormGroup.get('date').value);
    const allDay: string = this.timesFormGroup.get('allDay').value;
    this.businessHours.day = this.share.editBusinessHours.day;
    this.businessHours.close = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0,0);
    this.businessHours.open = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0,0);
    if(allDay.match('open')){
      this.businessHours.close.setHours(23);
      this.businessHours.open.setHours(0);
      this.businessHours.close.setMinutes(59);
      this.businessHours.open.setMinutes(0);
    } else if(allDay.match('none')){
      const start: string = this.timesFormGroup.get('start').value;
      const end: string = this.timesFormGroup.get('end').value;
      this.businessHours.close.setHours(Number(end.split(':')[0]));
      this.businessHours.open.setHours(Number(start.split(':')[0]));
      this.businessHours.close.setMinutes(Number(end.split(':')[1]));
      this.businessHours.open.setMinutes(Number(start.split(':')[1]));
    }
    //this.share.addBusinessHours(this.businessHours);
    // this.share.getBusinessHours().forEach( (b , i) => {
    //   if ( b.day.match(this.businessHours.day)){
    //       b.close = this.businessHours.close;
    //       b.open = this.businessHours.open;
    //       b.day = this.businessHours.day;
    //   }
    // })
  }

  btnClick = function () {
    if (this.timesFormGroup.invalid){  return; }
    this.setBusinessHours();
    // this.router.navigateByUrl('/form');
    this._location.back();
    this.timesFormGroup.reset();
    this.timesFormGroup.get('allDay').setValue("none");
  };


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