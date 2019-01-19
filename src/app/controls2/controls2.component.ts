import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  public name: String[] = ['save', 'load', 'delete'];

  private loopSvc: LoopService;

  constructor(loopSvc: LoopService, private dataService: DataService) {
    this.loopSvc = loopSvc;
  }

  ngOnInit() {
  }

  private clickedBtn(btnName: String): void {
    if (btnName === this.name[0]) {
      this.loopSvc.saveLoop();
    }
    if (btnName === this.name[1]) {
      // dirty testing-method
      this.loopSvc.getLoopById(4);
    }
    if (btnName === this.name[2]) {
      console.log("controls2::clickedBtn():DELETE Loop" + this.loopSvc.getLoadedLoopID());
      this.loopSvc.deleteLoopById(this.loopSvc.getLoadedLoopID());
    }
  }

  private loopsVisible: boolean = false;
  @Input() loop: String;
  @Output() loopChanged = new EventEmitter<String>();

  private savedLoops(): Object[] {
    let fetchedIDs: Array<number> = this.loopSvc.getLoopIDs();
    let htmlAttributeContainer: Array<any> = new Array<any>(fetchedIDs.length + 1);
    htmlAttributeContainer[0] = { value: 'default', title: 'default' };
    for (let i = 0; i < fetchedIDs.length; i++)
      htmlAttributeContainer[i + 1] = { value: 'Loop' + fetchedIDs[i], title: 'Loop' + fetchedIDs[i] };
    return htmlAttributeContainer;
  }

  private chooseLoop(): void {
    this.loopsVisible = true;
  }

  private hideSavedLoops(): void {
    this.loopsVisible = false;
    this.loopChanged.emit(this.loop);
  }

}
