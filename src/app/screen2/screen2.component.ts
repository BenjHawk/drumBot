import { Component, OnInit, Input } from '@angular/core';
import { LoopService } from "../loop.service";


@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.css']
})
export class Screen2Component implements OnInit {

  rowNr: number[] = [0, 1, 2, 3, 4, 5];
  colNr: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  rowId: number = this.rowNr[0];
  colId: number = this.colNr[0];
  highlitedCols: number[] = Array(8).fill(6);
  counter: number = 0;

  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
    let self = this;
    this.loopSvc.onInstrumentPlay = function(i,j){
      console.log("Animate", i, j);
      self.animateCol(i,j);
    }
    this.loopSvc.onStop = function(){
      console.log("Animation stopped");
      self.clearScreen();
    }
  }

  animateCol(colId: number, rowId: number){
    this.counter+=1;
    console.log("Animation in progress", colId, rowId);
    this.highlitedCols[colId] = rowId;
    if(this.counter>=this.colNr.length){
      let col = (this.colNr.length + colId-1) % (this.colNr.length-1)+1;
      this.highlitedCols[colId >= 7 ? 0 : col] = 7;
    }
  } 

  isHighlited(rowId: number, colId:number){
    return this.highlitedCols[colId] <= rowId;
  }

  clearScreen(){
    this.highlitedCols = Array(8).fill(6);
  }

  ngOnInit() {
    
  }
}
