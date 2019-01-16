import { Component } from '@angular/core';
import { LoopService } from './loop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'HyDrum';
  private curTempo: number = 120;
  private curVolume: number = 10;
  private curMeter: String = '4/4';
  private curEffects: String = 'none';
  private curMode: String = 'standard';
  private curLoop: String = 'default';
  
  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }

  public onTempoChange(tempo: number) {
    console.log("New tempo:", tempo);
    this.curTempo = tempo;
    this.loopSvc.setTempo(tempo);
  }

  public onVolumeChange(volume: number) {
    console.log("New volume:", volume);
    this.curVolume = volume;
  }

  public onMeterChange(meter: String) {
    console.log("New meter:", meter);
    this.curMeter = meter;
  }

  public onEffectsChange(effects: String) {
    console.log("New effect:", effects);
    this.curEffects = effects;
  }

  public onModeChange(mode: String) {
    console.log("New mode:", mode);
    this.curMode = mode;
  }

  public onLoopChange(loop: String) {
    console.log("New loop:", loop);
    this.curLoop = loop;
    this.loopSvc.setLoop(loop);
  }
}

