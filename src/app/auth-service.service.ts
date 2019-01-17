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
        return this.http.post('http://localhost:4040/login', {username, password}).pipe(shareReplay());
    }

    register(username:string, password:string ) {
        return this.http.post('http://localhost:4040/createuser', {username, password}).pipe(shareReplay());
    }

    //test method for development processes
    test() {
        return this.http.get('http://localhost:4040/dummy').pipe(shareReplay());
    }

    //used in case of successfull login 
    setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn,'second');

      //add needed information from response to local storage
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
      localStorage.setItem("userId", authResult.Id);
  }          

  //logout method to be used for logout button
  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("userId");
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
}
  
