import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Slidecontainer1Component } from './slidecontainer1.component';

describe('Slidecontainer1Component', () => {
  let component: Slidecontainer1Component;
  let fixture: ComponentFixture<Slidecontainer1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Slidecontainer1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Slidecontainer1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
