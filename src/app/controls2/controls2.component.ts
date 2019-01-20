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

  constructor(private loopSvc: LoopService, private dataService: DataService) {
  }

  ngOnInit() {
  }

  private clickedBtn(btnName: String): void {
    if (btnName === this.name[0]) {
      this.loopSvc.saveLoop();
      this.loopSvc.getLoopIdsByUser(Number(localStorage.getItem("userId")));
    }
    else if (btnName === this.name[2]) {
      this.loopSvc.deleteLoopById(this.loopSvc.getLoadedLoopID());
      this.loopSvc.getLoopIdsByUser(Number(localStorage.getItem("userId")));
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
