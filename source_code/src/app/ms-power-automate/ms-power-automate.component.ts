import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../classes/local-storage';

@Component({
  selector: 'app-ms-power-automate',
  templateUrl: './ms-power-automate.component.html',
  styleUrls: ['./ms-power-automate.component.css']
})
export class MsPowerAutomateComponent implements OnInit {

  update:string;
  isOfficial:string;
  location:string;

  verifyData() {
    let storage = new LocalStorage();

    if (storage.getLocalStorageValue("isReady") === "true") {
      this.getData();
    }
    else {
      setTimeout(() => { this.getData() }, 1000);
    }
  }

  constructor() {
    this.verifyData();
  }

  getData() {
    let storage = new LocalStorage();

    const availableCopy = JSON.parse(storage.getLocalStorageValue("availableCopy"));
    this.update = availableCopy[0].MS.Update;

    this.isOfficial = availableCopy[0].MS.Source.IsOfficial ? "Official" : "Unofficial";
        
    this.location = availableCopy[0].MS.Source.Link;
  }

  ngOnInit(): void { }
}