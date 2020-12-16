import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankFormComponent } from './bank-form.component';


const bankRoutes: Routes = [
  {path: '', component: BankFormComponent } ]
   @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(bankRoutes)],
    exports: [ RouterModule]
  })
export class BankFormRoutingModule { }
