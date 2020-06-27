import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';
import { environment } from 'src/environments/environment.prod';

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
  infoMSPowerAutomate: any;
  notes:string = "";

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

    let notesGenerator = new NotesGenerator();

    this.notes += `<ul>${environment.warning}${notesGenerator.getList(availableCopy[0].MS.Prices.perUserPlan.notes)}${notesGenerator.getList(availableCopy[0].MS.Prices.perUserPlanWithRPA.notes)}${notesGenerator.getList(availableCopy[0].MS.Notes)}</ul>`;
  }

  onChanges(): void {
    this.msPowerUsersForm.valueChanges.subscribe(val => {
      this.totalNoRPA = val.txtUserNoRPA * this.infoMSPowerAutomate.perUserPlan.price;

      if (val.txtUserRPA > 0) {
        this.enableRobots = false;
      } else {
        this.enableRobots = true;
        val.txtRobot = 0;
      }

      this.totalRPA = val.txtUserRPA * this.infoMSPowerAutomate.perUserPlanWithRPA.price
                      + val.txtAINoRPA * this.infoMSPowerAutomate.aiAddOn.price
                      + val.txtRobot * this.infoMSPowerAutomate.rpaAddOn.price
                      + val.txtAI * this.infoMSPowerAutomate.aiAddOn.price;

      this.totalPerMonth = this.totalNoRPA + this.totalRPA;
      this.totalPerYear = this.totalPerMonth * 12;
    });
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
