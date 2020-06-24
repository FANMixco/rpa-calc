import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MsPowerAutomateComponent } from './ms-power-automate/ms-power-automate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsPowerAutomatePerUsersComponent } from './ms-power-automate/ms-power-automate-per-users/ms-power-automate-per-users.component';
import { MsPowerAutomatePerFlowComponent } from './ms-power-automate/ms-power-automate-per-flow/ms-power-automate-per-flow.component';
import { MsPowerAutomatePricesComponent } from './ms-power-automate/ms-power-automate-prices/ms-power-automate-prices.component';
import { UipathComponent } from './uipath/uipath.component';
import { UipathPricingComponent } from './uipath/uipath-pricing/uipath-pricing.component';
import { UipathPaymentComponent } from './uipath/uipath-payment/uipath-payment.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MsPowerAutomateComponent,
    MsPowerAutomatePerUsersComponent,
    MsPowerAutomatePerFlowComponent,
    MsPowerAutomatePricesComponent,
    UipathComponent,
    UipathPricingComponent,
    UipathPaymentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
