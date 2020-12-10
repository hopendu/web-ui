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
import { StoreListComponent } from './store-list/store-list.component';
import { ItemComponent } from './stock-list/item/item.component';
import { DetailComponent } from './stock-list/detail/detail.component';
import { StockInfoComponent } from './stock-list/stock-info/stock-info.component';
import { ViewComponent } from './business-hours-form/view/view.component';
import { StoreComponent } from './store-list/store/store.component';
import { StoreDetailComponent } from './store-list/store/store-detail/store-detail.component';
import { StoreHoursComponent } from './store-list/store/store-detail/store-hours/store-hours.component';
import { StoreInventoryComponent } from './store-list/store/store-detail/store-inventory/store-inventory.component';
import { StoreInfoComponent } from './store-list/store/store-detail/store-info/store-info.component';
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
    StockInfoComponent,
    ViewComponent, 
    StoreListComponent, StoreComponent, StoreDetailComponent,
    StoreHoursComponent,
    StoreInfoComponent,
    StoreInventoryComponent
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



/*
/----- Media Queries ---/  
@media (max-width: 992px){

}
@media (max-width: 768px){

}
@media (max-width: 576px){

}

/---- Fire Fox Bug Fix ---/
.carousel-item {
  transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  transition: transform 0.5s ease, -webkit-transform 0.5s ease;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
}

/--- Fixed Background Image --/
figure {
  position: relative;
  width: 100%;
  height: 60%;
  margin: 0! important;
}
.fixed-wrap {
  clip: rect(0, auto, auto, 0);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#fixed {
  background-image: url('/favicon.ico');
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  will-change: transform;
}

/--- Bootstrap Padding Fix ---/
[class="col-"] {
  padding: 1rem;
}



















































































































  <nav class="navbar navbar-expand-md sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">IZinga Food Market</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Privacy policy</a>
          </li>
        </ul> 
      </div>
    </div>
  </nav>




























*/

