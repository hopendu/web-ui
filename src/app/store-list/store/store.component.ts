import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StoreProfile } from 'src/app/model/store-profile';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  @Input() store: StoreProfile;

  constructor( private router: Router,
    private share: ShareDataService) { }

  ngOnInit(): void {
   this.share.store = this.store;
  }

  isClicked() {
    this.share.store = this.store;
    this.share.toggle = true;
  }

}
