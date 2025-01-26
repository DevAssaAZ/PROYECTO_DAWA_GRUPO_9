import { TestBed } from '@angular/core/testing';

import { ClientesApiService } from './clientes-api.service';

describe('ClientesApiService', () => {
  let service: ClientesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
