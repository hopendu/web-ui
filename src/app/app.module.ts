import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { AppComponent } from './app.component';
import { StoreRegistrationFormComponent } from './store-registration-form/store-registration-form.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { BusinessHoursFormComponent } from './business-hours-form/business-hours-form.component';
import { StoreInfoFormComponent } from './store-info-form/store-info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreRegistrationFormComponent,
    BankFormComponent,
    StockFormComponent,
    BusinessHoursFormComponent,
    StoreInfoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
