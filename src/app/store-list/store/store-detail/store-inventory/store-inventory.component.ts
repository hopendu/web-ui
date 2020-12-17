import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bool } from 'aws-sdk/clients/clouddirectory';
import { Observable, of, Subscription } from 'rxjs';
import { Stock } from 'src/app/model/stock';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { ShareStoreService } from '../share-store.service';

@Component({
  selector: 'app-store-inventory',
  templateUrl: './store-inventory.component.html',
  styleUrls: ['./store-inventory.component.css']
})
export class StoreInventoryComponent implements OnInit, OnDestroy{

  stock: Stock;
  status: Boolean = false;
  stockList: Observable<Stock[]>;
  
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
      this.stockList = ( !!this.shareStore.storeProfile && ( this.shareStore.storeProfile.id.match(id))) ? of( this.shareStore.storeProfile.stockList) : this.storeService.fetchStockByStoreId(id)
    })
  }

  hideDetail(event: Stock): void {
    this.stock = event;
    this.status = !this.status;
  }

  isClicked(event: Stock): void {
    this.stock = event;
    this.status = !this.status;
  }
}
