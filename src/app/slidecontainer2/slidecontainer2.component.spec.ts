import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Slidecontainer2Component } from './slidecontainer2.component';

describe('Slidecontainer2Component', () => {
  let component: Slidecontainer2Component;
  let fixture: ComponentFixture<Slidecontainer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Slidecontainer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Slidecontainer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
