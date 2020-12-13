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
  
  constructor(private share: ShareDataService, private activeRoute: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private storeService: StoreControllerService) { }

  ngOnInit(): void {
    //this.store = this.share.store;
    this.activeRoute.params.subscribe(params => {
      var id = params['id']
      console.log(`Id is  ${id}`)
      this.storeService.getStoreById(id).subscribe( data => this.store = data);
    })
  }
  
  addStore(): void{

  }

  deleteStore(): void{

  }

  
}
