import { TestBed } from '@angular/core/testing';

import { DevolucionesApiService } from './devoluciones-api.service';

describe('DevolucionesApiService', () => {
  let service: DevolucionesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevolucionesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
