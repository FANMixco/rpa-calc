import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';

@Component({
  selector: 'app-uipath-pricing',
  templateUrl: './uipath-pricing.component.html',
  styleUrls: ['./uipath-pricing.component.css']
})
export class UipathPricingComponent implements OnInit {

  uiPathResults:any = [];
  storage:LocalStorage;
  notes:string = "";

  constructor() {
    this.storage = new LocalStorage();
    this.verifyData();
  }

  getAllData() {
    this.getData();
    this.getNotes();
  }

  verifyData() {
    if (this.storage.getLocalStorageValue("isReady") === "true") {
      this.getAllData();
    }
    else {
      setTimeout(() => { 
        this.getAllData();
      }, 1000);
    }
  }

  getNotes() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));

    let notesGenerator = new NotesGenerator();

    this.notes += `<ul>${notesGenerator.getList(availableCopy[1].UiPath.Notes)}</ul>`;
  }

  getData() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));
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