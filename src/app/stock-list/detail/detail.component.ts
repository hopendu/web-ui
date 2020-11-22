import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Output() hideDetailEventEmitter = new EventEmitter<Boolean>();
  @Input() stock: Stock;
  imageUrl: string;

  constructor( private share:ShareDataService) {
     
  }

  hideDetail() {
    
    this.hideDetailEventEmitter.emit(true);
  }
  
  ngOnInit() {
    this.imageUrl = this.stock.images[0];
  }


  edit = function () {
    //this.router.navigate(['/form/stock-item']);
  };

}
