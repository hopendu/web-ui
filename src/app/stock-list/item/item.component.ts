import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Output() clickedEventEmitter = new EventEmitter<Stock>();
  
  @Input() id: string;
  @Input() stock: Stock;
  imageUrl: string;
  
  constructor(  private storeService: StoreControllerService,
                private alert: AlertService) {}

  ngOnInit() {
    this.imageUrl = !!this.stock.images ? this.stock.images[0] : null;
  }

  isClicked() {
    this.clickedEventEmitter.emit(this.stock);
  }
  
}
