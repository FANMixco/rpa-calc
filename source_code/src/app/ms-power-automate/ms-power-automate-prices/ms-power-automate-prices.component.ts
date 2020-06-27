import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-ms-power-automate-prices',
  templateUrl: './ms-power-automate-prices.component.html',
  styleUrls: ['./ms-power-automate-prices.component.css']
})
export class MsPowerAutomatePricesComponent implements OnInit {

  msResults:any = [];
  storage:LocalStorage;
  notes:string = "";

  constructor() {
    this.storage = new LocalStorage();
    this.verifyData();
  }

  getNotes() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));

    let notesGenerator = new NotesGenerator();

    this.notes += `<ul>${environment.warning}${notesGenerator.getList(availableCopy[0].MS.Prices.perUserPlan.notes)}${notesGenerator.getList(availableCopy[0].MS.Prices.perUserPlanWithRPA.notes)}${notesGenerator.getList(availableCopy[0].MS.Prices.perFlow.notes)}${notesGenerator.getList(availableCopy[0].MS.Notes)}</ul>`;
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

  getData() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));
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
