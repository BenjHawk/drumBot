import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
      
    login(username:string, password:string ) {
        return this.http.post('http://localhost:4040/login', {username, password}).pipe( //not sure about pipe
            // this is just the HTTP call
            shareReplay());
    }

    register(username:string, password:string ) {
        return this.http.post('http://localhost:4040/createuser', {username, password}).pipe( //not sure about pipe
            // this is just the HTTP call
            shareReplay());
    }

    test() {
        return this.http.get('http://localhost:4040/dummy').pipe( //not sure about pipe
            // this is just the HTTP call
            shareReplay());
    }

    setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn,'second');

      //add UserId for HTTPRequest via the local storage of the Browser
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
      localStorage.setItem("userId", authResult.Id);
  }          

  //logout method to be used for logout button; to be done; clear user and password fields
  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("userId");
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
}
  
