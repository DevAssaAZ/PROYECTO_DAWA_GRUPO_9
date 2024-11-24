import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDevolucionesComponent } from './crud-devoluciones.component';

describe('CrudDevolucionesComponent', () => {
  let component: CrudDevolucionesComponent;
  let fixture: ComponentFixture<CrudDevolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudDevolucionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
