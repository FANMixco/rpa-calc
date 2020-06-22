import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ms-power-automate-per-flow',
  templateUrl: './ms-power-automate-per-flow.component.html',
  styleUrls: ['./ms-power-automate-per-flow.component.css']
})
export class MsPowerAutomatePerFlowComponent implements OnInit {
  
  msPowerFlowsForm: FormGroup;
  totalPerMonth:number = 500;
  totalPerYear:number = this.totalPerMonth * 12;

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
    this.msPowerFlowsForm.valueChanges.subscribe(val => {
      this.totalPerMonth = this.infoMSPowerAutomate.perFlow 
                            + val.txtExtraFlows * this.infoMSPowerAutomate.extraFlow
                            + val.txtFlowNoRPA * this.infoMSPowerAutomate.perUserPlanWithRPA 
                            + val.txtFlowRPA * this.infoMSPowerAutomate.rpaAddOn
                            + val.txtAI * this.infoMSPowerAutomate.aiAddOn;

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
