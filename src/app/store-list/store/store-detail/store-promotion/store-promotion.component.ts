import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { PromotionControllerService } from '../../../../service/promotion-controller.service';
import { Promotion } from 'src/app/model/promotion';
import { StoreControllerService } from '../../../../service/store-controller.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-store-promotion',
  templateUrl: './store-promotion.component.html',
  styleUrls: ['./store-promotion.component.css']
})
export class StorePromotionComponent implements OnInit {
  storeId: string;
  promotionList: Promotion[];
  
  subscription: Subscription[] = [];

  constructor(  private storeService: StoreControllerService,
                private promotionService: PromotionControllerService,
                private activeRoute: ActivatedRoute,
                private router: Router) { 
                }

  ngOnDestroy(): void {
    this.subscription.forEach( sub => sub.unsubscribe);
  }

  ngOnInit(): void {
    this.subscription[0] = this.activeRoute.parent.params.subscribe( param => {
      var id = param['id']
      this.storeId = id;
     
     this.subscription[1] = this.storeService.fetchStoreById(id).subscribe( data =>
        this.subscription[2] = this.promotionService.fetchAllPromotionsByStoreIdAndStoreType(id, data.storeType).subscribe( promoData => this.promotionList = promoData)
        )      
    })
  }

  add(event): void {
    event.preventDefault();
     this.router.navigateByUrl('/form/stock-list', { skipLocationChange: true }).then(() => {
     this.router.navigate(['form/promotion'], {queryParams:{ id: this.activeRoute.parent.snapshot.params.id}});})
  };
}
