import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreInventoryComponent } from './store-inventory.component';

const storeInventoryRoutes: Routes = [
  { path: '', component: StoreInventoryComponent} ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(storeInventoryRoutes)],
  exports: [ RouterModule]
})
export class StoreInventoryRoutingModule { }
