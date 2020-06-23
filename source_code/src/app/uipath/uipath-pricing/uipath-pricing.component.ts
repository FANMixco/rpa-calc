import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/classes/local-storage';

@Component({
  selector: 'app-uipath-pricing',
  templateUrl: './uipath-pricing.component.html',
  styleUrls: ['./uipath-pricing.component.css']
})
export class UipathPricingComponent implements OnInit {

  uiPathResults:any = [];

  constructor() {
    const storage = new LocalStorage();
    const availableCopy = JSON.parse(storage.getLocalStorageValue("availableCopy"));
    const infoUiPath = availableCopy[1].UiPath.Prices;

    const keys = Object.keys(infoUiPath);
    for(let i = 0; i< keys.length; i++){
        const key = keys[i];
        let price = '';

        const val = infoUiPath[key];

        if (val.priceExtended) {
          price = val.priceExtended;
        } else {
          price = val.price.toString();
        }

        this.uiPathResults.push([val.name, price]);
    }
  }

  ngOnInit(): void {
  }
}