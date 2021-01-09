import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionFormComponent } from './promotion-form.component';


const promotionRoutes: Routes = [
  {path: '', component: PromotionFormComponent } ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(promotionRoutes)],
    exports: [ RouterModule]
  })
export class PromotionFormRoutingModule { }
