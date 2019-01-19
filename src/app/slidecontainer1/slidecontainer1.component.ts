import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-slidecontainer1',
  templateUrl: './slidecontainer1.component.html',
  styleUrls: ['./slidecontainer1.component.css']
})
export class Slidecontainer1Component implements OnInit {

  name = ['sld1', 'sld2', 'sld3', 'sld4', 'sld5', 'sld6'];
  sliderName = this.name[0];
  

  constructor(private loopService: LoopService) { }

  @Input() volume: number;
  @Output() sliderVolumeChanged = new EventEmitter<number>();

  ngOnInit() {
  }

  changeVolume(): void {
    console.log("this volume:", this.volume);
    this.sliderVolumeChanged.emit(this.volume);
  }
}
