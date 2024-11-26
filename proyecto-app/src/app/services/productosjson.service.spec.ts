import { TestBed } from '@angular/core/testing';

import { ProductosjsonService } from './productosjson.service';

describe('ProductosjsonService', () => {
  let service: ProductosjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
