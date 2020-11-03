import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Output() clickedEventEmitter = new EventEmitter<Stock>();
  @Input() stock: Stock;
  imageUrl: string;
  
  constructor() {}

  ngOnInit() {
    this.imageUrl = this.stock.images[0];
  }

  isClicked() {
    this.clickedEventEmitter.emit(this.stock);
  }
  

}
