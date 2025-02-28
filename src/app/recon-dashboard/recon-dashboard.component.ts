import { Component } from '@angular/core';
import { Payout } from '../model/payout';
import { PayoutService } from '../service/payout-service';
import { PayoutBundle } from '../model/payoutBundle';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recon-dashboard',
  templateUrl: './recon-dashboard.component.html',
  styleUrls: ['./recon-dashboard.component.css']
})
export class ReconDashboardComponent {

  
  shopGroupedPayouts: { [stage: string]: Payout[] } = {};
  userGroupedPayouts: { [stage: string]: Payout[] } = {};

  constructor(private izingaPayoutService: PayoutService) {

  }

  ngOnInit() {
    this.izingaPayoutService.getPastPayouts(PayoutBundle.TypeEnum.SHOP)
    .subscribe(payt => {
      this.shopGroupedPayouts = this.groupByStage(payt)
    })

    this.izingaPayoutService.getPastPayouts(PayoutBundle.TypeEnum.MESSENGER)
    .subscribe(payt => {
      this.userGroupedPayouts = this.groupByStage(payt)
    })
  }

  private groupByStage(payouts: Payout[]): { [stage: string]: Payout[] } {
    return payouts.reduce((acc, payout) => {
      if (!acc[payout.payoutStage]) {
        acc[payout.payoutStage] = [];
      }
      acc[payout.payoutStage].push(payout);
      return acc;
    }, {} as { [stage: string]: Payout[] });
  }

  payoutTotal(payouts: Payout[]) {
    return payouts.map(a => a.total).reduce((a,b) => a + b)
  }

  markAllPayments(payouts: Array<Payout> ) {
    payouts.forEach(payout => payout.paid = !payout.paid)
  }

  get driverCsvFileUrl() {
    return environment.baseUrl + "/reconcsv/messenger-payout-bundle"
  }

  get shopCsvFileUrl() {
    return environment.baseUrl + "/reconcsv/shop-payout-bundle"
  }

  updateShopPayouts(payouts: Payout[]) {
    this.izingaPayoutService.patchShopPayouts(payouts)
    .subscribe(response => {
      window.location.reload();
    })
  }

  updateMessengerPayouts(payouts: Payout[]) {
    this.izingaPayoutService.patchMessengerPayouts(payouts)
    .subscribe(response => {
      window.location.reload();
    })
  }

}
