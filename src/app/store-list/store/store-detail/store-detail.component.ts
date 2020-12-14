import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bool } from 'aws-sdk/clients/clouddirectory';
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

  @Output() hideDetailEventEmitter = new EventEmitter<Boolean>();
  store: StoreProfile;
  @Input() id: string;

  // constructor(private share: ShareDataService, private activeRoute: ActivatedRoute,
  //   private router: Router, private fb: FormBuilder, private storeService: StoreControllerService) { }
  constructor(private storeService: StoreControllerService){}
  ngOnInit(): void {
    //this.store = this.share.store;
    // this.activeRoute.params.subscribe(params => {
    //   var id = params['id']
    //   console.log(`Id is  ${id}`)
    //   this.storeService.getStoreById(id).subscribe( data => this.store = data);
    // })
    this.storeService.getStoreById(this.id).subscribe( data => this.store = data);
  }
  
  hideDetail() {
    this.hideDetailEventEmitter.emit(true);
  }

  addStore(): void{

  }

  deleteStore(): void{

  }

  
}
