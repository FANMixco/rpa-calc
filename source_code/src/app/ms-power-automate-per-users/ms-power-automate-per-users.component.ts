import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ms-power-automate-per-users',
  templateUrl: './ms-power-automate-per-users.component.html',
  styleUrls: ['./ms-power-automate-per-users.component.css']
})
export class MsPowerAutomatePerUsersComponent implements OnInit {
  msPowerUsersForm: FormGroup;
  totalNoRPA: number = 0;
  totalRPA: number = 0;
  totalPerMonth: number = 0;
  totalPerYear: number = 0;
  enableRobots: boolean = true;

  infoMSPowerAutomate = {
    "perUserPlan": 15,
    "perUserPlanWithRPA": 40,
    "rpaAddOn": 150,
    "perFlow": 500,
    "aiAddOn": 500,
    "extraFlow": 100
  };

  constructor(private formBuilder: FormBuilder) { }

  onChanges(): void {
    this.msPowerUsersForm.valueChanges.subscribe(val => {
      this.totalNoRPA = val.txtUserNoRPA * this.infoMSPowerAutomate.perUserPlan;

      if (val.txtUserRPA > 0) {
        this.enableRobots = false;
      } else {
        this.enableRobots = true;
        val.txtRobot = 0;
      }

      this.totalRPA = val.txtUserRPA * this.infoMSPowerAutomate.perUserPlanWithRPA
                      + val.txtAINoRPA * this.infoMSPowerAutomate.aiAddOn
                      + val.txtRobot * this.infoMSPowerAutomate.rpaAddOn
                      + val.txtAI * this.infoMSPowerAutomate.aiAddOn;

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
