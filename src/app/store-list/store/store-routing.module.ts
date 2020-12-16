import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from '../store-list.component';



const storeRoutes: Routes = [
  { path: '', component: StoreListComponent},
  { path: ':id', loadChildren: () => import('./store-detail/store-detail.module').then( m => m.StoreDetailModule)}
 ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(storeRoutes)],
  exports: [ RouterModule]
})
export class StoreRoutingModule { }
