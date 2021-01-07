import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreDetailComponent } from './store-detail.component';
import { StorePromotionModule } from './store-promotion/store-promotion.module';



const storeRoutes: Routes = [
    { path: '', component: StoreDetailComponent,
      children: [
        { path: 'info', loadChildren: () => import('./store-info/store-info.module').then( m => m.StoreInfoModule)},
        { path: 'hours', loadChildren: () => import('./store-hours/store-hours.module').then( m => m.StoreHoursModule)},
        { path: 'stocks', loadChildren: () => import('./store-inventory/store-inventory.module').then( m => m.StoreInventoryModule)},
        { path: 'promotions', loadChildren: () => import('./store-promotion/store-promotion.module').then( m => StorePromotionModule)}
      ]
    }
  ];
  

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(storeRoutes)],
  exports: [ RouterModule]
})
export class StoreDetailRoutingModule { }
