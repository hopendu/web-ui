import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StoreProfile } from '../model/store-profile';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit, OnDestroy {
  id: string;
  ownerId: string;
  status: Boolean =false;
  subscription: Subscription;
  storeList: Observable<StoreProfile[]>;

  urlParams = new URLSearchParams(window.location.search);

  constructor(  private storeService: StoreControllerService,
                private activeRoute: ActivatedRoute,
                private router: Router){
                }
  ngOnInit(): void {
    this.subscription = this.activeRoute.queryParams.subscribe( params  => {
      this.id = params['id']
      this.ownerId = this.urlParams.get('id');
      this.storeList = this.storeService.fetchStoreListByOwnerId(this.id)
    })
    this.ownerId = this.urlParams.get('id');
  }

  showDetail(event: string): void {
    this.status = !this.status;
  }

  isClicked(event: string): void {
    this.status = !this.status;
    
  }


  addStore(event): void {
    event.preventDefault();
    this.router.navigateByUrl('form/store-info', { skipLocationChange: true }).then(() => {
      this.router.navigate(['form/store-info'], {queryParams:{ oi: this.ownerId}});}); 
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
