import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component implements OnInit {

  @Input() selectedTempo: number;
  @Input() selectedVolume: number;
  @Input() selectedMeter: String;
  @Input() selectedEffects: String;
  @Input() selectedMode: String;

  user$: Object; 

  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.getUser("2").subscribe(
      data => this.user$ = data
    )
  }

}
