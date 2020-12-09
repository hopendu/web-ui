import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessHours } from 'src/app/model/business-hours';
import { StoreProfile } from 'src/app/model/store-profile';
import { ShareDataService } from 'src/app/service/share-data.service';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {

  store: StoreProfile;
  timesFormGroup: FormGroup;
  index: number;
  changeView = -1;
  EDIT_HOURS = 0;

  constructor(private share: ShareDataService, private activeRoute: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private storeService: StoreControllerService) { }

  ngOnInit(): void {
    //this.store = this.share.store;
    this.activeRoute.params.subscribe(params => {
      var id = params['id']
      console.log(`Id is  ${id}`)
      this.storeService.getStoreById(id).subscribe( data => this.store = data);
    })

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

  editStore(store: StoreProfile): void {
    this.share.store = store;
    this.router.navigateByUrl('form/store-info');
  }

  addStore(): void{

  }

  deleteStore(): void{

  }

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

    this.changeView = -1;
    
  }
}
