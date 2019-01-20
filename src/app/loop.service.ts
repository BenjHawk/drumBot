// OPTIONALS
// TODO: implement variable meter
// TODO: general volume currently affects ALL sliders in slidecontainer1 -> should we keep that?
// TODO: loop.name in Database currently unused by LoopService
// TODO: create component VolumeWraper
// TODO: implement variable meter
// TODO: define initial tempo in one place only

import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoopService {

  public onInstrumentPlay: any = null;
  public onStop: any = null;
  private tempo: number = 80;
  public loopName: String = "";

  // loop data
  private instrumentCount: number = 0;  // number of instruments
  private timeCount: number = 0;        // number of times
  private loopIDs: Array<number>;       // loop IDs saved in database by current user(needed to identify a specific loop in the database)
  // instrument data
  public volumeMaster = 1.0;
  private volumeInstrumentsInitial = 0.5;
  public volumeInstrumentsWrapper: Array<any>;      // holds Objects { volume: x.x } for refference in slider.components
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
  private instrumentTimes: Array<Array<boolean>>;   // state of instruments at specific times(true:= play, false:= idle)
  private isPlaying: boolean = false;
  private intervalID: number = 0;                   // needed to identify "thread" by browser
  private time: number = 0;                         // current time in loop

  constructor(private dataService: DataService) {
  }

  /**
   * initializes loop-session
   */
  private instrumentsInit(): void {
    console.log("loopService::instrumentsInit()");
    this.instrumentTimes = new Array<Array<boolean>>(this.instrumentCount);
    this.volumeInstrumentsWrapper = new Array<any>(this.instrumentCount);
    this.instruments = new Array<HTMLAudioElement>(this.instrumentCount);
    for (let i = 0; i < this.instrumentCount; i++) {
      this.instrumentTimes[i] = new Array<boolean>(this.timeCount);
      this.volumeInstrumentsWrapper[i] = { volume: this.volumeInstrumentsInitial };   // ugly static wrapper -> should use external component if possible
      // load audio files and initialize htmlAudioElements
      this.instruments[i] = new Audio();
      this.instruments[i].src = this.audioDir + this.audioFilePaths[i];
      this.instruments[i].load();
      this.instruments[i].volume = this.volumeInstrumentsInitial;
      // initialize idle state for all instruments at all times
      for (let j = 0; j < this.timeCount; j++) {
        this.instrumentTimes[i][j] = false;
      }
    }
  }

  // interrupt for window interval
  private clearLoop(): void {
    console.log("loopService::clearLoop()stop interval");
    clearInterval(this.intervalID);
  }

  /**
   * plays loop repeatedly as long as clearLoop is not being called
   * delegate looping/interval to browser-window
   */
  private playInstruments(): void {
    this.clearLoop();
    this.intervalID = window.setInterval(() => {
      console.log("loopService::playInstruments()start interval");
      let minInstrument = 6;
      for (let i = 0; i < this.instrumentCount; i++) {
        if (this.instrumentTimes[i][this.time]) {
          this.instruments[i].currentTime = 0;
          this.instruments[i].volume = this.volumeInstrumentsWrapper[i].volume * this.volumeMaster;
          console.log(this.instruments[i].volume);
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

  /**
   * returns Array of JSON-strings holding session data
   * current version: static meter
   */
  public saveLoop(): void {
    console.log("loopService::saveLoop()");
    let sessionData: string = "";
    let userId: Number = Number(localStorage.getItem("userId"));
    this.dataService.saveLoop(
      this.tempo, '4/4', JSON.stringify(this.instrumentTimes),
      this.instruments[0].volume, this.instruments[1].volume, this.instruments[2].volume,
      this.instruments[3].volume, this.instruments[4].volume, this.instruments[5].volume,
      this.volumeMaster, userId
    ).subscribe();
  }

  /**
   * Deletes loop with specified loopID from local loopID Array and also calls dataService::deleteLoop()
   * Return hyDrum/interface to an initial state for current user.
   * @param loopId 
   */
  public deleteLoopById(loopId: number): void {
    console.log("loopService::deleteLoopById( "+ loopId + " )");
    // check if there is a loop to delete
    if(this.loopIDs === undefined || this.loopIDs === null || this.loopIDs.length === 0){
      console.error("loopService::deleteLoopById()Can't delete loop. No loopIDs loaded.");
      return;
    }
    
    // clear array loopIDs forcing getLoopIDs() to load from dataService
    this.loopIDs = [];
    this.dataService.deleteLoop(loopId).subscribe();
    // fetch loopIDs from dataService
    this.getLoopIDs();
    
    // return to initial state
    this.instrumentsInit();
  }

  /**
   * parses body of response object into local variables
   * @param loopId 
   */
  public getLoopById(loopId: number): void {
    console.log("loopService::getLoopById()");
    this.dataService.getLoopById(loopId).subscribe(
      (resBody) => {
        try {
          this.tempo = resBody[0].tempo;
          this.volumeInstrumentsWrapper[0].volume = resBody[0].VolumeCymbal;
          this.volumeInstrumentsWrapper[1].volume = resBody[0].VolumeHiHat;
          this.volumeInstrumentsWrapper[2].volume = resBody[0].VolumeSnare;
          this.volumeInstrumentsWrapper[3].volume = resBody[0].VolumeBass;
          this.volumeInstrumentsWrapper[4].volume = resBody[0].VolumeTom1;
          this.volumeInstrumentsWrapper[5].volume = resBody[0].VolumeTom2;
          this.volumeMaster = resBody[0].MasterVolume;
          this.instrumentTimes = <Array<Array<boolean>>>JSON.parse(resBody[0].InstrumentTimes);
        }
        catch (e) {
          console.warn("LoopService::getLoopById()error while parsing from responce body.")
          console.error(e);
        }
      }
    );
  }
        
  /**
   * Fetch LoopIDs from DataService. Responses body is expected to be of type Array<number>
   * Save LoopIDs to this instance of LoopService
   * @param userID
   */
  public getLoopIdsByUser(userID: number): void {
    console.log("LoopService::getLoopIdsByUser()");
    this.dataService.getLoopIdsByUser(userID).subscribe(
      (resBody: Array<any>) => {
        let countIDs = resBody.length;
        let buffer = new Array<number>(countIDs);
        for (let i = 0; i < countIDs; i++){
          buffer[i] = resBody[i].id;
        }
        this.loopIDs = buffer;
      }
    );
  }
  
  /**
   * used to setup the following dimensions from component wich implements this service
   * @param instrumentCount 
   * @param timeCount 
   */
  public setDimensions(instrumentCount: number, timeCount: number): void {
    this.instrumentCount = instrumentCount;
    this.timeCount = timeCount;
    this.instrumentsInit();
  }
  
  /**
   * toggle state of instrument at specific time between 'idle' and 'play'
   * @param instrument 
   * @param time 
   */
  public setInstrumentTime(instrument: number, time: number): void {
    this.instrumentTimes[instrument][time] = !this.instrumentTimes[instrument][time];
  }
  
  /**
   * @param instrument 
   * @param time 
   * @returns true if state of instrument at the specific time is 'play', false otherwise
   */
  public getInstrumentTime(instrument: number, time: number): boolean {
    return this.instrumentTimes[instrument][time];
  }
     
    
  /**
   * @returns loop IDs connected to the currently registered user as an Array of numbers
   */
  public getLoopIDs(): Array<number> {
    if (this.loopIDs === undefined || this.loopIDs === null || this.loopIDs.length === 0) {
      console.log("LoopService::getLoopIDs()LoopIDs undefined. Try to fetch LoopIDs from DataService");
      console.warn("LoopService::getLoopById():DISABLED LOGIC FOR INTERNAL TESTING -> no call to dataService");
      console.warn("LoopService::getLoopIDs()returning mock object(IDs)");
      this.getLoopIdsByUser(parseInt(localStorage.getItem("userId")));
      //this.loopIDs = [1,2,3];
      return this.loopIDs;
    }
    console.log("LoopService::getLoopIDs()returning old LoopIDs.");
    return this.loopIDs;
  }

  /**
   * getVolumeRef
   * @returns a reference to HTMLAudioElement.Volume for Volume Control
   * Index depends on load order of audiofiles in instrumentsInit()
   */
  public getVolumeRef(index: number): any {
    return this.volumeInstrumentsWrapper[index];
  }
  
  /**
   * used to toggle play state of loop by component wich implements this service
   */
  public play(): void {
    if (this.isPlaying) {
      console.log("LoopService::play()stopping loop");
      this.isPlaying = false;
      this.clearLoop();
      // stop all instruments by pausing them and...
      for (let i = 0; i < this.instrumentCount; i++) {
        this.instruments[i].pause();
        this.instruments[i].currentTime = 0;
      }
      // ...resetting loop-time for samples
      this.time = 0;
      if (this.onStop) {
        this.onStop();
      }
    }
    else {
      console.log("LoopService::play()starting loop");
      this.isPlaying = true;
      this.playInstruments();
    }
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  public setTempo(tempo: number): void {
    this.tempo = tempo;
  }

  public setLoop(loop: String): void {
    this.loopName = loop;
  }

  /**
   * Returns id of currently loaded loop by parsing loopName.
   * This function extpects the loopName variable to have the value 'default' or
   * 'LoopX...X' while 'X...X' can be any combination of numbers.
   * @returns id of currently loaded loop as number
   */
  public getLoadedLoopID(): number {
    let stringBuffer: string = "";
    let loopId: number = 0;
    let loopIdLength: number = 0;
    if (this.loopName === "default")
      return loopId;
    else if (this.loopName.length === 0)
      return loopId;
    loopIdLength = this.loopName.length - "Loop".length;
    while (loopIdLength > 0) {
      stringBuffer = stringBuffer + this.loopName[this.loopName.length - loopIdLength];
      loopIdLength--;
    }
    loopId = parseInt(stringBuffer);
    return loopId;
  }

}
