import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockFormComponent } from './stock-form.component';

const stockRoutes: Routes = [
  {path: '', component: StockFormComponent } ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(stockRoutes)],
    exports: [ RouterModule]
  })
export class StockFormRoutingModule { }
