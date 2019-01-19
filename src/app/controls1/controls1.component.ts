import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-controls1',
  templateUrl: './controls1.component.html',
  styleUrls: ['./controls1.component.css']
})

export class Controls1Component implements OnInit {

  playTitle: String = 'PLAY';
  minTempo: number = 40;
  maxTempo: number = 208;
  tempoVisible: boolean = false;

  @Input() tempo: number;
  @Output() tempoChanged = new EventEmitter<number>();

  minVolume: number = 0;
  maxVolume: number = 1.0;
  volumeVisible: boolean = false;

  @Input() volume: number;
  @Output() volumeChanged = new EventEmitter<number>(); 
  
  meterVisible: boolean = false;
  @Input() meter: String;
  @Output() meterChanged = new EventEmitter<String>();

  effectsVisible: boolean = false;
  @Input() effects: String;
  @Output() effectsChanged = new EventEmitter<String>();

  modeVisible: boolean = false;
  @Input() mode: String;
  @Output() modeChanged = new EventEmitter<String>();
    
  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  } 

  ngOnInit() {
  }

  tempoScale(): number[] {
    let values = [];
    for (let i=this.minTempo; i <= this.maxTempo; i++){
      values.push({value:i, title: i.toString()});
    }
    return values;
  }

  chooseTempo(): void {
    this.tempoVisible = true;
  }

  hideTempo(): void {
    this.tempoVisible = false;
    this.tempoChanged.emit(this.tempo);
  }

  volumeScale(): number[] {
    let values = [];
    for (let i = this.minVolume; i <= this.maxVolume; i+=0.1){
      values.push({value:i, title: i.toFixed(1)});
    }
    return values;
  }

  chooseVolume(): void {
    this.volumeVisible = true;
  }

  hideVolume(): void {
    this.volumeVisible = false;
    this.volumeChanged.emit(this.volume);
  }
  
  meterScale(): Object [] {            
    return [{value:'3/4', title:'3/4'}, {value:'4/4', title:'4/4'}, {value:'6/8', title:'6/8'}];      
  }

  chooseMeter(): void {
    this.meterVisible = true;
  }

  hideMeter(): void {
    this.meterVisible = false;
    this.meterChanged.emit(this.meter);
  }

  effectsScale(): Object [] {
    return [{value:'none', title:'none'}, {value:'Hall', title:'Hall'}, {value:'Rewerb', title:'Rewerb'}, {value:'Echo', title:'Echo'}, {value:'Flanger', title:'Flanger'}];
  }

  chooseEffects(): void {
    this.effectsVisible = true;
  }

  hideEffects() {
    this.effectsVisible = false;
    this.effectsChanged.emit(this.effects);
  }

  modeScale(): Object [] {
    return [{value:'standard', title:'standard'}, {value:'advanced', title:'advanced'}];
  }

  chooseMode(): void {
    this.modeVisible = true;
  }

  hideMode() {
    this.modeVisible = false;
    this.modeChanged.emit(this.mode);
  }

  play() {
    this.loopSvc.play();
    if (this.loopSvc.isCurrentlyPlaying()) {
      this.playTitle = 'STOP';
    } else {
      this.playTitle = 'PLAY';
    }
  }

}


  



