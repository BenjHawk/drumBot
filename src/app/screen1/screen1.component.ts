import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component implements OnInit {

  @Input() selectedTempo: number;
  @Input() selectedVolume: number;
  @Input() selectedMeter: String;
  @Input() selectedMode: String; 
  @Input() selectedLoop: String;
  
  constructor() { }

  ngOnInit() {

  }

}
