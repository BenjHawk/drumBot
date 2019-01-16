import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  createUser(username, password){
    return this.http.post('http://localhost:4040/createuser/', {username, password});
  }

  updateUser(userId, body){
    this.http.post('http://localhost:4040/updateuser/'+userId, body);
  }

  saveLoop(tempo, meter, instrumentTimes, volumeCymbal, volumeHiHat, volumeSnare, volumeBass, volumeTom1,volumeTom2, masterVolume, userId){
    console.log("I am the dataservice, hello");
     return this.http.post('http://localhost:4040/createloop/', {tempo, meter, instrumentTimes, volumeCymbal, volumeHiHat,
     volumeSnare, volumeBass, volumeTom1, volumeTom2, masterVolume, userId});
  }

  updateLoop(loopId, body){
    this.http.post('http://localhost:4040/updateloop/'+loopId, body);
  }

  getUser(userId) {
    return this.http.get('http://localhost:4040/getusers/'+userId);
  }

  getLoopsByUser(userId) {
    return this.http.get('http://localhost:4040/getloopbyuser/'+userId);
  }
  
  getLoopById(loopId) {
    return this.http.get('http://localhost:4040/getloopbyid/'+loopId);
  }
  
  deleteUser(userId) {
    return this.http.get('http://database_server:4040/deleteuser/'+userId);
  }

  deleteLoop(loopId) {
    return this.http.get('http://database_server:4040/deleteloop/'+loopId);
  }
}
