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

  days = 31
  shopGroupedPayouts: { [stage: string]: Payout[] } = {};
  userGroupedPayouts: { [stage: string]: Payout[] } = {};
  
  // Collapsible section state
  shopSectionCollapsed = false;
  userSectionCollapsed = false;

  constructor(private izingaPayoutService: PayoutService) {

  }

  ngOnInit() {
    this.onDayChange()
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

  onDayChange() {
    this.izingaPayoutService.getPastPayouts(PayoutBundle.TypeEnum.SHOP, this.days)
    .subscribe(payt => {
      this.shopGroupedPayouts = this.groupByStage(payt)
    })

    this.izingaPayoutService.getPastPayouts(PayoutBundle.TypeEnum.MESSENGER, this.days)
    .subscribe(payt => {
      this.userGroupedPayouts = this.groupByStage(payt)
    })
  }

  // Toggle section visibility
  toggleShopSection() {
    this.shopSectionCollapsed = !this.shopSectionCollapsed;
  }

  toggleUserSection() {
    this.userSectionCollapsed = !this.userSectionCollapsed;
  }

  // Helper methods for summary statistics
  getTotalPayouts(groupedPayouts: { [stage: string]: Payout[] }): number {
    let total = 0;
    for (const stage in groupedPayouts) {
      total += groupedPayouts[stage].length;
    }
    return total;
  }

  getTotalAmount(groupedPayouts: { [stage: string]: Payout[] }): number {
    let total = 0;
    for (const stage in groupedPayouts) {
      total += this.payoutTotal(groupedPayouts[stage]);
    }
    return total;
  }

  getPendingAmount(groupedPayouts: { [stage: string]: Payout[] }): number {
    if (groupedPayouts['PENDING']) {
      return this.payoutTotal(groupedPayouts['PENDING']);
    }
    return 0;
  }

  // Helper to get status badge class
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-warning';
      case 'PROCESSING': return 'badge-info';
      case 'COMPLETED': return 'badge-success';
      default: return 'badge-secondary';
    }
  }

}
