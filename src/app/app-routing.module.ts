import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { StoreRegistrationFormComponent } from './store-registration-form/store-registration-form.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { BusinessHoursFormComponent } from './business-hours-form/business-hours-form.component';
import { StoreInfoFormComponent } from './store-info-form/store-info-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { ViewComponent } from './business-hours-form/view/view.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-list/store/store-detail/store-detail.component';
import { StockInfoComponent } from './stock-list/stock-info/stock-info.component';
import { StoreInfoComponent } from './store-list/store/store-detail/store-info/store-info.component';
import { StoreHoursComponent } from './store-list/store/store-detail/store-hours/store-hours.component';
import { StoreInventoryComponent } from './store-list/store/store-detail/store-inventory/store-inventory.component';


const routes: Routes = [
  {path: '', redirectTo: 'stores', pathMatch: 'full'},
  {path: 'form', loadChildren: () => import('./store-registration-form/store-registration-form.module').then( m => m.StoreRegistrationFormModule)},
  {path: 'form/bank', loadChildren: () => import('./bank-form/bank-form.module').then( m => m.BankFormModule)},
  {path: 'form/business-hours', loadChildren: () => import('./business-hours-form/business-hours-form.module').then( m => m.BusinessHoursFormModule)},
  {path: 'form/stock', loadChildren: () => import('./stock-form/stock-form.module').then( m => m.StockFormModule)},
  {path: 'form/store-info', loadChildren: () => import('./store-info-form/store-info-form.module').then( m => m.StoreInfoFormModule)},
  {path: 'form/stock-list',loadChildren: () => import('./stock-list/stock-list.module').then( m => m.StockListModule)},
  {path: 'stores', loadChildren: () => import('./store-list/store-list.module').then( m => m.StoreListModule) },
  {path: '**', redirectTo: 'stores'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules
    }  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
