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

  constructor() { }

  ngOnInit(): void {
    const storage = new LocalStorage();
    const availableCopy = JSON.parse(storage.getLocalStorageValue("availableCopy"));
    this.update = availableCopy[0].MS.Update;

    this.isOfficial = availableCopy[0].MS.Source.IsOfficial ? "Official" : "Unofficial";
        
    this.location = availableCopy[0].MS.Source.Link;
  }
}