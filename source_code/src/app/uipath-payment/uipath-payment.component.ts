import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-uipath-payment',
  templateUrl: './uipath-payment.component.html',
  styleUrls: ['./uipath-payment.component.css']
})
export class UipathPaymentComponent implements OnInit {

  infoMSPowerAutomate = {
    "studio": 2500,
    "orchestrator": 20000,
    "attended": 1500,
    "unattended": 8000
  };

  uiLocation: Array<Object>;

  uiPathForm: FormGroup;
  onPremises: boolean = true;
  totalPerMonth:number = this.priceRounding(this.infoMSPowerAutomate.orchestrator / 12);
  totalPerYear:number = this.infoMSPowerAutomate.orchestrator;

  constructor(private formBuilder: FormBuilder) { }

  priceRounding(price:number) {
    return Math.round((price + Number.EPSILON) * 100) / 100;
  }

  ngOnInit(): void {
    this.uiPathForm = this.formBuilder.group({
      noAttended: 0,
      noUnattended: 0,
      withStudio: true,
      uiLocation: 0
    });

    this.onChanges();

    this.uiLocation = 
    [
      {
        value: 0,
        name: "On-premises",
        selected: "selected"
      },
      {
        value: 1,
        name: "Cloud",
        selected: ""
      }
    ];

    this.uiPathForm.controls['uiLocation'].setValue(0, {onlySelf: true});
  }

  onChanges(): void {
    this.uiPathForm.valueChanges.subscribe(val => {

      let studioPrice = val.withStudio ? this.infoMSPowerAutomate.studio : 0;

      this.totalPerYear = this.infoMSPowerAutomate.orchestrator
                          + val.noAttended * this.infoMSPowerAutomate.attended
                          + val.noUnattended * this.infoMSPowerAutomate.unattended
                          + studioPrice;

      this.totalPerMonth = this.priceRounding(this.totalPerYear / 12);
    });
  }
}
