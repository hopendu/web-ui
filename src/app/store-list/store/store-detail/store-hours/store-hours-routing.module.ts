import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreHoursComponent } from './store-hours.component';
import { Routes, RouterModule } from '@angular/router';




const storeHoursRoutes: Routes = [
  { path: '', component: StoreHoursComponent}
   ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(storeHoursRoutes)],
  exports: [ RouterModule]
})
export class StoreHoursRoutingModule {
 }
