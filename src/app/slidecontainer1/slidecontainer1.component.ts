import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slidecontainer1',
  templateUrl: './slidecontainer1.component.html',
  styleUrls: ['./slidecontainer1.component.css']
})
export class Slidecontainer1Component implements OnInit {

  name = ['sld1', 'sld2', 'sld3', 'sld4', 'sld5', 'sld6'];
  sliderName = this.name[0];

  constructor() { }

  ngOnInit() {
  }

}
