import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  createUser(body){
    this.http.post('http://localhost:4040/createuser/', body);
  }

  updateUser(userId, body){
    this.http.post('http://localhost:4040/updateuser/'+userId, body);
  }

  saveLoop(body){
    this.http.post('http://localhost:4040/createloop/', body);
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
    return this.http.get('http://localhost:4040/deleteuser/'+userId);
  }

  deleteLoop(loopId) {
    return this.http.get('http://localhost:4040/deleteloop/'+loopId);
  }
}
