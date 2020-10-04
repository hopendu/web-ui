import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRegistrationFormComponent } from './store-registration-form/store-registration-form.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { BusinessHoursFormComponent } from './business-hours-form/business-hours-form.component';
import { StoreInfoFormComponent } from './store-info-form/store-info-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/form/store-info', pathMatch: 'full'},
  {path: 'form', component: StoreRegistrationFormComponent},
  {path: 'form/bank', component: BankFormComponent},
  {path: 'form/business-hours', component: BusinessHoursFormComponent},
  { path: 'form/stock', component: StockFormComponent},
  {path: 'form/store-info', component: StoreInfoFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
