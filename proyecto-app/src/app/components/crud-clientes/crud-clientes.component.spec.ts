import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudClientesComponent } from './crud-clientes.component';

describe('CrudClientesComponent', () => {
  let component: CrudClientesComponent;
  let fixture: ComponentFixture<CrudClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
