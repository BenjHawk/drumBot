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
        return this.http.post('http://database_server:4040/login', {username, password}).pipe( //not sure about pipe
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
            shareReplay());
    }

    private setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn,'second');

      //add UserId for HTTPRequest via the local storage of the Browser
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
      localStorage.setItem("userId", authResult.Id);
  }          

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
  
