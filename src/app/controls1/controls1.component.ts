import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-controls1',
  templateUrl: './controls1.component.html',
  styleUrls: ['./controls1.component.css']
})

export class Controls1Component implements OnInit {

  public playTitle: String = 'PLAY';
  private minTempo: number = 40;
  private maxTempo: number = 208;
  public tempoVisible: boolean = false;

  @Input() tempo: number;
  @Output() tempoChanged = new EventEmitter<number>();

  private minVolume: number = 1;
  private maxVolume: number = 20;
  public volumeVisible: boolean = false;

  @Input() volume: number;
  @Output() volumeChanged = new EventEmitter<number>(); 
  
  public meterVisible: boolean = false;
  @Input() meter: String;
  @Output() meterChanged = new EventEmitter<String>();

  public effectsVisible: boolean = false;
  @Input() effects: String;
  @Output() effectsChanged = new EventEmitter<String>();

  public modeVisible: boolean = false;
  @Input() mode: String;
  @Output() modeChanged = new EventEmitter<String>();
    
  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  } 

  ngOnInit() {
  }

  private tempoScale(): number[] {
    let values = [];
    for (let i=this.minTempo; i <= this.maxTempo; i++){
      values.push({value:i, title: i.toString()});
    }
    return values;
  }

  public chooseTempo(): void {
    this.tempoVisible = true;
  }

  private hideTempo(): void {
    this.tempoVisible = false;
    this.tempoChanged.emit(this.tempo);
  }

  private volumeScale(): number[] {
    let values = [];
    for (let i = this.minVolume; i <= this.maxVolume; i++){
      values.push({value:i, title: i.toString()});
    }
    return values;
  }

  public chooseVolume(): void {
    this.volumeVisible = true;
  }

  private hideVolume(): void {
    this.volumeVisible = false;
    this.volumeChanged.emit(this.volume);
  }
  
  private meterScale(): Object [] {            
    return [{value:'3/4', title:'3/4'}, {value:'4/4', title:'4/4'}, {value:'6/8', title:'6/8'}];      
  }

  public chooseMeter(): void {
    this.meterVisible = true;
  }

  private hideMeter(): void {
    this.meterVisible = false;
    this.meterChanged.emit(this.meter);
  }

  private effectsScale(): Object [] {
    return [{value:'none', title:'none'}, {value:'Hall', title:'Hall'}, {value:'Rewerb', title:'Rewerb'}, {value:'Echo', title:'Echo'}, {value:'Flanger', title:'Flanger'}];
  }

  public chooseEffects(): void {
    this.effectsVisible = true;
  }

  private hideEffects() {
    this.effectsVisible = false;
    this.effectsChanged.emit(this.effects);
  }

  private modeScale(): Object [] {
    return [{value:'standard', title:'standard'}, {value:'advanced', title:'advanced'}];
  }

  public chooseMode(): void {
    this.modeVisible = true;
  }

  private hideMode() {
    this.modeVisible = false;
    this.modeChanged.emit(this.mode);
  }

  private play() {
    this.loopSvc.play();
    if (this.loopSvc.isCurrentlyPlaying()) {
      this.playTitle = 'STOP';
    } else {
      this.playTitle = 'PLAY';
    }
  }

}


  



