import { TestBed } from '@angular/core/testing';

import { ClientesjsonService } from './clientesjson.service';

describe('ClientesjsonService', () => {
  let service: ClientesjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
