import { TestBed } from '@angular/core/testing';

import { GarantiasApiService } from './garantias-api.service';

describe('GarantiasApiService', () => {
  let service: GarantiasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarantiasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
