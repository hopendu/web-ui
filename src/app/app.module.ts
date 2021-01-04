import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { CustomReuseStrategy} from './util/custom-reuse-strategy';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { ViewComponent } from './business-hours-form/view/view.component';
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
import { StockImagesComponent } from './stock-images/stock-images.component';



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
    ViewComponent,
    StoreListComponent, StoreComponent, StoreDetailComponent, StoreInfoComponent, StoreHoursComponent, StoreInventoryComponent,
    DetailComponent,  ItemComponent, StockInfoComponent, StockImagesComponent,
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
    BrowserAnimationsModule
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