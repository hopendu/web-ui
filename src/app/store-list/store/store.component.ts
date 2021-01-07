import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { ShareStoreService } from './store-detail/share-store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {
  
  @Input() id: string;
  store: Observable<StoreProfile>;
  @Output() clickedEventEmitter = new EventEmitter<string>();
  subscribe: Subscription;
  
  constructor( private router: Router,
    private storeService: StoreControllerService,
    private shareStore: ShareStoreService) { }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  ngOnInit(): void {

   this.store = this.storeService.fetchStoreById(this.id);
   this.subscribe = this.store.subscribe( data => this.shareStore.storeProfile = data);
  }

  isClicked() {
    this.clickedEventEmitter.emit(this.id);
  }

}
