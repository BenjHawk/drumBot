import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Controls1Component } from './controls1.component';

describe('Controls1Component', () => {
  let component: Controls1Component;
  let fixture: ComponentFixture<Controls1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Controls1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Controls1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
