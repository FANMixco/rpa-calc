import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';
import { environment } from 'src/environments/environment.prod';
import { GetCleanData } from 'src/app/classes/msPowerAutomate/get-clean-data';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-ms-power-automate-per-users',
  templateUrl: './ms-power-automate-per-users.component.html',
  styleUrls: ['./ms-power-automate-per-users.component.css']
})
export class MsPowerAutomatePerUsersComponent implements OnInit {

  storage:LocalStorage;
  msPowerUsersForm: FormGroup;
  totalNoRPA: number = 0;
  totalRPA: number = 0;
  totalPerMonth: number = 0;
  totalPerYear: number = 0;
  enableRobots: boolean = true;
  enableAI: boolean = true;
  infoMSPowerAutomate: any;
  notes:string = "";
  isPackageReady:boolean = false;
  yourPackage:string = "";
  common:string = "";

  readonly listUser = "<li><b>Total Users:</b> {0} with <b>Unlimited Flows Only</b>{1}{2}</li>";
  readonly commonDataService = "<br /><b>Common Data Service:</b><ul><li><b>Database:</b> {0} MB</li><li><b>Files:</b> {1} MB</li></ul>";
  readonly listUserRPA = "<li><b>Total Users:</b> {0} with Unlimited Flows<br /><b>Total Attended RPAs:</b> {1}<br /><b>Total AI Credits:</b> US${2} per User{3}{4}{5}</li>";
  readonly aiUnits = "<b>Total AI Units:</b> US${0}";
  readonly bots = "<b>Total Unattended RPAs:</b> {0}";

  getData() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));
    this.infoMSPowerAutomate = availableCopy[0].MS.Prices;
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

  constructor(private formBuilder: FormBuilder) { 
    this.storage = new LocalStorage();
    this.verifyData();
  }

  getNotes() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));

    const notesGenerator = new NotesGenerator();

    let msCopy = availableCopy[0].MS;

    const getCleanData = new GetCleanData(msCopy);

    msCopy = getCleanData.getPerUser();

    msCopy = getCleanData.getPerUserPlanWithRPA();

    msCopy = getCleanData.getNotes();

    this.common = String.Format(this.commonDataService, msCopy.CommonDataService.DB, msCopy.CommonDataService.Files);

    this.notes += `<ul>${environment.warning}${notesGenerator.getList(msCopy.Prices.perUserPlan.notes)}${notesGenerator.getList(msCopy.Prices.perUserPlanWithRPA.notes)}${notesGenerator.getList(msCopy.Notes)}</ul>`;
  }

  onChanges(): void {
    this.msPowerUsersForm.valueChanges.subscribe(val => {
      this.totalNoRPA = val.txtUserNoRPA * this.infoMSPowerAutomate.perUserPlan.price;

      if (val.txtUserNoRPA > 0) {
        this.enableAI = false;
      } else {
        this.enableAI = true;
        val.txtAINoRPA = 0;
      }

      if (val.txtUserRPA > 0) {
        this.enableRobots = false;
      } else {
        this.enableRobots = true;
        val.txtRobot = 0;
        val.txtAI = 0;
      }

      this.totalRPA = val.txtUserRPA * this.infoMSPowerAutomate.perUserPlanWithRPA.price
                      + val.txtAINoRPA * this.infoMSPowerAutomate.aiAddOn.price
                      + val.txtRobot * this.infoMSPowerAutomate.rpaAddOn.price
                      + val.txtAI * this.infoMSPowerAutomate.aiAddOn.price;

      this.totalPerMonth = this.totalNoRPA + this.totalRPA;
      this.totalPerYear = this.totalPerMonth * 12;

      this.createPackage(val.txtUserNoRPA, val.txtAINoRPA, val.txtUserRPA, val.txtAI, val.txtRobot);
    });
  }

  createPackage(users:number, aiCredits:number, usersRPA:number, aiCreditsRPA:number, bots:number) {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));
    const msCopy = availableCopy[0].MS;

    if (!(users > 0 || usersRPA > 0)) {
      this.yourPackage = "";
      this.isPackageReady = false;
    } else {
      let tmpList = "";

      if (users > 0) {
        const aiTmp = aiCredits > 0 ? String.Format(this.aiUnits, this.infoMSPowerAutomate.aiAddOn.price * aiCredits).toString() : "";

        tmpList += String.Format(this.listUser, users, this.common, aiTmp);
      }

      if (usersRPA > 0) {
        const aiTmpRPA = aiCreditsRPA > 0 ? String.Format(this.aiUnits, this.infoMSPowerAutomate.aiAddOn.price * aiCreditsRPA).toString() : "";
        const totalBots =  bots > 0 ? String.Format(this.bots, bots) : "";

        const bl = aiCreditsRPA > 0 && bots > 0 ? "<br />" : "";

        tmpList += String.Format(this.listUserRPA, usersRPA, usersRPA * this.infoMSPowerAutomate.perUserPlanWithRPA.attendedBot, this.infoMSPowerAutomate.perUserPlanWithRPA.aiCredits, this.common, totalBots, bl + aiTmpRPA);
      }

      this.yourPackage = tmpList;
      this.isPackageReady = true;
    }
  }

  ngOnInit(): void {
    this.msPowerUsersForm = this.formBuilder.group({
      txtUserNoRPA: 0,
      txtUserRPA: 0,
      txtRobot: 0,
      txtAI: 0,
      txtAINoRPA: 0
    });

    this.onChanges();    
  }
}
