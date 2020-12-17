import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StoreProfile } from '../model/store-profile';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit, OnDestroy {

  status: Boolean =false;
  subscription: Subscription;
  storeList: Observable<StoreProfile[]>;

  constructor(  private storeService: StoreControllerService,
                private activeRoute: ActivatedRoute){
                }
  
  ngOnInit(): void {
    this.subscription = this.activeRoute.queryParams.subscribe( params  => {
      var id = params['id']
      this.storeList = this.storeService.fetchStoreListByOwnerId(id)
    })
  }

  showDetail(event: string): void {
    this.status = !this.status;
  }

  isClicked(event: string): void {
    this.status = !this.status;
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
