import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';
import { environment } from 'src/environments/environment.prod';
import { MSParser } from 'src/app/classes/msPowerAutomate/msparser';
import { String } from 'typescript-string-operations';
import { GetCleanData } from 'src/app/classes/msPowerAutomate/get-clean-data';

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

    const notesGenerator = new NotesGenerator();

    let msCopy = availableCopy[0].MS;

    const getCleanData = new GetCleanData(msCopy);

    msCopy = getCleanData.getPerFlow();

    msCopy = getCleanData.getPerUser();

    msCopy = getCleanData.getPerUserPlanWithRPA();

    msCopy = getCleanData.getNotes();
    
    this.notes += `<ul>${environment.warning}${notesGenerator.getList(msCopy.Prices.perUserPlan.notes)}${notesGenerator.getList(msCopy.Prices.perUserPlanWithRPA.notes)}${notesGenerator.getList(msCopy.Prices.perFlow.notes)}${notesGenerator.getList(msCopy.Notes)}</ul>`;
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
    const msParser = new MSParser();

    const keys = Object.keys(infoMS);
    for(let i = 0; i< keys.length; i++){
      const key = keys[i];
      let comments = '';

      const val = infoMS[key];

      if (val.comments) {
        switch (key) {
          case "perFlow":
            val.comments = String.Format(val.comments, msParser.totalUnlimited(val.flows), msParser.totalUnlimited(val.users));
            break;
          case "perUserPlan":
            val.comments = String.Format(val.comments, msParser.totalUnlimited(val.flows));
            break;
          case "perUserPlanWithRPA":
            val.comments = String.Format(val.comments, msParser.totalUnlimited(val.flows));
            break;
        }

        comments = val.comments;
      }

      this.msResults.push([val.name, val.price, comments]);
    }
  }

  ngOnInit(): void {
  }
}
