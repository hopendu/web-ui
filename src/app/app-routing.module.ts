import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {path: '', redirectTo: 'signin', pathMatch: 'full'},
  {path: 'signin', component: SignInComponent},
  {path: 'form', loadChildren: () => import('./store-registration-form/store-registration-form.module').then( m => m.StoreRegistrationFormModule)},
  {path: 'form/bank', loadChildren: () => import('./bank-form/bank-form.module').then( m => m.BankFormModule)},
  {path: 'form/business-hours', loadChildren: () => import('./business-hours-form/business-hours-form.module').then( m => m.BusinessHoursFormModule)},
  {path: 'form/business-hours/view', loadChildren: () => import('./business-hours-form/view/view-routing.module').then( m => m.ViewRoutingModule)},
  {path: 'form/stock', loadChildren: () => import('./stock-form/stock-form.module').then( m => m.StockFormModule)},
  {path: 'form/store-info', loadChildren: () => import('./store-info-form/store-info-form.module').then( m => m.StoreInfoFormModule)},
  {path: 'form/stock-list',loadChildren: () => import('./stock-list/stock-list.module').then( m => m.StockListModule)},
  {path: 'stores', loadChildren: () => import('./store-list/store-list.module').then( m => m.StoreListModule) },
  {path: 'menu', component: MenuComponent },
  {path: 'orders', component: OrdersComponent },
  { path: 'form/promotion', loadChildren: () => import('./promotion-form/promotion-form.module').then( m => m.PromotionFormModule)},
  {path: '**', redirectTo: 'stores'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {
    paramsInheritanceStrategy: 'always',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
}  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
