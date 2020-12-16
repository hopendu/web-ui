import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bool } from 'aws-sdk/clients/clouddirectory';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/model/stock';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store-inventory',
  templateUrl: './store-inventory.component.html',
  styleUrls: ['./store-inventory.component.css']
})
export class StoreInventoryComponent implements OnInit {

  stockList: Observable<Stock[]>;
  status: Boolean = false;
  stock: Stock;

  constructor( private storeService: StoreControllerService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {


    this.activeRoute.parent.params.subscribe( param => {
      var id = param['id']
      this.stockList = this.storeService.getStockByStoreId(id)
    })
    // this.activeRoute.queryParams.subscribe( param => {
    //   var id = param['id']
    //   this.stockList = this.storeService.getStockByStoreId(id)
    // })
    
  }

  hideDetail(event: Stock): void {
    this.stock  = event;
    this.status = !this.status;
  }

  isClicked(event: Stock): void {
    this.status = !this.status;
    this.stock = event;
  }

}
