import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessHoursFormComponent } from './business-hours-form.component';


const businessHoursRoutes: Routes = [
  {path: '', component: BusinessHoursFormComponent } ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(businessHoursRoutes)],
    exports: [ RouterModule]
  })
export class BusinessHoursRoutingModule { }
