import { Component, OnInit } from '@angular/core';

declare function googleTranslateElementInit(): any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    googleTranslateElementInit();
  }

}
