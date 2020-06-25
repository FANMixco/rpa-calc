import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsPowerAutomateComponent } from './ms-power-automate/ms-power-automate.component';
import { UipathComponent } from './uipath/uipath.component';
import { AutomationAnywhereComponent } from './automation-anywhere/automation-anywhere.component';

const routes: Routes = [
  { path: 'ms-power-automate', component: MsPowerAutomateComponent },
  { path: 'uipath', component: UipathComponent },
  { path: 'automation-anywhere', component: AutomationAnywhereComponent },
  { path: '',   redirectTo: '/ms-power-automate', pathMatch: 'full' },
  { path: '**', component: MsPowerAutomateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
