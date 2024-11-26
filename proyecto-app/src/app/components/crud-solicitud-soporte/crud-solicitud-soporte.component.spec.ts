import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSolicitudSoporteComponent } from './crud-solicitud-soporte.component';

describe('CrudSolicitudSoporteComponent', () => {
  let component: CrudSolicitudSoporteComponent;
  let fixture: ComponentFixture<CrudSolicitudSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudSolicitudSoporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudSolicitudSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
