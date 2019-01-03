import { TestBed } from '@angular/core/testing';

import { PlayBtnService } from './play-btn.service';

describe('PlayBtnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayBtnService = TestBed.get(PlayBtnService);
    expect(service).toBeTruthy();
  });
});
