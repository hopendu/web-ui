import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from '../model/stock';
import { StoreControllerService } from '../service/store-controller.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-stock-images',
  templateUrl: './stock-images.component.html',
  styleUrls: ['./stock-images.component.css']
})
export class StockImagesComponent implements OnInit , OnDestroy {
  
  @Input() stock: Stock;
  subscription: Subscription[] = [];
  
  constructor(  private storeService: StoreControllerService,
                private alertService: AlertService,
                private activeRoute: ActivatedRoute) {
   }

   ngOnDestroy(): void {
    this.subscription.forEach( sub => sub.unsubscribe);
  }

  ngOnInit(): void {
  }

  deleteImage( index: number): void {
    this.subscription[0] = this.storeService.fetchStoreById(this.activeRoute.snapshot.params['id']).subscribe( data => {
     
      let stockSubject =  data.stockList.find( value => value.name.match(this.stock.name));
      stockSubject.images.splice( index, 1);

      data.stockList =  data.stockList.filter( value => !(value.name.match(this.stock.name)));

      data.stockList.push(stockSubject);

      this.subscription[1] = this.storeService.patch(this.activeRoute.snapshot.params['id'], data).subscribe( data2 => {
        this.alertService.success(`Succesful deleted image of ${this.stock.name}.`, true)
        window.history.back();
      }, 
      err => {
        this.alertService.error(`Faluire to deleted image of ${this.stock.name}.`, true)
      })
   })
 }

}
