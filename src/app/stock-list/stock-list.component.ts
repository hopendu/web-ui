import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from '../model/stock';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stock: Stock;
  stockList = new Array<Stock>();
  status = false;
  
  constructor(private share: ShareDataService,
    private router: Router) { }

  ngOnInit() {
    this.getStockList();
    this.status = false;
  }

  getStockList() {
    this.stockList = this.share.stockList; 
  }

  hideDetail(event) {
    this.getStockList();
    this.status = false;
  }

  isClicked(event: Stock) {
    this.stock = event;
    this.status = true;
  }
  back = function () {
    this.router.navigate(['/form']);
    //this.router.navigate(['/form/bank'])
  };

}
