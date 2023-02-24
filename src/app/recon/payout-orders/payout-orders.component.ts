import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { Payout } from 'src/app/model/payout';
import { PayoutService } from 'src/app/service/payout-service';
import {Sort} from '@angular/material/sort';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { StoreProfile } from 'src/app/model/store-profile';
import { UserProfile } from 'src/app/model/user-profile';
import { UserControllerService } from 'src/app/service/user-controller.service';
import { PayoutBundle } from 'src/app/model/payoutBundle';

@Component({
  selector: 'app-payout-orders',
  templateUrl: './payout-orders.component.html',
  styleUrls: ['./payout-orders.component.css']
})
export class PayoutOrdersComponent implements OnInit {
  
  payout: Payout;
  pastPayouts: Payout[];
  sortedData: Order[];
  shops: StoreProfile[];
  customers: UserProfile[] = [];

  constructor(private activeRoute: ActivatedRoute, private payoutService: PayoutService, 
    private storeService: StoreControllerService, private userService: UserControllerService) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(queryParamMap => {
      var payout: string = queryParamMap['payout']
      var bundle: string = queryParamMap['bundle']
      this.payoutService.getPayout(payout, bundle)
          .subscribe(resp => {
            this.payout = resp
            this.sortedData = resp.orders
            this.loadCustomers(resp.orders.map(ord => ord.customerId))
            this.loadPastPayouts(this.payout.toId, )
          })
    })
  }

  loadPastPayouts(toId: string) {
    this.payoutService.getPastPayouts(toId, PayoutBundle.TypeEnum.MESSENGER)
    .subscribe(py => {
      this.pastPayouts = py
    })
  }

  getShop(id: string) {
    return this.shops.find(sh => id == sh.id)
  }

  loadShop(ids: string[]) {
    ids.forEach(id => this.storeService.fetchStoreById(id).subscribe(sh => this.shops.push(sh)))
  }

  loadCustomers(ids: string[]) {
    ids.forEach(id => this.userService.findUser(id).subscribe(sh => this.customers.push(sh)))
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'shopId': return this.compare(a.shopId, b.shopId, isAsc);
        case 'customerId': return this.compare(a.customerId, b.customerId, isAsc);
        case 'totalAmount': return this.compare(a.totalAmount, b.totalAmount, isAsc);
        case 'shippingFee': return this.compare(a.shippingData.fee, b.shippingData.fee, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getUser(id) {
    return this.customers.find(c => c.id == id)
  }

}
