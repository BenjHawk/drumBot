// TODO: toDB()
// TODO: fromDB()
// TODO: find a way of not giving the hole HTMLAudioElement to VolumeControl

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoopService {
  private itemsToStore = 1;
  // loop dimensions
  private instrumentCount: number = 0;  // number of instruments demanded by UI
  private timeCount: number = 0;        // number of times demanded by UI
  // instrument data
  private instrumentTimes: Array<Array<boolean>>;   // state of instruments at specific times
  private instruments: Array<HTMLAudioElement>;
  private audioFilePaths: Array<string> = ["timpani.mp3",
  "bark.mp3", "gobble.mp3","strings3.mp3","strings2.mp3","strings1.mp3"];
  private audioDir: string = "assets/sound/";
  // state of loop
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

  /**
   * returns Array of JSON-strings holding session data
   */
  public toDB(): Array<string> {
    console.error("toDB() not tested");
    let sessionData: Array<string> = new Array<string>();
    // data to be saved:
    sessionData.push(JSON.stringify(this.instrumentTimes));
    return sessionData;
  }

  /**
   * restores session data from Array of JSON-strings
   */
  public fromDB(sessionData: Array<string>): void{
    console.error("fromDB() not implemented");
    this.instrumentTimes = JSON.parse(sessionData.pop());
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
  
  public getInstrumentTime(instrument: number, time: number): boolean{
    return this.instrumentTimes[instrument][time];
  }

  /**
   * getVolumeRef
   * provides reference to HTMLAudioElement.Volume for Volume Control
   */
  public getVolumeRef(index: number): HTMLAudioElement {
    return this.instruments[index];
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
