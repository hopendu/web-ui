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

  store: Observable<StoreProfile>;
  
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
      this.store =  ( !!this.shareStore.storeProfile && ( this.shareStore.storeProfile.id.match(id))) ? of(this.shareStore.storeProfile) : this.storeService.fetchStoreById(id);
    })

  }
}
