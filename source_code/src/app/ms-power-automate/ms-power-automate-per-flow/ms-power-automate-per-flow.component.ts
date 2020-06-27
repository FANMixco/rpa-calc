import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';
import { environment } from 'src/environments/environment.prod';
import { GetCleanData } from 'src/app/classes/msPowerAutomate/get-clean-data';
import { String } from 'typescript-string-operations';

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
  yourPackage:string = "";

  readonly listFlow = "<li><b>Monthly:</b><br /><b>Total Flows:</b> {0} for <b>Unlimited Users</b>{1}{2}{3}</li>";  
  readonly attendedRPAs = "<br /><b>Total Users:</b> {0} with <b>Total Attended Bots:</b> {1} & US${2} AI Credits"
  readonly aiUnits = "<br /><b>Total AI Units:</b> US${0}";
  readonly bots = "<br /><b>Total Unattended RPAs:</b> {0}";

  constructor(private formBuilder: FormBuilder) { 
    this.storage = new LocalStorage();
    this.verifyData();
  }

  getNotes() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));

    let msCopy = availableCopy[0].MS;

    const notesGenerator = new NotesGenerator();

    const getCleanData = new GetCleanData(msCopy);

    msCopy = getCleanData.getPerFlow();

    msCopy = getCleanData.getNotes();

    this.yourPackage = String.Format(this.listFlow, msCopy.Prices.perFlow.flows, "", "", "");

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

      this.createPackage(val.txtExtraFlows, val.txtFlowNoRPA, val.txtAI, val.txtFlowRPA);
    });
  }

  createPackage(extraFlows:number, usersRPA:number, aiCreditsRPA:number, bots:number) {
    let attended = "";

    const aiTmpRPA = aiCreditsRPA > 0 ? String.Format(this.aiUnits, this.infoMSPowerAutomate.aiAddOn.price * aiCreditsRPA).toString() : "";

    const totalBots =  bots > 0 ? String.Format(this.bots, bots) : "";

    const totalFlows = extraFlows + this.infoMSPowerAutomate.perFlow.flows;

    if (usersRPA > 0) {
      attended = String.Format(this.attendedRPAs, usersRPA, usersRPA * this.infoMSPowerAutomate.perUserPlanWithRPA.attendedBot, usersRPA * this.infoMSPowerAutomate.perUserPlanWithRPA.aiCredits);
    }

    this.yourPackage = String.Format(this.listFlow, totalFlows, aiTmpRPA, attended, totalBots);     
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
