import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { Controls1Component } from './controls1/controls1.component';
import { Controls2Component } from './controls2/controls2.component';
import { Controls3Component } from './controls3/controls3.component';
import { EffectsComponent } from './effects/effects.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';
import { Slidecontainer1Component } from './slidecontainer1/slidecontainer1.component';
import { Slidecontainer2Component } from './slidecontainer2/slidecontainer2.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    Controls1Component,
    Controls2Component,
    Controls3Component,
    EffectsComponent,
    Screen1Component,
    Screen2Component,
    Slidecontainer1Component,
    Slidecontainer2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
