import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { StoreProfile } from 'src/app/model/store-profile';
import { ShareStoreService } from './share-store.service';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Output() hideDetailEventEmitter = new EventEmitter<Boolean>();
  
  storeName: string;

  subscription: Subscription[] = [];

  constructor(  private activeRoute: ActivatedRoute,
                private storeService: StoreControllerService,
                private router: Router,
                private shareStore: ShareStoreService){
                }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe);
  }

  ngOnInit(): void {
   this.subscription[0] = this.activeRoute.params.subscribe(params => {
      var id = params['id']
      this.subscription[1] = this.storeService.fetchStoreById(id)
        .subscribe( data => { this.storeName = data.name; this.shareStore.storeProfile = data});
    })
  }
  
  hideDetail() {
    this.hideDetailEventEmitter.emit(true);
  }

  addStore(): void{}
  
  deleteStore(): void{}

  back(): void {
    this.router.navigateByUrl(`stores?id=${this.shareStore.storeProfile.ownerId}`)
    .catch( error => window.history.back());
  }  
}
