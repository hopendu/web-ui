import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreInfoFormComponent } from './store-info-form.component';


const routes: Routes = [
  {path: '', component: StoreInfoFormComponent } ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
  })
export class StoreInfoFormRoutingModule { }
