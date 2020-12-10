import { Component, Input, OnInit } from '@angular/core';
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

  @Input() id: string;
  stockList: Observable<Stock[]>;
  status: Boolean = false;
  stock: Stock;

  constructor( private storeService: StoreControllerService) { }

  ngOnInit(): void {
    this.stockList = this.storeService.getStockByStoreId(this.id);
  }

  hideDetail(event: Stock): void {
    this.stock  = event;
    this.status = !this.status;
  }

  isClicked(event: Stock): void {
    this.stock = event;
  }

}
