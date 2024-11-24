import { TestBed } from '@angular/core/testing';

import { DevolucionesjsonService } from './devolucionesjson.service';

describe('DevolucionesjsonService', () => {
  let service: DevolucionesjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevolucionesjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
