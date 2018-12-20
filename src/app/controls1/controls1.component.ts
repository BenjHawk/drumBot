import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls1',
  templateUrl: './controls1.component.html',
  styleUrls: ['./controls1.component.css']
})
export class Controls1Component implements OnInit {

  row = ['1', '2'];
  rowNr = this.row[0];
  name = ['tempo', 'volume', 'sounds'];
  btnName = this.name[0];
  //name2 = ['meter', 'mode', 'effects'];
  
  
  

  constructor() {}
   

  ngOnInit() {
  }

}
