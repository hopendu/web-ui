import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareStoreService } from './share-store.service';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { AlertService } from 'src/app/_services/alert.service';
import { share } from 'rxjs/operators';

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
                private shareStore: ShareStoreService,
                private alertService: AlertService){
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

  
  deleteStore(): void{

  
    this.subscription[2] = this.storeService.delete(this.shareStore.storeProfile.id).subscribe(
      data => { this.back(); this.alertService.success(`Succesful deleted ${this.storeName}`, true); },
      error => this.alertService.error(`Write ${this.storeName} in the input field.`)
      ) 
  }
    
  back(): void {
    this.router.navigate([''], { queryParams : { id: this.shareStore.storeProfile.ownerId}})
    .catch( error => window.history.back());
  }  
}
