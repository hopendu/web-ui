import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRegistrationFormComponent } from './store-registration-form/store-registration-form.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { BusinessHoursFormComponent } from './business-hours-form/business-hours-form.component';
import { StoreInfoFormComponent } from './store-info-form/store-info-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { ViewComponent } from './business-hours-form/view/view.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-list/store/store-detail/store-detail.component';
const routes: Routes = [
  {path: '', redirectTo: '/form/store-info', pathMatch: 'full'},
  {path: 'form', component: StoreRegistrationFormComponent},
  {path: 'form/bank', component: BankFormComponent},
  {path: 'form/business-hours', component: BusinessHoursFormComponent},
  {path: 'form/stock', component: StockFormComponent},
  {path: 'form/store-info', component: StoreInfoFormComponent},
  {path: 'form/stock-list', component: StockListComponent},
  {path: 'form/business-hours/view', component: ViewComponent},
  {path: 'stores', component: StoreListComponent},
  {path: 'store/:id', component: StoreDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
