import { Component, OnInit } from '@angular/core';
import { LoopService } from "../loop.service";
import { DataService } from '../data.service';
import { AuthService } from '../auth-service.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-controls2',
  templateUrl: './controls2.component.html',
  styleUrls: ['./controls2.component.css']
})
export class Controls2Component implements OnInit {

  name: String[] = ['save', 'load', 'delete'];
  btnName: String =this.name[0];

  private loopSvc: LoopService;

  constructor(loopSvc: LoopService, private dataService : DataService) { 
    this.loopSvc = loopSvc;
  }

  ngOnInit() {
  }
  
  private clickedBtn(btnName: String): void {
    if(btnName === this.name[0]){
      this.loopSvc.saveLoop();
    }
    if(btnName === this.name[1]){
      // dirty testing-method
      this.loopSvc.getLoopById(1);
      }
      if(btnName === this.name[2])
      this.loopSvc.play();
    }
}
