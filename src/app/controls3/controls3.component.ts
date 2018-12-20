import { Component, OnInit } from '@angular/core';
//import { BuiltinMethod } from '@angular/compiler';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-controls3',
  templateUrl: './controls3.component.html',
  styleUrls: ['./controls3.component.css']
})
export class Controls3Component implements OnInit {

  rowNr = ['1', '2', '3', '4', '5', '6'];
  btnNr = ['1', '2', '3', '4', '5', '6', '7', '8'];
  rowId = this.rowNr[0];
  btnId = this.btnNr[0];
  
  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }
  
  private clickedBtn(rowId: number, btnId: number):void{
    this.loopSvc.setInstrumentTime(rowId - 1, btnId - 1);
  }
  
  ngOnInit() {
    this.loopSvc.setDimensions(this.rowNr.length,this.btnNr.length);
  }


}
