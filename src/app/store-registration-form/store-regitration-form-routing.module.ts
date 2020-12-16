import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRegistrationFormComponent } from './store-registration-form.component';



const formRoutes: Routes = [
  {path: '', component: StoreRegistrationFormComponent } ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(formRoutes)],
    exports: [ RouterModule]
  })
export class StoreRegistrationFormRoutingModule { }
