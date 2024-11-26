import { TestBed } from '@angular/core/testing';

import { SoportejsonService } from './soportejson.service';

describe('SoportejsonService', () => {
  let service: SoportejsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoportejsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
