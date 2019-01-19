import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
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
               private router: Router,
               private loopSvc: LoopService) {

      this.form = this.fb.group({
          username: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  ngOnInit() {
  }

  // TODO: Registration::Login -> LoopSvc::getLoopIdsByUser() [-> DS::getLoopIDsByUserID()]
  /**
   * Login user and after that call LoopService::getLoopIdsByUser()
  */
  login() {
      const val = this.form.value;
      if (val.username && val.password) {
          this.authService.login(val.username, val.password)
              .subscribe(
                  (res: any) => {
                      console.log("User is logged in");
                      console.log(res);
                      //load jwt, expiration time and userId from to localstorage 
                      if (res.idToken != null && res.Id != null){
                        this.authService.setSession(res);
                        this.router.navigateByUrl('/');
                        alert("Login successful! \nWelcome " + val.username);
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
                        console.log(localStorage.getItem("expires_at"));
                      }    
                    else {
                        this.router.navigateByUrl('/')

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

    //Only for development purposes
    test(){
        this.authService.test().subscribe(
            res => {
                console.log("Authentication is valid!");
                
            },
            error => {
                console.log("Error! No Authentication or token not valid anynmore!");
            }
        );
    }

    //Only for development purposes
    testLoopSVC(){
        this.loopSvc.getLoopById(4);
    }
    
}

  

