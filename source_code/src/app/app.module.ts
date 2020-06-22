import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MsPowerAutomateComponent } from './ms-power-automate/ms-power-automate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsPowerAutomatePerUsersComponent } from './ms-power-automate-per-users/ms-power-automate-per-users.component';
import { MsPowerAutomatePerFlowComponent } from './ms-power-automate-per-flow/ms-power-automate-per-flow.component';
import { MsPowerAutomatePricesComponent } from './ms-power-automate-prices/ms-power-automate-prices.component';

@NgModule({
  declarations: [
    AppComponent,
    MsPowerAutomateComponent,
    MsPowerAutomatePerUsersComponent,
    MsPowerAutomatePerFlowComponent,
    MsPowerAutomatePricesComponent
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
