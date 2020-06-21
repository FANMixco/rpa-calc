import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ms-power-automate-per-users',
  templateUrl: './ms-power-automate-per-users.component.html',
  styleUrls: ['./ms-power-automate-per-users.component.css']
})
export class MsPowerAutomatePerUsersComponent implements OnInit {
  msPowerUsersForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msPowerUsersForm = this.formBuilder.group({
      txtUserNoRPA: 0,
      txtTotalNoRPA: 0,
      txtUserRPA: 0,
      txtRobot: 0,
      txtTotalRPA: 0,
      txtTotalPerMonth: 0,
      txtTotalPerYear: 0
    });
  }

}
