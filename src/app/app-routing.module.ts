import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRegistrationFormComponent } from './store-registration-form/store-registration-form.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { BusinessHoursFormComponent } from './business-hours-form/business-hours-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full'},
  {path: 'form', component: StoreRegistrationFormComponent},
  {path: 'form/bank', component: BankFormComponent},
  {path: 'form/business-hours', component: BusinessHoursFormComponent},
  { path: 'form/stock', component: StockFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
