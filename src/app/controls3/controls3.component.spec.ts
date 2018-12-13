import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Controls3Component } from './controls3.component';

describe('Controls3Component', () => {
  let component: Controls3Component;
  let fixture: ComponentFixture<Controls3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Controls3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Controls3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
