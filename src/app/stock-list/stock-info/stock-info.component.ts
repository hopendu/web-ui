import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionOption } from 'src/app/model/selection-option';
import { Stock } from 'src/app/model/stock';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  @Input() stock: Stock;
  selectionOptions: SelectionOption[];
  
  constructor(  private activeRoute: ActivatedRoute,
    private storeService: StoreControllerService ) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(params => {
      var id = params['id']
      console.log(`Id is  ${id}`)
      this.storeService.getStoreById(id);
    })

    this.selectionOptions = this.stock.mandatorySelection;
  }
}
