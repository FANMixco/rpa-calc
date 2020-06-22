import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsPowerAutomateComponent } from './ms-power-automate/ms-power-automate.component';
import { UipathComponent } from './uipath/uipath.component';

const routes: Routes = [
  { path: 'ms-power-automate', component: MsPowerAutomateComponent },
  { path: 'uipath', component: UipathComponent },
  { path: '**', component: MsPowerAutomateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
