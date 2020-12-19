import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { ShareStoreService } from '../share-store.service';
import { ShareDataService } from '../../../../service/share-data.service';

@Component({
  selector: 'app-store-hours',
  templateUrl: './store-hours.component.html',
  styleUrls: ['./store-hours.component.css']
})
export class StoreHoursComponent implements OnInit, OnDestroy {

  store: StoreProfile;
  
  subscription: Subscription[] = [];


  timesFormGroup: FormGroup;
  index: number;
  changeView = -1;
  EDIT_HOURS = 0;

  constructor(  private storeService: StoreControllerService, 
                private activeRoute: ActivatedRoute,
                private shareStore: ShareStoreService,
                private share: ShareDataService,
                private fb: FormBuilder) { 
                }

  ngOnDestroy(): void {
    this.subscription.forEach( sub => sub.unsubscribe())
  }

  ngOnInit(): void {

    this.subscription[0] = this.activeRoute.parent.params.subscribe( param => {
      var id = param['id']
      this.subscription[1] = this.storeService.fetchStoreById(id).subscribe( data =>
        this.store =  ( !!this.shareStore.storeProfile && ( this.shareStore.storeProfile.id.match(id))) ? this.shareStore.storeProfile : data
        )
      });

      this.timesFormGroup = this.fb.group({
        end: ['', Validators.required],
        start: ['', Validators.required],
        allDay: ['none', Validators.required]});
    }

    isClicked() {
      this.share.toggle = false;
    }

editAt(index: number): void {
    this.index = index;
    this.changeView = this.EDIT_HOURS;
  }

  get f() { return this.timesFormGroup.controls; }

  editBusinessHour(): void {
    let date: Date = new Date(this.store.businessHours[this.index].open);
    let allDay: string = this.timesFormGroup.get('allDay').value;
    // let openDate: Date = this.store.businessHours[index].open;
    // let closeDate: Date = this.store.businessHours[index].close;

    //we are closed on this date
    this.store.businessHours[this.index].close = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0,0);
    this.store.businessHours[this.index].open = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0,0);
      
    if( allDay.match('open')){
      this.store.businessHours[this.index].close.setHours(23);
      this.store.businessHours[this.index].open.setHours(0);
      this.store.businessHours[this.index].close.setMinutes(59);
      this.store.businessHours[this.index].open.setMinutes(0);
    } if ( allDay.match('none')){
      const start: string = this.timesFormGroup.get('start').value;
      const end: string = this.timesFormGroup.get('end').value;
      this.store.businessHours[this.index].close.setHours(Number(end.split(':')[0]));
      this.store.businessHours[this.index].open.setHours(Number(start.split(':')[0]));
      this.store.businessHours[this.index].close.setMinutes(Number(end.split(':')[1]));
      this.store.businessHours[this.index].open.setMinutes(Number(start.split(':')[1]));
    }

    this.subscription[2] = this.storeService.patch(this.store.id, this.store).subscribe( data => this.store = data);
    
    this.changeView = -1;
    
  }

}
