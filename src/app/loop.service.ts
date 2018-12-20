import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoopService {

  private instrumentCount: number = 0;
  private timeCount: number = 0;

  private instrumentTimes: Array<Array<boolean>>;
  private instruments: Array<HTMLAudioElement>;
  private audioFilePaths: Array<string> = ["timpani.mp3",
  "bark.mp3", "gobble.mp3","strings3.mp3","strings2.mp3","strings1.mp3"];
  private audioDir: string = "assets/sound/";

  private isPlaying: boolean = false;
  private intervalID: number = 0;
  private time: number = 0;
  
  private instrumentsInit(): void {
    this.instrumentTimes = new Array<Array<boolean>>(this.instrumentCount);
    for(let i = 0; i < this.instrumentCount; i++){
      this.instrumentTimes[i]=new Array<boolean>(this.timeCount);
      for(let j = 0; j < this.timeCount; j++){
        this.instrumentTimes[i][j] = false;
      }
    }
    this.instruments = new Array<HTMLAudioElement>(this.instrumentCount);
    for(let i = 0; i < this.instrumentCount; i++){
      this.instruments[i] = new Audio();
      this.instruments[i].src = this.audioDir + this.audioFilePaths[i];
      this.instruments[i].load();
    }
  }
  
  // interrupt for window interval
  private clearLoop(): void {
    clearInterval(this.intervalID);
  }

  private playInstruments(): void {
    this.clearLoop();
    // delegate interval to browser-window
    this.intervalID = window.setInterval(() => {
      for(let i = 0; i < this.instrumentCount; i++){
        if(this.instrumentTimes[i][this.time]){
          console.log("playing instrument #" + i + " time" + (this.time));
          this.instruments[i].currentTime = 0;
          this.instruments[i].play();
        }
      }
      this.time++;
      this.time = this.time % this.timeCount;
    }, 1000);
  }

  public setDimensions(rowCount: number, colCount: number): void{
    this.instrumentCount = rowCount;
    this.timeCount = colCount;
    this.instrumentsInit();
  }

  public setInstrumentTime(instrument: number, time: number):void{
    this.instrumentTimes[instrument][time] = !this.instrumentTimes[instrument][time];
    console.log("instrument #" + instrument + " time" + time);
  }

  public play(): void {
    if(this.isPlaying){
      console.log("stopping loop");
      this.isPlaying = false;
      this.clearLoop();
      // stop all instruments
      for(let i = 0; i < this.instrumentCount; i++){
        //this.instruments[i].volume = 0.1;
        this.instruments[i].pause();
        this.instruments[i].currentTime = 0;
        //this.instruments[i].volume = 1.0;
      }
      // reset loop-time
      this.time = 0;
    }
    else{
      console.log("starting loop");
      this.isPlaying = true;
      this.playInstruments();
    }
  }

  constructor() { }
}
