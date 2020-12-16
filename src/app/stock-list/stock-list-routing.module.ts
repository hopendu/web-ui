import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list.component';



const stockListRoutes: Routes = [
  {path: '', component: StockListComponent } ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(stockListRoutes)],
    exports: [ RouterModule]
  })
export class StockListRoutingModule { }
