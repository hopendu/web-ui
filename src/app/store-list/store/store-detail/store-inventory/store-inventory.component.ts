import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  storeId: string;
  status: Boolean = false;
  stockList: Observable<Stock[]>;
  
  subscription: Subscription;

  constructor(  private storeService: StoreControllerService,
                private activeRoute: ActivatedRoute,
                private router: Router,
                private shareStore: ShareStoreService) { 
                }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.activeRoute.parent.params.subscribe( param => {
      var id = param['id']
      this.storeId = id;
      this.stockList = ( !!this.shareStore.storeProfile && ( this.shareStore.storeProfile.id.match(id))) ? of( this.shareStore.storeProfile.stockList) : this.storeService.fetchStockByStoreId(id)
    })
  }

  add(event): void {
    event.preventDefault();
    this.router.navigateByUrl('/form/stock-list', { skipLocationChange: true }).then(() => {
      this.router.navigate(['form/stock'], {queryParams:{ id: 'create', storeId: this.activeRoute.parent.snapshot.params.id }});}); 
};


  hideDetail(event: Stock): void {
    this.stock = event;
    this.status = !this.status;
  }

  isClicked(event: Stock): void {
    this.stock = event;
    this.status = !this.status;
  }
}
