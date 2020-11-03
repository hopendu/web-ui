import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import{CustomReuseStrategy} from './util/custom-reuse-strategy';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreRegistrationFormComponent } from './store-registration-form/store-registration-form.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { BusinessHoursFormComponent } from './business-hours-form/business-hours-form.component';
import { StoreInfoFormComponent } from './store-info-form/store-info-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { ItemComponent } from './stock-list/item/item.component';
import { DetailComponent } from './stock-list/detail/detail.component';
import { StockInfoComponent } from './stock-list/stock-info/stock-info.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreRegistrationFormComponent,
    BankFormComponent,
    StockFormComponent,
    BusinessHoursFormComponent,
    StoreInfoFormComponent,
    StockListComponent,
    ItemComponent,
    DetailComponent,
    StockInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
