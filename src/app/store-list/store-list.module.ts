import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListRoutingModule } from './store-list-routing.module';
import { StoreModule } from './store/store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule,
    StoreListRoutingModule
  ]
})
export class StoreListModule { }
