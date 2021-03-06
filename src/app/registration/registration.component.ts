import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { DataService } from '../data.service';
import { validateBasis } from '@angular/flex-layout';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit { 
  
  form:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private dataService: DataService,
               private loopSvc: LoopService) {

      this.form = this.fb.group({
          username: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  ngOnInit() {
  }

  /**
   * Login user and after that call LoopService::getLoopIdsByUser()
  */
  login() {
      const val = this.form.value;
      if (val.username && val.password) {
          this.authService.login(val.username, val.password)
              .subscribe(
                  (res: any) => {
                      //load jwt, expiration time and userId from to localstorage 
                      if (res.idToken != null && res.Id != null){
                        this.authService.setSession(res);
                        alert("Login successful! \nWelcome " + val.username);
                        //load loop ids sorted by this user from the database
                        this.loopSvc.getLoopIdsByUser(Number(localStorage.getItem("userId")));
                      }  
                    });
      }
  }

  register() {
    const val = this.form.value;

        this.dataService.createUser(val.username, val.password)
            .subscribe(
                (res: any) => {
                    console.log(res.status);
                     if (res.userStatus === "Created"){
                        alert("User "+ val.username + " sucessfully created!");
                      }    
                },
                    (error: any) => {
                        alert("Error, no user was created! The username chosen already exist. Please use another one and retry.");
                        console.log(error);
                    });
    }

    logout(){
        this.authService.logout();
        this.form.reset();
        console.log("Logout succesfull!");
    }
}

  

