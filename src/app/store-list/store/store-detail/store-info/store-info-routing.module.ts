import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreInfoComponent } from './store-info.component';



const storeInfoRoutes: Routes = [
  { path: '', component: StoreInfoComponent} ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(storeInfoRoutes)],
  exports: [ RouterModule]
})
export class StoreInfoRoutingModule { }
