import { TestBed } from '@angular/core/testing';

import { GarantiasjsonService } from './garantiasjson.service';

describe('GarantiasjsonService', () => {
  let service: GarantiasjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarantiasjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
