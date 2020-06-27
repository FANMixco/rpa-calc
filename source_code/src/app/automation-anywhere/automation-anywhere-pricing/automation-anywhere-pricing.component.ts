import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-automation-anywhere-pricing',
  templateUrl: './automation-anywhere-pricing.component.html',
  styleUrls: ['./automation-anywhere-pricing.component.css']
})
export class AutomationAnywherePricingComponent implements OnInit {

  aaResults:any = [];
  notes:string = "";
  storage:LocalStorage;

  constructor() {
    this.storage = new LocalStorage();
    this.verifyData();
  }

  verifyData() {
    if (this.storage.getLocalStorageValue("isReady") === "true") {
      this.getData();
    }
    else {
      setTimeout(() => { this.getData() }, 1000);
    }
  }

  getData() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));
    const infoAA = availableCopy[2].AA.Prices.cloud;

    const keys = Object.keys(infoAA);
    for(let i = 0; i< keys.length; i++){
      const val = infoAA[keys[i]];
      this.aaResults.push([val.name, val.price]);
    }

    let notesGenerator = new NotesGenerator();

    this.notes += `<ul>${environment.warning}${notesGenerator.getList(availableCopy[2].AA.Prices.cloud.notes)}${notesGenerator.getList(availableCopy[2].AA.Notes)}</ul>`;
  }

  ngOnInit(): void {
  }
}