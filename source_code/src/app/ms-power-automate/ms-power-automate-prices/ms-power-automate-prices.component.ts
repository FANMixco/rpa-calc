import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/classes/local-storage';

@Component({
  selector: 'app-ms-power-automate-prices',
  templateUrl: './ms-power-automate-prices.component.html',
  styleUrls: ['./ms-power-automate-prices.component.css']
})
export class MsPowerAutomatePricesComponent implements OnInit {

  msResults:any = [];

  constructor() {
    this.verifyData();
  }

  verifyData() {
    let storage = new LocalStorage();

    if (storage.getLocalStorageValue("isReady") === "true") {
      this.getData();
    }
    else {
      setTimeout(() => { this.getData() }, 1000);
    }
  }

  getData() {
    const storage = new LocalStorage();
    const availableCopy = JSON.parse(storage.getLocalStorageValue("availableCopy"));
    const infoMS = availableCopy[0].MS.Prices;

    const keys = Object.keys(infoMS);
    for(let i = 0; i< keys.length; i++){
      const key = keys[i];
      let comments = '';

      const val = infoMS[key];

      if (val.comments) {
        comments = val.comments;
      }

      this.msResults.push([val.name, val.price, comments]);
    }
  }

  ngOnInit(): void {
  }
}
