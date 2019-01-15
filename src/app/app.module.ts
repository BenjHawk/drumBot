import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import {Router} from '@angular/router';
import {HttpClientModule } from '@angular/common/http';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { Controls1Component } from './controls1/controls1.component';
import { Controls2Component } from './controls2/controls2.component';
import { Controls3Component } from './controls3/controls3.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';
import { Slidecontainer1Component } from './slidecontainer1/slidecontainer1.component';
import { Slidecontainer2Component } from './slidecontainer2/slidecontainer2.component';
//import { AuthInterceptor } from './auth-interceptor';
//import { AuthService } from './auth-service.service';
//import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    Controls1Component,
    Controls2Component,
    Controls3Component,
    Screen1Component,
    Screen2Component,
    Slidecontainer1Component,
    Slidecontainer2Component,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    //FormBuilder,
    //FormGroup,
    //Validators,
    HttpClientModule
    //Router
  ],
  providers: [
    /*{ 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
  }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
