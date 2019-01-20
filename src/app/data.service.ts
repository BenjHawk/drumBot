import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  createUser(username, password){
    return this.http.post('http://localhost:4040/createuser/', {username, password});
  }

  saveLoop(tempo, meter, instrumentTimes, volumeCymbal, volumeHiHat, volumeSnare, volumeBass, volumeTom1,volumeTom2, masterVolume, userId){
    return this.http.post('http://localhost:4040/createloop/', {tempo, meter, instrumentTimes, volumeCymbal, volumeHiHat,
    volumeSnare, volumeBass, volumeTom1, volumeTom2, masterVolume, userId});
  }

  getUser(userId) {
    return this.http.get('http://localhost:4040/getusers/'+userId);
  }

  getLoopIdsByUser(userId) {
    return this.http.get('http://localhost:4040/getloopidsbyuser/'+userId);
  }
  
  getLoopById(loopId) {
    return this.http.get('http://localhost:4040/getloopbyid/'+loopId);
  }

  deleteLoop(loopId) {
    return this.http.get('http://localhost:4040/deleteloop/'+loopId);
  }
}
