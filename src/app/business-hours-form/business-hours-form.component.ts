
import { Component, OnInit } from '@angular/core';
import { BusinessHours } from '../model/business-hours';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './business-hours-form.component.html',
  styleUrls: ['./business-hours-form.component.css']
})
export class BusinessHoursFormComponent implements OnInit {
  

  day: number;
  ownerId: string;
  submitted = false;
  timesFormGroup: UntypedFormGroup;
  days = new Array<number>();
  hours = new Array<Hours>();
  daysOfTheWeek = daysOfTheWeek;
  businessHours = new BusinessHours();
  urlParams = new URLSearchParams(window.location.search);

  constructor(  private fb: UntypedFormBuilder,
                private share: ShareDataService,
                private router: Router,
                private activeRouter: ActivatedRoute){}

        ngOnInit(): void {
              this.timesFormGroup = this.fb.group({
                    date: ['', Validators.required],
                    end: ['', Validators.required],
                    start: ['', Validators.required],
                    allDay: ['none', Validators.required]});
                    this.ownerId = this.urlParams.get('id');
                    for( let i = 0; i < 7; i++){ this.days.push(i);}
                    this.day = this.days.shift();
                }

  get f() { return this.timesFormGroup.controls; }


  setBusinessHours(): void {
    const date: Date = new Date(this.timesFormGroup.get('date').value);
    const allDay: string = this.timesFormGroup.get('allDay').value;
    this.businessHours.day = this.daysOfTheWeek[this.day];
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
    this.share.addBusinessHours(this.businessHours);
  }
  btnClick(): void {
    if (this.timesFormGroup.invalid){  return; }
    this.setBusinessHours();
    if( this.days.length > 0){ this.day = this.days.shift();
      this.router.navigateByUrl("/form/business-hours", { skipLocationChange: true }).then(() => {
        this.router.navigate(['form/business-hours'], {queryParams:{ oi: this.activeRouter.snapshot.queryParams['oi']}});});
    } else {
    for( let i = 0; i < 7; i++){ this.days.push(i);}
      this.day = this.days.shift();
      this.router.navigateByUrl("/form/stock", { skipLocationChange: true }).then(() => {
        this.router.navigate(['form/stock'], {queryParams:{ oi: this.activeRouter.snapshot.queryParams['oi']}});});
    }
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