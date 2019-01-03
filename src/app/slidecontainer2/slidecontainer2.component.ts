import { Component, OnInit } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-slidecontainer2',
  templateUrl: './slidecontainer2.component.html',
  styleUrls: ['./slidecontainer2.component.css']
})
export class Slidecontainer2Component implements OnInit {

  name = ['bass', 'hihat', 'snare', 'cymbal', 'tom1', 'tom2'];
  //sliderName = this.name[0];

  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }

  private getVolumeRef(btnName: string): HTMLAudioElement{
    let index: number;
    for (let i = 0; i < this.name.length; i++)
      if(this.name[i] === btnName)
        index = i;
    return this.loopSvc.getVolumeRef(index);
  }

  ngOnInit() {
  }

}
