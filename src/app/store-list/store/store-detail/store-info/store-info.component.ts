import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { ShareStoreService } from '../share-store.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit, OnDestroy {

  store: StoreProfile;
  
  subscription: Subscription;

  constructor(  private storeService: StoreControllerService, 
                private activeRoute: ActivatedRoute,
                private shareStore: ShareStoreService) { 
                }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription = this.activeRoute.parent.params.subscribe( param => {
      var id = param['id']
      if(!!this.shareStore.storeProfile && ( this.shareStore.storeProfile.id.match(id))) {
        this.store = this.shareStore.storeProfile
      } else {
        this.storeService.fetchStoreById(id).subscribe(store => this.store = store)
      }
    })

  }
}
