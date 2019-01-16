import { Component, OnInit } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-slidecontainer2',
  templateUrl: './slidecontainer2.component.html',
  styleUrls: ['./slidecontainer2.component.css']
})
export class Slidecontainer2Component implements OnInit {

  name = ['cymbal', 'hihat', 'snare', 'bass', 'tom1', 'tom2'];
  
  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }

  private getVolumeRef(btnName: string): any{
    let index: number;
    for (let i = 0; i < this.name.length; i++)
      if(this.name[i] === btnName)
        index = i;
    return this.loopSvc.getVolumeRef(index);
  }

  ngOnInit() {
  }

}
