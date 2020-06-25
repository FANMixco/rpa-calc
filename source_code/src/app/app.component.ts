import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireBase } from './classes/fire-base';
declare function googleTranslateElementInit(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'rpa-calc';
  router: string;
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor(private _router: Router){
    this.router = _router.url;

    new FireBase().updateData();

    try {
      googleTranslateElementInit();
    } catch {}
  }
}
