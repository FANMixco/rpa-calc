import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';
import { environment } from 'src/environments/environment.prod';
import { MSParser } from 'src/app/classes/msPowerAutomate/msparser';

@Component({
  selector: 'app-ms-power-automate-per-flow',
  templateUrl: './ms-power-automate-per-flow.component.html',
  styleUrls: ['./ms-power-automate-per-flow.component.css']
})
export class MsPowerAutomatePerFlowComponent implements OnInit {
  
  storage:LocalStorage;
  msPowerFlowsForm: FormGroup;
  totalPerMonth:number;
  totalPerYear:number;
  infoMSPowerAutomate:any;
  notes:string = "";

  constructor(private formBuilder: FormBuilder) { 
    this.storage = new LocalStorage();
    this.verifyData();
  }

  getNotes() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));

    const msCopy = availableCopy[0].MS;

    const msParser = new MSParser();

    msCopy.Prices.perFlow.notes[0] = msParser.cleanPerFlowPlan(msCopy.Prices, 0, "flows", "users");

    msCopy.Notes[3] = msParser.cleanCommonNotes(msCopy, 3, "DB", "Files");

    const notesGenerator = new NotesGenerator();

    this.notes = `<ul>${environment.warning}${notesGenerator.getList(msCopy.Prices.perFlow.notes)}${notesGenerator.getList(msCopy.Notes)}</ul>`;
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
    this.infoMSPowerAutomate = availableCopy[0].MS.Prices;

    this.totalPerMonth = this.infoMSPowerAutomate.perFlow.price;
    this.totalPerYear = this.totalPerMonth * 12;
  }

  onChanges(): void {
    this.msPowerFlowsForm.valueChanges.subscribe(val => {
      this.totalPerMonth = this.infoMSPowerAutomate.perFlow.price 
                            + val.txtExtraFlows * this.infoMSPowerAutomate.extraFlow.price
                            + val.txtFlowNoRPA * this.infoMSPowerAutomate.perUserPlanWithRPA.price 
                            + val.txtFlowRPA * this.infoMSPowerAutomate.rpaAddOn.price
                            + val.txtAI * this.infoMSPowerAutomate.aiAddOn.price;

      this.totalPerYear = this.totalPerMonth * 12;
    });
  }

  ngOnInit(): void {
    this.msPowerFlowsForm = this.formBuilder.group({
      txtExtraFlows: 0,
      txtFlowNoRPA: 0,
      txtFlowRPA: 0,
      txtAI: 0
    });

    this.onChanges();
  }
}
