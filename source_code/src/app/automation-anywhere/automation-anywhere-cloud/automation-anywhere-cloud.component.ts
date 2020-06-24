import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';

@Component({
  selector: 'app-automation-anywhere-cloud',
  templateUrl: './automation-anywhere-cloud.component.html',
  styleUrls: ['./automation-anywhere-cloud.component.css']
})
export class AutomationAnywhereCloudComponent implements OnInit {

  aaForm: FormGroup;
  totalPerMonth: number = 0;
  totalPerYear: number = 0;
  infoAA: any;
  aaResults:any = [];
  notes:string = "";
  storage:LocalStorage;

  constructor(private formBuilder: FormBuilder) {
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
    this.infoAA = availableCopy[2].AA.Prices.cloud;

    this.totalPerMonth = this.infoAA.basic.price;
    this.totalPerYear = this.totalPerMonth * 12;
    this.getPricesNotes(availableCopy, this.infoAA);
  }

  getPricesNotes(availableCopy:any, infoAA:any) {
    const keys = Object.keys(infoAA);
    for(let i = 0; i< keys.length; i++){
      const val = infoAA[keys[i]];
      this.aaResults.push([val.name, val.price]);
    }

    let notesGenerator = new NotesGenerator();

    this.notes += `<ul>${notesGenerator.getList(availableCopy[2].AA.Prices.cloud.notes)}${notesGenerator.getList(availableCopy[2].AA.Notes)}</ul>`;
  }

  ngOnInit(): void {
    this.aaForm = this.formBuilder.group({
      extraBot: 0,
      extraUser: 0
    });
    this.onChanges();
  }

  onChanges(): void {
    this.aaForm.valueChanges.subscribe(val => {
      this.totalPerYear = this.infoAA.basic.price
                          + val.extraBot * this.infoAA.extraBot.price
                          + val.extraUser * this.infoAA.extraUser.price;

      this.totalPerMonth = this.priceRounding(this.totalPerYear / 12);
    });
  }

  priceRounding(price:number) {
    return Math.round((price + Number.EPSILON) * 100) / 100;
  }
}
