// TODO: after load -> aktualisiere UI
// TODO: general volume currently affects ALL sliders in slidecontainer1 -> should we keep that?
// TODO: (testing) [Registration::Login ->] LoopSvc::getLoopIdsByUser() -> DS::getLoopIDsByUserID()
// TODO: (testing) [Ctrl2::btnLoad ->] LoopSvc::loopFromDB() -> DS::getLoopByID()
// TODO: (testing) Ctrl2::btnSave -> LoopSvc::saveLoop() -> DS::saveLoop()
// TODO: Ctrl2::btnDelete -> LoopSvc::deleteLoopByID() -> DS::deleteLoopByID()
// OPTIONALS
// TODO: loop.name in Database currently unused by LoopService
// TODO: create component VolumeWraper
// TODO: implement variable meter

import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs'
import { error } from 'util';


@Injectable({
  providedIn: 'root'
})
export class LoopService {

  public onInstrumentPlay: any = null;
  public onStop: any = null;
  private tempo: number = 120;
  public loopName: String = "";

  // private itemsToStore = 1;

  // loop dimensions
  private instrumentCount: number = 0;  // number of instruments demanded by UI
  private timeCount: number = 0;        // number of times demanded by UI
  private loopIDs: Array<number>;       // loop IDs needed to identify a specific loop in the database
  // instrument data
  private instrumentTimes: Array<Array<boolean>>;   // state of instruments at specific times
  public volumeMaster = 1.0;
  public volumeInstrumentsWrapper: Array<any>;
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
    this.volumeInstrumentsWrapper = new Array<any>(this.instrumentCount);
    for (let i = 0; i < this.instrumentCount; i++) {
      this.instrumentTimes[i] = new Array<boolean>(this.timeCount);
      this.volumeInstrumentsWrapper[i] = { volume: 0.5 };   // ugly static wrapper -> should use external component if possible
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
          console.log("loopService::playInstruments()playing instrument #" + i + " time" + (this.time));
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
   * data to be saved:
   * tempo
   * meter
   * instrumentTimes
   * volumes (cympal, hihtat, snare, bass, tom1, tom2)
   * master vol
   * userID
   */
  public saveLoop(): void {
    console.log("loopService::saveLoop()");
    console.log("loopService::saveLoop()" + this.instrumentTimes);
    let sessionData: string = "";
    console.log("loopService::saveLoop()" + sessionData);
    this.dataService.saveLoop(
      this.tempo, '4/4', JSON.stringify(this.instrumentTimes),
      this.instruments[0].volume, this.instruments[1].volume, this.instruments[2].volume,
      this.instruments[3].volume, this.instruments[4].volume, this.instruments[5].volume,
      1.0, 1
    ).subscribe();
  }

  public deleteLoopById(loopId: number): void {
    console.log("loopService::deleteLoopById()");
    this.dataService.deleteLoop(loopId);
  }

  /**
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
   * @param loopId 
   */
  public getLoopById(loopId: number): void {
    console.warn("LoopService::getLoopById():not tested");
    this.dataService.getLoopById(loopId).subscribe(
      (resBody) => {
        try {
          console.log("loopService::getLoopById()");
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
          console.log("loopService::getLoopIdsByUser()" + resBody[0]);
          let countIDs = resBody.length;
          let buffer = new Array<number>(countIDs);
          for (let i = 0; i < countIDs; i++)
            buffer[i] = resBody[i].id;
          
          this.loopIDs = buffer;
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
  }

  public getInstrumentTime(instrument: number, time: number): boolean {
    return this.instrumentTimes[instrument][time];
  }

  public getLoopIDs(): Array<number> {
    if (this.loopIDs === undefined) {
      console.log("LoopService::getLoopIDs()LoopIDs undefined. Try to fetch LoopIDs from DataService");
      console.warn("LoopService::getLoopIDs()returning mock object(IDs)");
      //  this.getLoopIdsByUser(parseInt(localStorage.getItem("userId")));
      this.loopIDs = [1,2,3];
      return this.loopIDs;
    }
    console.log("LoopService::getLoopIDs()returning old LoopIDs.");
    return this.loopIDs;
  }

  /**
   * getVolumeRef
   * provides reference to HTMLAudioElement.Volume for Volume Control
   */
  public getVolumeRef(index: number): any {
    return this.volumeInstrumentsWrapper[index];
  }

  public play(): void {
    if (this.isPlaying) {
      console.log("LoopService::play()stopping loop");
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
      console.log("LoopService::play()starting loop");
      this.isPlaying = true;
      this.playInstruments();
    }
  }

  isCurrentlyPlaying() {
    return this.isPlaying;
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
  }

  setLoop(loop: String) {
    this.loopName = loop;
  }

  /**
   * Returns id of currently loaded loop.
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
