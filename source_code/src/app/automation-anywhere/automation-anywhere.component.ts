import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../classes/local-storage';

@Component({
  selector: 'app-automation-anywhere',
  templateUrl: './automation-anywhere.component.html',
  styleUrls: ['./automation-anywhere.component.css']
})
export class AutomationAnywhereComponent implements OnInit {

  update:string;
  isOfficial:string;
  location:string;
  storage:LocalStorage;

  constructor() {
    this.storage = new LocalStorage();
    this.verifyData();
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
    this.update = availableCopy[2].AA.Update;

    this.isOfficial = availableCopy[2].AA.Source.IsOfficial ? "Official" : "Unofficial";
        
    this.location = availableCopy[2].AA.Source.Link;
  }

  ngOnInit(): void {
  }
}