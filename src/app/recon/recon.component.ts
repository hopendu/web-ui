import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order-service.service';
import {Sort} from '@angular/material/sort';
import { UserProfile } from '../model/user-profile';
import { PayoutBundle } from '../model/payoutBundle';
import { UserControllerService } from '../service/user-controller.service';
import { StoreProfile } from '../model/store-profile';
import { StoreControllerService } from '../service/store-controller.service';
import { PayoutService } from '../service/payout-service';
import { Payout } from '../model/payout';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recon',
  templateUrl: './recon.component.html',
  styleUrls: ['./recon.component.css']
})
export class ReconComponent implements OnInit {
  
  payoutBundle: PayoutBundle;
  driverPayoutBundle: PayoutBundle;
  sortedData: Payout[];
  customers: UserProfile[] = [];
  shops: StoreProfile[] = []
  isMapChanged = false;
  totalSales = 0
  shopCosts = 100
  driverCosts = 4000
  transactionFee = 0
  transactionFeePerc = 0.035
  profit = 0
  period = 0
  deliveryCosts = 0
  serviceFees = 0
  markupFees = 0

  constructor(private orderService: OrderService, 
    private userService: UserControllerService, 
    private storeService: StoreControllerService, 
    private payoutService: PayoutService) { }

  ngOnInit(): void {
    this.storeService.fetchAllStores().subscribe(stores => this.shops = stores)
    this.payoutService.getShopPayouts()
    .subscribe(payout => {
      this.payoutBundle = payout
    }, (error)  => {
        console.error(error)
    }, () => {
      this.isMapChanged = true
    })

    this.payoutService.getMessengerPayouts()
    .subscribe(payout => {
      this.driverPayoutBundle = payout
    }, (error)  => {
        console.error(error)
    }, () => {
      this.isMapChanged = true
    })
  }

  sortData(sort: Sort) {
    const data = this.payoutBundle.payouts;

    this.payoutBundle.payouts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'shopName': return this.compare(a.toName, b.toName, isAsc);
        case 'bank': return this.compare(a.toBankName, b.toBankName, isAsc);
        case 'accountNumber': return this.compare(a.toAccountNumber, b.toAccountNumber, isAsc);
        case 'type': return this.compare(a.toType, b.toType, isAsc);
        case 'total': return this.compare(a.total, b.total, isAsc);
        default: return 0;
      }
    });
  }

  sortMessengerData(sort: Sort) {
    const data = this.driverPayoutBundle.payouts;

    this.driverPayoutBundle.payouts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'shopName': return this.compare(a.toName, b.toName, isAsc);
        case 'bank': return this.compare(a.toBankName, b.toBankName, isAsc);
        case 'accountNumber': return this.compare(a.toAccountNumber, b.toAccountNumber, isAsc);
        case 'type': return this.compare(a.toType, b.toType, isAsc);
        case 'total': return this.compare(a.total, b.total, isAsc);
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

  getShop(id) {
    return this.shops.find(c => c.id == id)
  }

  get driverCsvFileUrl() {
    return environment.baseUrl + "reconcsv/messenger-payout-bundle"
  }

  get shopCsvFileUrl() {
    return environment.baseUrl + "reconcsv/shop-payout-bundle"
  }

  updateShopPayouts() {
    this.payoutService.patchShopPayouts(this.payoutBundle)
    .subscribe(response => {
      window.location.reload();
    })
  }

  updateMessengerPayouts() {
    this.payoutService.patchMessengerPayouts(this.driverPayoutBundle)
    .subscribe(response => {
      window.location.reload();
    })
  }

}
