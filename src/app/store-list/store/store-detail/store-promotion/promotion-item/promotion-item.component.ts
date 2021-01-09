import { Component, OnInit, Input } from '@angular/core';
import { Promotion } from 'src/app/model/promotion';

@Component({
  selector: 'app-promotion-item',
  templateUrl: './promotion-item.component.html',
  styleUrls: ['./promotion-item.component.css']
})
export class PromotionItemComponent implements OnInit {

  @Input() promotion: Promotion;
  
  constructor() { }

  ngOnInit(): void {
  }
}
