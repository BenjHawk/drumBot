import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { validateBasis } from '@angular/flex-layout';

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
               private router: Router) {

      this.form = this.fb.group({
          username: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  ngOnInit() {
  }

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
                      }                   
                  }
              );
      }
  }

  register() {
    const val = this.form.value;

        this.dataService.createUser(val.username, val.password)
            .subscribe(
                (res: any) => {
                    if (res.userStatus === "Created"){
                        alert("User "+ val.username + " sucessfully created!");
                      }    
                    else {
                        alert("Error! Username already exists. Please choose another one.");
                    }
                    this.router.navigateByUrl('/');
                }
            );
    }

    logout(){
        const val = this.form.value;

        this.authService.logout();
        val.username = '';
        val.password= '';
    }
}

  

