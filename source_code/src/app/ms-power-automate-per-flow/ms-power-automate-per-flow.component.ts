import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ms-power-automate-per-flow',
  templateUrl: './ms-power-automate-per-flow.component.html',
  styleUrls: ['./ms-power-automate-per-flow.component.css']
})
export class MsPowerAutomatePerFlowComponent implements OnInit {
  
  msPowerFlowsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msPowerFlowsForm = this.formBuilder.group({
      txtExtraFlows: 0,
      txtFlowNoRPA: 0,
      txtFlowRPA: 0,
      txtTotalFlowMonth: 0,
      txtTotalFlowYear: 0
    });
  }

}
