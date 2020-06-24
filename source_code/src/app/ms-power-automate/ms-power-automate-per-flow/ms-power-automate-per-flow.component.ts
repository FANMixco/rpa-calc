import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';

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
    this.getNotes();
  }

  getNotes() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));

    let notesGenerator = new NotesGenerator();

    this.notes += `<ul>${notesGenerator.getList(availableCopy[0].MS.Prices.perFlow.notes)}${notesGenerator.getList(availableCopy[0].MS.Notes)}</ul>`;
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
