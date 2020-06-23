import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../classes/local-storage';

@Component({
  selector: 'app-uipath',
  templateUrl: './uipath.component.html',
  styleUrls: ['./uipath.component.css']
})
export class UipathComponent implements OnInit {

  update:string;
  isOfficial:string;
  location:string;

  constructor() {
      const storage = new LocalStorage();
      const availableCopy = JSON.parse(storage.getLocalStorageValue("availableCopy"));
      this.update = availableCopy[1].UiPath.Update;

      this.isOfficial = availableCopy[1].UiPath.Source.IsOfficial ? "Official" : "Unofficial";
          
      this.location = availableCopy[1].UiPath.Source.Link;
 }

  ngOnInit(): void {
  }
}