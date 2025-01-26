import { TestBed } from '@angular/core/testing';

import { SoporteApiService } from './soporte-api.service';

describe('SoporteApiService', () => {
  let service: SoporteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoporteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
