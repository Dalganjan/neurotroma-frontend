import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-landing',
  templateUrl: './main-landing.component.html',
  styleUrls: ['./main-landing.component.scss']
})
export class MainLandingComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  items = [
    { title: '100% responsibility' },
    { title: 'Quick Response for patients' },
    { title: 'Prompt Designs' },
  ]

}
