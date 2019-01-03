import { Component, OnInit } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-controls2',
  templateUrl: './controls2.component.html',
  styleUrls: ['./controls2.component.css']
})
export class Controls2Component implements OnInit {

  name = ['save', 'cut', 'play'];
  btnName=this.name[0];

  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }

  ngOnInit() {
  }

  private clickedBtn(btnName: String): void {
    if(btnName === this.name[0]){
      // dirty testing-method
      console.log(this.loopSvc.toDB());
    }
    if(btnName === this.name[1]){
      // overwriting CUT functionality with pseudo-load!
      // dirty testing-method
      this.loopSvc.fromDB(
        ["[[false,false,true,false,true,true,true,false],[false,false,true,false,true,false,false,true],[true,true,true,false,true,true,true,false],[true,false,true,false,true,false,false,true],[true,true,true,false,true,true,true,true],[false,false,false,false,false,false,false,false]]"]
      );
    }
    if(btnName === this.name[2])
      this.loopSvc.play();
  }
}
