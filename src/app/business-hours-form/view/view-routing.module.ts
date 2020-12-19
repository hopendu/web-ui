import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view.component';

const editBusinessHoursRoutes: Routes = [
  {path: '', component: ViewComponent} ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(editBusinessHoursRoutes)],
    exports: [ RouterModule]
  })
export class ViewRoutingModule { }
