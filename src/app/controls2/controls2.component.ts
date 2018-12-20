import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls2',
  templateUrl: './controls2.component.html',
  styleUrls: ['./controls2.component.css']
})
export class Controls2Component implements OnInit {

  name = ['save', 'cut', 'play'];
  btnName=this.name[0];

  constructor() { }

  ngOnInit() {
  }

}
