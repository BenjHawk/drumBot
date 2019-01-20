import { Component, OnInit } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-controls3',
  templateUrl: './controls3.component.html',
  styleUrls: ['./controls3.component.css']
})
export class Controls3Component implements OnInit {

  rowNr: number[] = [1, 2, 3, 4, 5, 6];
  colNr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  rowId: number = this.rowNr[0];
  colId: number = this.colNr[0];

  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }
  
  private clickedBtn(rowId: number, colId: number): void{
    this.loopSvc.setInstrumentTime(rowId - 1, colId - 1);
  }

  private selectedBtn(rowId:number, colId: number): boolean{
      return this.loopSvc.getInstrumentTime(rowId - 1, colId - 1);
  }
  
  ngOnInit() {
    this.loopSvc.setDimensions(this.rowNr.length,this.colNr.length);
    console.log("initialized selecedBtns");
  }  

  
}

