import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorePromotionComponent } from './store-promotion.component';

const storePromotionRoutes: Routes = [
  { path: '', component: StorePromotionComponent} ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(storePromotionRoutes)],
exports: [ RouterModule]
})
export class StorePromotionRoutingModule { }
