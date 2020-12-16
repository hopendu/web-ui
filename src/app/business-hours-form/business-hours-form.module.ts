import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHoursRoutingModule } from './business-hours-routing.module';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [ ViewComponent ],
  imports: [
    CommonModule,
    BusinessHoursRoutingModule
  ],
  exports: [ ViewComponent]
})
export class BusinessHoursFormModule { }
