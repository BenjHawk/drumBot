import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit { 
  
  form:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
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

  test() {
        this.authService.test()
            .subscribe(
                () => {
                    console.log("Test done");
                    this.router.navigateByUrl('/');
                }
            );
    }
}

  

