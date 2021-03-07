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
export class StockImagesComponent implements OnInit{
  
  @Input() stock: Stock;
  
  
  
  constructor() { }
  

  ngOnInit(): void {
  }

 

}
