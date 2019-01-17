// TODO: toDB()
// TODO: fromDB()
// TODO: after load -> aktualisiere UI
// TODO: support general volume
// Registration::Login -> LoopSvc::initFromDB() -> DS::getLoopIDsByUserID()
// Ctrl2::btnLoad -> LoopSvc::loopFromDB() -> DS::getLoopByID()
// Ctrl2::btnSave -> LoopSvc::loopToDB() -> DS::saveLoop()
// Ctrl2::btnDelet -> LoopSvc::deleteLoopFromDB() -> DS::deleteLoopByID()

import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LoopService {

  public onInstrumentPlay: any = null;
  public onStop: any = null;
  private tempo: number = 80;

  // loop dimensions
  private instrumentCount: number = 0;  // number of instruments demanded by UI
  private timeCount: number = 0;        // number of times demanded by UI
  // instrument data
  private instrumentTimes: Array<Array<boolean>>;   // state of instruments at specific times
  public volumeMaster = 1.0;
  public volumeInstruments: Array<any>;
  private instruments: Array<HTMLAudioElement>;
  private audioFilePaths: Array<string> = [
    "drum_splash_hard.mp3",
    "drum_cymbal_pedal.mp3",
    "drum_snare_soft.mp3",
    "drum_heavy_kick.mp3",
    "drum_tom_hi_hard.mp3",
    "drum_tom_lo_hard.mp3"];
  private audioDir: string = "assets/sound/";
  // state of loop
  private isPlaying: boolean = false;
  private intervalID: number = 0;
  private time: number = 0;

  private dataService: DataService = null;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  private instrumentsInit(): void {
    this.instrumentTimes = new Array<Array<boolean>>(this.instrumentCount);
    this.volumeInstruments = new Array<number>(this.instrumentCount);
    for (let i = 0; i < this.instrumentCount; i++) {
      this.instrumentTimes[i] = new Array<boolean>(this.timeCount);
      this.volumeInstruments[i] = { volume: 0.5 };
      for (let j = 0; j < this.timeCount; j++) {
        this.instrumentTimes[i][j] = false;
      }
    }
    this.instruments = new Array<HTMLAudioElement>(this.instrumentCount);
    for (let i = 0; i < this.instrumentCount; i++) {
      this.instruments[i] = new Audio();
      this.instruments[i].src = this.audioDir + this.audioFilePaths[i];
      this.instruments[i].load();
      this.instruments[i].volume = 0.5;
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
      let minInstrument = 6;
      for (let i = 0; i < this.instrumentCount; i++) {
        if (this.instrumentTimes[i][this.time]) {
          console.log("playing instrument #" + i + " time" + (this.time));
          this.instruments[i].currentTime = 0;
          this.instruments[i].volume = this.volumeInstruments[i].volume * this.volumeMaster;
          this.instruments[i].play();
          if (i < minInstrument) {
            minInstrument = i;
          }
        }
      }
      if (this.onInstrumentPlay) {
        this.onInstrumentPlay(this.time, minInstrument);
      }
      this.time++;
      this.time = this.time % this.timeCount;
    }, 60 / this.tempo * 500);
  }

  public setTempo(tempo: number) {
    this.tempo = tempo;
  }

  /**
   * returns Array of JSON-strings holding session data
   */
  public toDB(): string {
    console.warn("toDB() not tested");
    console.log(this.instrumentTimes);
    let sessionData: string = "";
    // data to be saved:
    // tempo
    // meter
    // instrumentTimes
    // volumes (cympal, hihtat, snare, bass, tom1, tom2)
    // master vol
    // userID
    console.log(sessionData);
    this.dataService.saveLoop(this.tempo, '4/4', 'InstrumentTimesDummy',//JSON.stringify(this.instrumentTimes), 
    this.instruments[0].volume, this.instruments[1].volume, 
    this.instruments[2].volume, this.instruments[3].volume, this.instruments[4].volume, this.instruments[5].volume, 1.0, 1).subscribe();
    return sessionData;
  }

  /**
   * restores session data from Array of JSON-strings
   * Body der Response:
   * [
   *      {
   *          "id": 1,
   *          "name": null,
   *          "tempo": "56",
   *          "meter": "4/4",
   *          "InstrumentTimes": "InstrumentTimesDummy",
   *          "VolumeCymbal": 0.5,
   *          "VolumeHiHat": 0.5,
   *          "VolumeSnare": 0.5,
   *          "VolumeBass": 1,
   *          "VolumeTom1": 0.5,
   *          "VolumeTom2": 0.5,
   *          "MasterVolume": 1,
   *          "userId": 1
   *      }
   * ]
   */
  public fromDB(sessionData: Array<string>): void {
    console.warn("fromDB() not tested");
    this.dataService.getLoopById(1).subscribe(
      (res) => {
        try {
          console.log(res);
          console.log(res[0]);
        }
        catch(e){
          console.error(e);
        }
      }
    );
  }

  public setDimensions(rowCount: number, colCount: number): void {
    this.instrumentCount = rowCount;
    this.timeCount = colCount;
    this.instrumentsInit();
  }

  public setInstrumentTime(instrument: number, time: number): void {
    this.instrumentTimes[instrument][time] = !this.instrumentTimes[instrument][time];
    console.log("instrument #" + instrument + " time" + time);
  }

  public getInstrumentTime(instrument: number, time: number): boolean {
    return this.instrumentTimes[instrument][time];
  }

  /**
   * getVolumeRef
   * provides reference to HTMLAudioElement.Volume for Volume Control
   */
  public getVolumeRef(index: number): any {
    return this.volumeInstruments[index];
  }

  public play(): void {
    if (this.isPlaying) {
      console.log("stopping loop");
      this.isPlaying = false;
      this.clearLoop();
      // stop all instruments
      for (let i = 0; i < this.instrumentCount; i++) {
        //this.instruments[i].volume = 0.1;
        this.instruments[i].pause();
        this.instruments[i].currentTime = 0;
        //this.instruments[i].volume = 1.0;
      }
      // reset loop-time
      this.time = 0;
      if (this.onStop) {
        this.onStop();
      }
    }
    else {
      console.log("starting loop");
      this.isPlaying = true;
      this.playInstruments();
    }
  }

  public isCurrentlyPlaying() {
    return this.isPlaying;
  }
}
