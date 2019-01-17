import { Component } from '@angular/core';
import { LoopService } from './loop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HyDrum';
  curTempo: number = 120;
  curVolume: number = 0.5;
  curMeter: String = '4/4';
  curEffects: String = 'none';
  curMode: String = 'standard';
  curLoop: String = 'default';
  
  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }

  onTempoChange(tempo: number) {
    console.log("New tempo:", tempo);
    this.curTempo = tempo;
    this.loopSvc.setTempo(tempo);
  }

  onVolumeChange(volume: number) {
    console.log("New volume:", volume);
    this.curVolume = volume;
    this.loopSvc.volumeMaster = volume;
  }

  onMeterChange(meter: String) {
    console.log("New meter:", meter);
    this.curMeter = meter;
  }

  onEffectsChange(effects: String) {
    console.log("New effect:", effects);
    this.curEffects = effects;
  }

  onModeChange(mode: String) {
    console.log("New mode:", mode);
    this.curMode = mode;
  }

  onLoopChange(loop: String) {
    console.log("New loop:", loop);
    this.curLoop = loop;
    this.loopSvc.setLoop(loop);
  }
/*
  onSliderChange(volume: number) {
    console.log("New volume:", volume);
    this.curVolume = volume;
  }*/
}

