import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoopService } from "../loop.service";

@Component({
  selector: 'app-controls2',
  templateUrl: './controls2.component.html',
  styleUrls: ['./controls2.component.css']
})
export class Controls2Component implements OnInit {

  public name: String[] = ['save', 'load', 'delete'];
  
  private loopSvc: LoopService;

  constructor(loopSvc: LoopService) { 
    this.loopSvc = loopSvc;
  }

  ngOnInit() {
  }

  private clickedBtn(btnName: String): void {
    if(btnName === this.name[0]){
      console.log(this.loopSvc.toDB());
    }
    if(btnName === this.name[1]){
      // dirty testing-method
      this.loopSvc.fromDB(
        ["[[false,false,true,false,true,true,true,false],[false,false,true,false,true,false,false,true],[true,true,true,false,true,true,true,false],[true,false,true,false,true,false,false,true],[true,true,true,false,true,true,true,true],[false,false,false,false,false,false,false,false]]"]
        );
      }
      if(btnName === this.name[2])
      this.loopSvc.play();
    }

  private loopsVisible: boolean = false;
  @Input() loop: String;
  @Output() loopChanged = new EventEmitter<String>();

  private savedLoops(): Object [] {
    return [{value:'default', title: 'default'},{value:'Loop1', title: 'Loop1'}, {value:'Loop2', title: 'Loop2'}, {value:'Loop3', title: 'Loop3'}, {value:'Loop4', title: 'Loop4'}];
  } 

  private chooseLoop(): void {
    this.loopsVisible = true;
  }

  private hideSavedLoops(): void {
    this.loopsVisible = false;
    this.loopChanged.emit(this.loop);
  }

}
