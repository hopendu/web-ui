import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './store-list.component';


const storeListRoutes: Routes = [
  { path: '', component: StoreListComponent},
   { path: '', loadChildren: () => import('./store/store.module').then( m => m.StoreModule)}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(storeListRoutes)],
  exports: [ RouterModule]
})
export class StoreListRoutingModule { }
