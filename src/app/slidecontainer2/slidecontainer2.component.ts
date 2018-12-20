import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slidecontainer2',
  templateUrl: './slidecontainer2.component.html',
  styleUrls: ['./slidecontainer2.component.css']
})
export class Slidecontainer2Component implements OnInit {

  name = ['bass', 'hihat', 'snare', 'cymbal', 'tom1', 'tom2'];
  sliderName = this.name[0];

  constructor() { }

  ngOnInit() {
  }

}
