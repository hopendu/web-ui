import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StoreProfile } from 'src/app/model/store-profile';
import { ShareDataService } from 'src/app/service/share-data.service';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  @Input() id: string;

  store: StoreProfile;

  constructor( private router: Router,
    private share: ShareDataService, 
    private storeService: StoreControllerService) { }

  ngOnInit(): void {
   //this.share.store = this.store;

   this.storeService.getStoreById(this.id).subscribe( data => this.store = data);
  }

  isClicked() {
    this.share.store = this.store;
    this.share.toggle = true;
  }

}
