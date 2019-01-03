import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Controls2Component } from './controls2.component';

describe('Controls2Component', () => {
  let component: Controls2Component;
  let fixture: ComponentFixture<Controls2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Controls2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Controls2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
