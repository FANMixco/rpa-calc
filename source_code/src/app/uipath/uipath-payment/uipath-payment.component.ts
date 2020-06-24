import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorage } from 'src/app/classes/local-storage';
import { NotesGenerator } from 'src/app/classes/notes-generator';

@Component({
  selector: 'app-uipath-payment',
  templateUrl: './uipath-payment.component.html',
  styleUrls: ['./uipath-payment.component.css']
})
export class UipathPaymentComponent implements OnInit {

  infoUiPath: any;

  uiLocation: Array<Object>;

  uiPathForm: FormGroup;
  storage:LocalStorage;

  onPremises: boolean = true;
  totalPerMonth:number;
  totalPerYear:number;
  notes:string = "";

  constructor(private formBuilder: FormBuilder) {
    this.storage = new LocalStorage();
    this.verifyData();
    this.getNotes();
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
    this.infoUiPath = availableCopy[1].UiPath.Prices;

    this.totalPerMonth = this.priceRounding(this.infoUiPath.orchestrator.price / 12);
    this.totalPerYear = this.infoUiPath.orchestrator.price;
  }

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

  getNotes() {
    const availableCopy = JSON.parse(this.storage.getLocalStorageValue("availableCopy"));

    let notesGenerator = new NotesGenerator();

    this.notes += `<ul>${notesGenerator.getList(availableCopy[1].UiPath.Notes)}</ul>`;
  }

  onChanges(): void {
    this.uiPathForm.valueChanges.subscribe(val => {

      let studioPrice = val.withStudio ? this.infoUiPath.studio.price : 0;

      this.totalPerYear = this.infoUiPath.orchestrator.price
                          + val.noAttended * this.infoUiPath.attended.price
                          + val.noUnattended * this.infoUiPath.unattended.price
                          + studioPrice;

      this.totalPerMonth = this.priceRounding(this.totalPerYear / 12);
    });
  }
}
