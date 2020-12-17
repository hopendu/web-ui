import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { CustomReuseStrategy} from './util/custom-reuse-strategy';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { BusinessHoursFormComponent } from './business-hours-form/business-hours-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreRegistrationFormComponent } from './store-registration-form/store-registration-form.component';
import { StoreInfoFormComponent } from './store-info-form/store-info-form.component';
import { StoreComponent } from './store-list/store/store.component';
import { StoreDetailComponent} from './store-list/store/store-detail/store-detail.component';
import { StoreHoursComponent } from './store-list/store/store-detail/store-hours/store-hours.component';
import { StoreInfoComponent } from './store-list/store/store-detail/store-info/store-info.component';
import { StoreInventoryComponent } from './store-list/store/store-detail/store-inventory/store-inventory.component';
import { DetailComponent } from './stock-list/detail/detail.component';
import { ItemComponent } from './stock-list/item/item.component';
import { StockInfoComponent } from './stock-list/stock-info/stock-info.component';
import { AlertComponent } from './_directives/alert/alert.component';



import { fakeBackendProvider } from './_helpers/fake-backend';
import { AlertService } from './_services/alert.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    BankFormComponent,
    BusinessHoursFormComponent,
    StockFormComponent,
    StoreInfoFormComponent,
    StockListComponent,
    StoreListComponent, StoreComponent, StoreDetailComponent, StoreInfoComponent, StoreHoursComponent, StoreInventoryComponent,
    DetailComponent,  ItemComponent, StockInfoComponent,
    StoreRegistrationFormComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
        // provider used to create fake backend
        fakeBackendProvider
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

