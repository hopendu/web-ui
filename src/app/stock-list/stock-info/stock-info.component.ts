import { Component, Input, OnInit } from '@angular/core';
import { SelectionOption } from 'src/app/model/selection-option';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  @Input() stock: Stock;
  selectionOptions: SelectionOption[];
  constructor( ) { }

  ngOnInit() {
    this.selectionOptions = this.stock.mandatorySelection;
  }
}
